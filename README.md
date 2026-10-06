# Chili Labs trial landing page (Next.js)

Next.js 15 (App Router) + TypeScript port of the static `index.html` landing page.

## Run

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Lead capture (Getnos Desk)

- `components/LeadForm.tsx`: the 3-step trial form popup. Every `[data-go]` button opens it.
- `lib/desk.ts`: Desk URL and the lead-submit key (`lh_…`), so it works with no setup.
- `lib/submitLead.ts`: client helper. It posts the flat lead answers to `/api/lead`. If that
  route is unavailable (static hosting, server error), it posts straight to Desk from the
  browser, like Desk's own landing-page snippet. For that path, the site's domain must be
  in Desk's allowed origins (CORS).
- `app/api/lead/route.ts`: server route. It forwards to Desk with `DESK_API_KEY`, or the
  built-in key when that env var is not set.
- `lib/phone.ts`: WhatsApp number rules. There is a country picker with flags, defaulting to
  +91. India needs exactly 10 digits starting with 6–9. Other countries need 7–14 digits.
  The error shows under the field.
- Qualified leads (Shopify stores) are sent to Desk when they submit step 3, with subject
  "New Chili Labs trial lead". If the send fails, the visitor sees an error and can retry.
- Not-a-fit visitors (another platform) are not sent, because they leave no contact details.
- Window events `chili:lead` and `chili:booking` still fire for Google Sheet / Meta Pixel wiring.

Optional overrides (hosting env settings or `.env.local`, see `.env.example`):
`DESK_URL`, `DESK_API_KEY` (server) and `NEXT_PUBLIC_DESK_API_KEY` (browser fallback).

## Layout

| Path | What |
| --- | --- |
| `app/page.tsx` | Page entry |
| `app/layout.tsx` | Metadata, fonts |
| `app/globals.css` | All page styles |
| `components/LandingMarkup.tsx` | Page sections (server component) |
| `components/LandingEffects.tsx` | Menu, animations, demo, calculator, reels, countdown, ticker |
| `lib/booking.ts` | Call-slot picker settings (`BOOKING_URL`, hours per market) |
| `public/img/` | Images extracted from the original inline data URIs |

## Before paid traffic

See the VERIFY list at the top of `app/page.tsx`. The proof ticker entries in
`components/LandingEffects.tsx` are placeholders.
