"use client";

/* Trial form popup. Every element with [data-go] on the page opens it.
   Qualified leads are sent to Getnos Desk (via /api/lead) before the booking step.
   Every outcome also fires window "chili:lead" (and "chili:booking" for a picked slot)
   for the Google Leads Sheet / Meta Pixel wiring. */

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { submitLead } from "@/lib/submitLead";
import { BOOKING_URL, CALL_MINUTES, buildDays, fmt, localTimeZone, type BookingDay } from "@/lib/booking";

type Opt = { value: string; label: string };

const PLATFORM: Opt[] = [
  { value: "shopify", label: "On Shopify, and taking orders" },
  { value: "shopify_prelaunch", label: "On Shopify, launching soon" },
  { value: "other", label: "Another platform (WooCommerce, custom, marketplaces)" },
];
const MARKET: Opt[] = [
  { value: "india", label: "India" },
  { value: "us", label: "United States" },
  { value: "global", label: "Elsewhere" },
];
const ORDERS: Opt[] = [
  { value: "lt300", label: "Under 300" },
  { value: "300_1000", label: "300 to 1,000" },
  { value: "1000_5000", label: "1,000 to 5,000" },
  { value: "gt5000", label: "5,000 plus" },
];
const TEAM: Opt[] = [
  { value: "founder", label: "Just me" },
  { value: "2_5", label: "2 to 5 people" },
  { value: "6plus", label: "6 or more" },
  { value: "outsourced", label: "An outsourced team" },
];
const CHANNELS: Opt[] = [
  { value: "email", label: "Email" },
  { value: "chat", label: "Website chat" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "instagram", label: "Instagram DMs" },
  { value: "phone", label: "Phone calls" },
  { value: "helpdesk", label: "Another helpdesk" },
];
const PLAN: Opt[] = [
  { value: "starter", label: "Starter, $29" },
  { value: "growth", label: "Growth, $59" },
  { value: "pro", label: "Pro, $99" },
  { value: "unsure", label: "Not sure yet" },
];

type Values = {
  platform: string; store: string; market: string;
  orders: string; team: string; channels: string[];
  name: string; email: string; phone: string; plan: string;
  honeypot: string;
};
type FieldName = Exclude<keyof Values, "honeypot">;

const EMPTY: Values = {
  platform: "", store: "", market: "", orders: "", team: "", channels: [],
  name: "", email: "", phone: "", plan: "", honeypot: "",
};
const STEP_FIELDS: FieldName[][] = [
  ["platform", "store", "market"],
  ["orders", "team", "channels"],
  ["name", "email", "phone", "plan"],
];
const PAGE_VERSION = "chililabs_trial_lp_v9.4";

type Lead = {
  qualified: boolean; platform: string; store: string; market: string; orders: string; team: string;
  channels: string; name: string; email: string; phone: string; plan: string; page: string; ts: string; tier: string;
};
type Phase = "form" | "booking" | "booked" | "skipped" | "notfit";

const labelOf = (opts: Opt[], v: string) => opts.find((o) => o.value === v)?.label || v;

function fieldOk(name: FieldName, v: Values): boolean {
  const val = v[name];
  if (name === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val as string);
  if (name === "phone") return (val as string).replace(/[^\d]/g, "").length >= 10;
  if (name === "store") return v.platform === "other" || ((val as string).length >= 4 && /\./.test(val as string));
  if (Array.isArray(val)) return val.length > 0;
  return !!(val as string).trim();
}

/* Lead tier for the Google Leads Sheet.
   hot     = live Shopify store AND (1,000+ orders a month, OR 300 to 1,000 with a team, OR already on another helpdesk)
   warm    = live Shopify store, everything else
   nurture = Shopify, launching soon
   not_fit = another platform */
function tierOf(l: Omit<Lead, "tier">): string {
  if (l.platform === "other") return "not_fit";
  if (l.platform === "shopify_prelaunch") return "nurture";
  const big = l.orders === "1000_5000" || l.orders === "gt5000";
  const mid = l.orders === "300_1000" && !!l.team && l.team !== "founder";
  const switching = (l.channels || "").indexOf("helpdesk") > -1;
  return big || mid || switching ? "hot" : "warm";
}

const Arrow = () => (
  <span className="arr" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  </span>
);
const Tick = () => (
  <div className="done-ic">
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.2 4.2L19 7" />
    </svg>
  </div>
);

function NextSteps({ onCall }: { onCall: boolean }) {
  return (
    <div className="next">
      <div><b className="n">1</b><span>Open the Shopify App Store, search for Chililabs: AI Customer Support and tap Install.</span></div>
      <div><b className="n">2</b><span>Approve it in Shopify. Setup takes under 7 minutes.</span></div>
      <div>
        <b className="n">3</b>
        <span>
          {onCall
            ? "On your call, the Chili Labs team sets up your issue flow and AI replies with you."
            : "The Chili Labs team messages you on WhatsApp and email to set up your issue flow and AI replies with you."}
        </span>
      </div>
    </div>
  );
}

function OptionGroup(props: {
  name: FieldName; labelId: string; label: string; opts: Opt[]; className?: string;
  type?: "radio" | "checkbox"; values: Values; onPick: (name: FieldName, value: string, checked: boolean) => void;
}) {
  const { name, labelId, label, opts, className, type = "radio", values, onPick } = props;
  return (
    <>
      <span className="lab" id={labelId}>{label}</span>
      <div className={`opts${className ? " " + className : ""}`} role={type === "radio" ? "radiogroup" : "group"} aria-labelledby={labelId}>
        {opts.map((o) => {
          const v = values[name];
          const checked = Array.isArray(v) ? v.includes(o.value) : v === o.value;
          return (
            <label className="opt" key={o.value}>
              <input type={type} name={name} value={o.value} checked={checked} onChange={(e) => onPick(name, o.value, e.target.checked)} />
              <span>{o.label}</span>
            </label>
          );
        })}
      </div>
    </>
  );
}

export default function LeadForm() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(EMPTY);
  const [bad, setBad] = useState<Set<FieldName>>(new Set());
  const [phase, setPhase] = useState<Phase>("form");
  const [lead, setLead] = useState<Lead | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [bookedSlot, setBookedSlot] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const lastCta = useRef<HTMLElement | null>(null);
  const reduce = useRef(false);

  const scrollTop = useCallback(() => {
    cardRef.current?.scrollTo({ top: 0, behavior: reduce.current ? "auto" : "smooth" });
  }, []);

  /* open from any [data-go] CTA */
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function onClick(e: MouseEvent) {
      const cta = (e.target as Element | null)?.closest?.("[data-go]");
      if (!cta) return;
      lastCta.current = cta as HTMLElement;
      setOpen(true);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    lastCta.current?.focus({ preventScroll: true });
  }, []);

  /* while open: lock scroll, focus first field, Escape + focus trap */
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("locked");
    if (cardRef.current) cardRef.current.scrollTop = 0;
    const t = setTimeout(() => {
      const f = cardRef.current?.querySelector<HTMLElement>(".fstep.on input") || cardRef.current?.querySelector<HTMLElement>(".f-close");
      f?.focus({ preventScroll: true });
    }, reduce.current ? 0 : 380);
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "Tab" || !cardRef.current) return;
      const f = Array.from(cardRef.current.querySelectorAll<HTMLElement>("button,input,summary,iframe"))
        .filter((el) => el.offsetParent !== null && !(el as HTMLButtonElement).disabled);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("locked");
    };
  }, [open, close]);

  function pick(name: FieldName, value: string, checked: boolean) {
    setValues((v) => {
      if (name === "channels") {
        const set = new Set(v.channels);
        if (checked) set.add(value); else set.delete(value);
        return { ...v, channels: CHANNELS.map((c) => c.value).filter((c) => set.has(c)) };
      }
      return { ...v, [name]: value };
    });
    clearBad(name);
  }
  function setText(name: FieldName, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    clearBad(name);
  }
  function clearBad(name: FieldName) {
    setBad((b) => { if (!b.has(name)) return b; const n = new Set(b); n.delete(name); return n; });
  }

  function check(i: number): boolean {
    const wrong = STEP_FIELDS[i].filter((n) => !fieldOk(n, values));
    setBad(new Set(wrong));
    if (wrong.length) {
      const fld = formRef.current?.querySelector<HTMLElement>(`.fld[data-req="${wrong[0]}"] input`);
      fld?.focus();
    }
    return wrong.length === 0;
  }

  function show(i: number) {
    setStep(i);
    setSendError("");
    scrollTop();
    setTimeout(() => {
      formRef.current?.querySelector<HTMLElement>(`.fstep[data-step="${i + 1}"] input`)?.focus({ preventScroll: true });
    }, 60);
  }

  function next() {
    if (!check(step)) return;
    if (step === 0 && values.platform === "other") { finish(false); return; }
    show(step + 1);
  }

  async function finish(qualified: boolean) {
    const base = {
      qualified, platform: values.platform, store: values.store.trim(), market: values.market,
      orders: values.orders, team: values.team, channels: values.channels.join(", "),
      name: values.name.trim(), email: values.email.trim(), phone: values.phone.trim(), plan: values.plan,
      page: PAGE_VERSION, ts: new Date().toISOString(),
    };
    const l: Lead = { ...base, tier: tierOf(base) };
    try { window.dispatchEvent(new CustomEvent("chili:lead", { detail: l })); } catch { /* ignore */ }

    if (!qualified) {
      /* fbq('trackCustom','NotAFit') here */
      setLead(l); setPhase("notfit"); scrollTop();
      return;
    }

    setSending(true);
    setSendError("");
    try {
      await submitLead({
        name: l.name,
        email: l.email,
        phone: l.phone,
        platform: labelOf(PLATFORM, l.platform),
        store: l.store,
        market: labelOf(MARKET, l.market),
        orders: labelOf(ORDERS, l.orders),
        team: labelOf(TEAM, l.team),
        channels: values.channels.map((c) => labelOf(CHANNELS, c)).join(", "),
        plan: labelOf(PLAN, l.plan),
        tier: l.tier,
        qualified: "yes",
        honeypot: values.honeypot,
        subject: "New Chili Labs trial lead" + (l.name ? " - " + l.name : ""),
        source: "chililabs_trial_lp",
        page: window.location.href,
        submitted_at: l.ts,
      });
    } catch (err) {
      setSending(false);
      setSendError("We could not send your details just now. Please check your connection and try again.");
      console.warn("Desk lead submit failed", err);
      return;
    }
    setSending(false);
    /* fbq('track','Lead') here */
    setLead(l); setPhase("booking"); scrollTop();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending || !check(2)) return;
    finish(true);
  }

  const done = phase !== "form";
  const opt = { values, onPick: pick };

  return (
    <div
      className={`fmodal${open ? " open" : ""}`} id="fmodal" role="dialog" aria-modal="true" aria-labelledby="fTitle" aria-hidden={!open}
      onClick={(e) => { const t = e.target as HTMLElement; if (t === e.currentTarget || t.classList.contains("fmodal-in")) close(); }}
    >
      <div className="fmodal-in">
        <div className="form-card" id="formCard" ref={cardRef}>
          <button type="button" className="f-close" id="fClose" aria-label="Close form" onClick={close}>&#10005;</button>
          {!done && (
            <>
              <h2 className="f-title" id="fTitle">Start your free trial</h2>
              <p className="f-intro">Three quick questions so we can set Chili Labs up for your store. About 60 seconds.</p>
              <div className="prog" aria-hidden="true">
                {[0, 1, 2].map((k) => <i key={k} className={k <= step ? "on" : undefined} />)}
              </div>
            </>
          )}
          {!done && (
            <form id="leadForm" noValidate ref={formRef} onSubmit={onSubmit}>
              <input
                type="text" name="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true"
                value={values.honeypot} onChange={(e) => setValues((v) => ({ ...v, honeypot: e.target.value }))}
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />

              <div className={`fstep${step === 0 ? " on" : ""}`} data-step="1">
                <h3>Your store</h3><p className="hint">Step 1 of 3</p>
                <div className={`fld${bad.has("platform") ? " bad" : ""}`} data-req="platform">
                  <OptionGroup name="platform" labelId="lp" label="Where does your store run?" opts={PLATFORM} className="one" {...opt} />
                  <p className="err">Pick one to continue.</p>
                </div>
                <div className={`fld${bad.has("store") ? " bad" : ""}`} data-req="store">
                  <label htmlFor="store">Store URL</label>
                  <input id="store" name="store" type="text" inputMode="url" autoComplete="url" placeholder="yourstore.com"
                    value={values.store} onChange={(e) => setText("store", e.target.value)} />
                  <p className="err">Add your store URL so we can connect the right store.</p>
                </div>
                <div className={`fld${bad.has("market") ? " bad" : ""}`} data-req="market">
                  <OptionGroup name="market" labelId="lm" label="Where are most of your customers?" opts={MARKET} className="three" {...opt} />
                  <p className="err">Pick one to continue.</p>
                </div>
                <div className="fnav"><button type="button" className="cta" onClick={next}>Continue<Arrow /></button></div>
              </div>

              <div className={`fstep${step === 1 ? " on" : ""}`} data-step="2">
                <h3>Your support queue</h3><p className="hint">Step 2 of 3</p>
                <div className={`fld${bad.has("orders") ? " bad" : ""}`} data-req="orders">
                  <OptionGroup name="orders" labelId="lo" label="Orders a month" opts={ORDERS} {...opt} />
                  <p className="err">Pick one to continue.</p>
                </div>
                <div className={`fld${bad.has("team") ? " bad" : ""}`} data-req="team">
                  <OptionGroup name="team" labelId="lt" label="Who answers support today?" opts={TEAM} {...opt} />
                  <p className="err">Pick one to continue.</p>
                </div>
                <div className={`fld${bad.has("channels") ? " bad" : ""}`} data-req="channels">
                  <OptionGroup name="channels" labelId="lc" label="Where do tickets come in? Pick all that apply." opts={CHANNELS} type="checkbox" {...opt} />
                  <p className="err">Pick at least one.</p>
                </div>
                <div className="fnav">
                  <button type="button" className="cta" onClick={next}>Continue<Arrow /></button>
                  <button type="button" className="back" onClick={() => show(Math.max(0, step - 1))}>Back</button>
                </div>
              </div>

              <div className={`fstep${step === 2 ? " on" : ""}`} data-step="3">
                <h3>Where should we send your trial?</h3><p className="hint">Step 3 of 3</p>
                <div className={`fld${bad.has("name") ? " bad" : ""}`} data-req="name">
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" type="text" autoComplete="name" placeholder="First and last name"
                    value={values.name} onChange={(e) => setText("name", e.target.value)} />
                  <p className="err">Add your name.</p>
                </div>
                <div className={`fld${bad.has("email") ? " bad" : ""}`} data-req="email">
                  <label htmlFor="email">Work email</label>
                  <input id="email" name="email" type="email" autoComplete="email" placeholder="you@yourstore.com"
                    value={values.email} onChange={(e) => setText("email", e.target.value)} />
                  <p className="err">Add a valid email.</p>
                </div>
                <div className={`fld${bad.has("phone") ? " bad" : ""}`} data-req="phone">
                  <label htmlFor="phone">WhatsApp number</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98xxx xxxxx or +1 555 xxx xxxx"
                    value={values.phone} onChange={(e) => setText("phone", e.target.value)} />
                  <p className="err">Add a number with country code, so setup help can reach you.</p>
                </div>
                <div className={`fld${bad.has("plan") ? " bad" : ""}`} data-req="plan">
                  <OptionGroup name="plan" labelId="lpl" label="Which plan are you leaning towards?" opts={PLAN} {...opt} />
                  <p className="err">Pick one to continue.</p>
                </div>
                {sendError && <p className="err" role="alert" style={{ display: "block", textAlign: "center" }}>{sendError}</p>}
                <div className="fnav">
                  <button type="submit" className="cta" disabled={sending} aria-busy={sending}>
                    {sending ? "Sending…" : "Start free trial"}<Arrow />
                  </button>
                  <button type="button" className="back" onClick={() => show(Math.max(0, step - 1))}>Back</button>
                </div>
                <p className="fine">We use your details only to set up your trial and help you get live.</p>
              </div>
            </form>
          )}
          {done && lead && (
            <div id="formDone">
              {phase === "notfit" && <NotAFit />}
              {phase === "booking" && (
                <Booking lead={lead} onBooked={(slot) => { setBookedSlot(slot); setPhase("booked"); scrollTop(); }}
                  onSkip={() => { setPhase("skipped"); scrollTop(); }} />
              )}
              {phase === "booked" && <Booked lead={lead} slotLocal={bookedSlot} />}
              {phase === "skipped" && (
                <div className="done-card">
                  <h3>No problem.</h3>
                  <p>Your 15-day free trial is ready. Here is what happens next.</p>
                  <NextSteps onCall={false} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NotAFit() {
  return (
    <div className="done-card">
      <div className="done-ic warn">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
          <path d="M12 7v6M12 17h.01" />
        </svg>
      </div>
      <h3>Chili Labs is built only for Shopify stores.</h3>
      <p>It reads Shopify order data directly, which is what keeps every reply accurate. Stores on other platforms cannot connect yet, so a trial would not help you today. We will let you know if that changes.</p>
    </div>
  );
}

function Booked({ lead, slotLocal }: { lead: Lead; slotLocal: string }) {
  return (
    <div className="done-card">
      <Tick />
      <h3>Your call is booked.</h3>
      <div className="booked">
        <b>{slotLocal}</b>
        {CALL_MINUTES} minutes with the Chili Labs team. The invite comes to {lead.email} and a reminder on WhatsApp.
      </div>
      <p>Before the call, get these done so we can go straight to setup.</p>
      <NextSteps onCall />
    </div>
  );
}

function Booking({ lead, onBooked, onSkip }: { lead: Lead; onBooked: (slotLocal: string) => void; onSkip: () => void }) {
  const first = lead.name.split(" ")[0] || "there";
  const days = useMemo<BookingDay[]>(() => (BOOKING_URL ? [] : buildDays(lead.market)), [lead.market]);
  const [dayIdx, setDayIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const tz = useMemo(localTimeZone, []);

  const head = (
    <>
      <Tick />
      <h3>You are in, {first}.</h3>
      <p>Last step. Pick a time for a {CALL_MINUTES}-minute setup call and the Chili Labs team will get {lead.store || "your store"} live with you.</p>
    </>
  );

  if (BOOKING_URL) {
    const u = BOOKING_URL + (BOOKING_URL.includes("?") ? "&" : "?") +
      "embed_type=Inline&hide_gdpr_banner=1&name=" + encodeURIComponent(lead.name) + "&email=" + encodeURIComponent(lead.email);
    return (
      <div className="done-card">
        {head}
        <iframe className="bk-frame" title="Book your setup call" src={u} />
        <button type="button" className="bk-skip" onClick={onSkip}>Skip for now</button>
      </div>
    );
  }

  const day = days[dayIdx];

  function confirm() {
    if (!picked) return;
    const slotLocal = fmt(picked, { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" });
    const booking = {
      email: lead.email, phone: lead.phone, name: lead.name, store: lead.store, tier: lead.tier, market: lead.market,
      slot_utc: new Date(picked).toISOString(), slot_local: slotLocal, visitor_tz: tz,
      minutes: CALL_MINUTES, page: lead.page, ts: new Date().toISOString(),
    };
    try { window.dispatchEvent(new CustomEvent("chili:booking", { detail: booking })); } catch { /* ignore */ }
    /* Dev: append booking to the Google Leads Sheet row matched on email, and create the calendar invite. fbq('track','Schedule') here. */
    onBooked(slotLocal);
  }

  return (
    <div className="done-card">
      {head}
      <div className="bk">
        <div className="bk-h">Choose a day</div>
        <div className="bk-days" role="group" aria-label="Day">
          {days.map((d, i) => (
            <button type="button" className="bk-day" key={d.key} aria-pressed={i === dayIdx}
              onClick={() => { setDayIdx(i); setPicked(null); }}>
              <small>{fmt(d.first, { weekday: "short" })}</small>
              <b>{fmt(d.first, { day: "numeric" })}</b>
              <small>{fmt(d.first, { month: "short" })}</small>
            </button>
          ))}
        </div>
        <div className="bk-h">Choose a time</div>
        <div className="bk-slots" role="group" aria-label="Time">
          {day ? day.slots.map((t) => (
            <button type="button" className="bk-slot" key={t} aria-pressed={picked === t} onClick={() => setPicked(t)}>
              {fmt(t, { hour: "numeric", minute: "2-digit" })}
            </button>
          )) : <p className="bk-empty">No open times right now. Skip and the team will message you.</p>}
        </div>
        <p className="bk-tz">Times shown in your time zone ({tz}).</p>
        <button type="button" className="cta" disabled={!picked} onClick={confirm}>Confirm my call<Arrow /></button>
        <button type="button" className="bk-skip" onClick={onSkip}>Skip, I will install first</button>
      </div>
    </div>
  );
}
