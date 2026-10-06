/* Getnos Desk — server-side lead proxy.
   The browser posts flat lead answers here; this route adds the Desk API key
   (from env, never shipped to the client) and forwards them to Desk.
   Each answer stays its own JSON field, and extra / custom keys are saved too. */

const DESK_URL = process.env.DESK_URL || "https://deskbackend.getnos.io/v1/lead";
const MAX_FIELD = 2000;
const MAX_FIELDS = 40;

export async function POST(req: Request) {
  const apiKey = process.env.DESK_API_KEY;
  if (!apiKey) {
    return Response.json({ status: "error", message: "DESK_API_KEY is not configured" }, { status: 500 });
  }

  let input: unknown;
  try {
    input = await req.json();
  } catch {
    return Response.json({ status: "error", message: "Invalid JSON body" }, { status: 400 });
  }
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return Response.json({ status: "error", message: "Expected an object of lead fields" }, { status: 400 });
  }

  /* Flat string fields only, size-capped. */
  const fields: Record<string, string> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>).slice(0, MAX_FIELDS)) {
    if (!/^[a-z][a-z0-9_]{0,63}$/i.test(key)) continue;
    if (value == null) continue;
    const str = Array.isArray(value) ? value.map(String).join(", ") : String(value);
    fields[key] = str.slice(0, MAX_FIELD);
  }

  /* Bot trap: a filled honeypot gets a quiet success and is not forwarded. */
  if (fields.honeypot) {
    return Response.json({ status: "success", skipped: true });
  }

  let res: Response;
  try {
    res = await fetch(DESK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ form: "contact", honeypot: "", ...fields }),
      cache: "no-store",
    });
  } catch {
    return Response.json({ status: "error", message: "Could not reach Desk" }, { status: 502 });
  }

  let data: Record<string, unknown> = {};
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  /* Desk ignores identical payloads for ~15 min; that counts as delivered. */
  if (data.duplicate) return Response.json(data);
  if (!res.ok) {
    return Response.json(
      { status: "error", message: typeof data.message === "string" ? data.message : `Desk rejected the lead (${res.status})` },
      { status: res.status >= 500 ? 502 : res.status }
    );
  }
  return Response.json(data);
}
