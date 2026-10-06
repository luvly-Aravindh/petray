/* Getnos Desk — landing page lead submit (client side).
   Call once per form submit. Each answer is its own JSON field; extra / custom
   keys are saved too. Posts to /api/lead, which adds the Desk key on the server. */

export type LeadFields = Record<string, string | string[] | undefined>;

export type DeskResult = {
  status?: string;
  leadId?: string;
  duplicate?: boolean;
  skipped?: boolean;
  message?: string;
};

let submitting = false;

export async function submitLead(fields: LeadFields): Promise<DeskResult> {
  if (submitting) return { duplicate: true, skipped: true };
  submitting = true;
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ honeypot: "", ...fields }),
      keepalive: true,
    });

    let data: DeskResult = {};
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    // Desk ignores identical payloads for ~15 min — treat as success
    if (data.duplicate) return data;

    if (!res.ok) {
      throw new Error(data.message || `Lead submit failed (${res.status})`);
    }

    return data; // { status: "success", leadId }
  } finally {
    submitting = false;
  }
}
