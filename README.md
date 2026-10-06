# Chili Labs trial landing page (Next.js)

Next.js 15 (App Router) + TypeScript port of the static `index.html` landing page.

## Run

```bash
npm install
cp .env.example .env.local   # then put the real Desk key in DESK_API_KEY
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Lead capture (Getnos Desk)

- `components/LeadForm.tsx`: the 3-step trial form popup. Every `[data-go]` button opens it.
- `lib/submitLead.ts`: client helper. It posts the flat lead answers to `/api/lead`.
- `app/api/lead/route.ts`: server route. It adds `DESK_API_KEY` and forwards to `DESK_URL`.
  The key never reaches the browser.
- Qualified leads (Shopify stores) are sent to Desk when they submit step 3, with subject
  "New Chili Labs trial lead". If the send fails, the visitor sees an error and can retry.
- Not-a-fit visitors (another platform) are not sent, because they leave no contact details.
- Window events `chili:lead` and `chili:booking` still fire for Google Sheet / Meta Pixel wiring.

Set `DESK_URL` and `DESK_API_KEY` in the hosting platform's environment settings for production.

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
