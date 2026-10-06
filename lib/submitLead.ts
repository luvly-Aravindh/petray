/* Getnos Desk — landing page lead submit (client side).
   Call once per form submit. Each answer is its own JSON field; extra / custom
   keys are saved too.
   1. Posts to /api/lead (server route adds the Desk key).
   2. If that route is unavailable (static hosting, server error, network), posts
      straight to Desk from the browser, exactly like Desk's landing-page snippet. */

import { DESK_LEAD_KEY, DESK_URL } from "./desk";

export type LeadFields = Record<string, string | string[] | undefined>;

export type DeskResult = {
  status?: string;
  leadId?: string;
  duplicate?: boolean;
  skipped?: boolean;
  message?: string;
};

let submitting = false;

function flatten(fields: LeadFields): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v == null) continue;
    out[k] = Array.isArray(v) ? v.join(", ") : v;
  }
  return out;
}

async function readJson(res: Response): Promise<DeskResult> {
  try {
    return (await res.json()) as DeskResult;
  } catch {
    return {};
  }
}

async function viaServer(body: Record<string, string>): Promise<DeskResult> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  });
  const data = await readJson(res);
  // Desk ignores identical payloads for ~15 min — treat as success
  if (data.duplicate) return data;
  if (!res.ok) throw new Error(data.message || `Lead route failed (${res.status})`);
  return data;
}

async function viaDesk(body: Record<string, string>): Promise<DeskResult> {
  const key = process.env.NEXT_PUBLIC_DESK_API_KEY || DESK_LEAD_KEY;
  const res = await fetch(DESK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ form: "contact", ...body }),
    keepalive: true,
  });
  const data = await readJson(res);
  if (data.duplicate) return data;
  if (!res.ok) throw new Error(data.message || `Lead submit failed (${res.status})`);
  return data;
}

export async function submitLead(fields: LeadFields): Promise<DeskResult> {
  if (submitting) return { duplicate: true, skipped: true };
  submitting = true;
  const body = { honeypot: "", ...flatten(fields) };
  try {
    try {
      return await viaServer(body);
    } catch (serverErr) {
      console.warn("Lead route unavailable, sending to Desk directly", serverErr);
      return await viaDesk(body);
    }
  } finally {
    submitting = false;
  }
}
