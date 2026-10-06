/* Meeting booking (v9.4)
   Option A: set BOOKING_URL to the Chili Labs Calendly or Cal.com link. The form embeds it
   inline (no redirect), prefilled with name and email.
   Option B (default, BOOKING_URL empty): built-in slot picker. The chosen slot fires a
   "chili:booking" event for the Google Leads Sheet; the team confirms on WhatsApp.
   VERIFY with Chili Labs: call length and the hours their team can take calls for each market. */

export const BOOKING_URL: string = "";
export const CALL_MINUTES = 20;

type Hours = { tz: string; start: [number, number]; end: [number, number]; days: number[] };

const HOURS: Record<string, Hours> = {
  india: { tz: "Asia/Kolkata", start: [10, 0], end: [19, 0], days: [1, 2, 3, 4, 5, 6] },
  us: { tz: "America/New_York", start: [9, 0], end: [13, 0], days: [1, 2, 3, 4, 5] },
  global: { tz: "Asia/Kolkata", start: [10, 0], end: [19, 0], days: [1, 2, 3, 4, 5] },
};
const LEAD_HOURS = 2;
const DAYS_AHEAD = 7;

export type BookingDay = { key: string; first: number; slots: number[] };

function tzOffset(ms: number, tz: string): number {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const o: Record<string, string> = {};
  f.formatToParts(new Date(ms)).forEach((x) => { o[x.type] = x.value; });
  return Date.UTC(+o.year, +o.month - 1, +o.day, +o.hour % 24, +o.minute, +o.second) - ms;
}

function zoned(y: number, m: number, d: number, h: number, mi: number, tz: string): number {
  const g = Date.UTC(y, m, d, h, mi);
  const t = g - tzOffset(g, tz);
  return t - (tzOffset(t, tz) - tzOffset(g, tz));
}

function partsIn(ms: number, tz: string) {
  const f = new Intl.DateTimeFormat("en-US", { timeZone: tz, year: "numeric", month: "numeric", day: "numeric", weekday: "short" });
  const o: Record<string, string> = {};
  f.formatToParts(new Date(ms)).forEach((x) => { o[x.type] = x.value; });
  return { y: +o.year, m: +o.month - 1, d: +o.day, wd: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday) };
}

export function buildDays(market: string): BookingDay[] {
  const H = HOURS[market] || HOURS.global;
  const now = Date.now();
  const out: BookingDay[] = [];
  for (let i = 0; i < 21 && out.length < DAYS_AHEAD; i++) {
    const p = partsIn(now + i * 864e5, H.tz);
    if (H.days.indexOf(p.wd) < 0) continue;
    const slots: number[] = [];
    const end = zoned(p.y, p.m, p.d, H.end[0], H.end[1], H.tz);
    for (let t = zoned(p.y, p.m, p.d, H.start[0], H.start[1], H.tz); t + CALL_MINUTES * 6e4 <= end; t += 30 * 6e4) {
      if (t > now + LEAD_HOURS * 36e5) slots.push(t);
    }
    if (slots.length) out.push({ key: `${p.y}-${p.m}-${p.d}`, first: slots[0], slots });
  }
  return out;
}

export function fmt(ms: number, o: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(undefined, o).format(new Date(ms));
}

export function localTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "your time";
}
