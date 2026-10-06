/*
  CHILI LABS TRIAL LANDING PAGE v9.4 (built by GetNos, on approved v9), Next.js edition.
  VERIFY BEFORE PAID TRAFFIC:
  1. Reviews are verbatim Shopify App Store reviews (4.6 from 5 reviews). Product screenshots are from the same listing.
  2. Trial length: App Store listing says 15 days, dossier says 14. Page uses 15. Confirm.
  3. Pricing and ticket limits are from the App Store listing. AI drafts start on Growth.
  4. "Under 7 minutes" setup is from chililabs.ai. Confirm.
  5. Proof ticker entries (components/LandingEffects.tsx) must be replaced with real trial starts before launch.
  6. Qualified form submissions go to Getnos Desk via /api/lead, and fire window event "chili:lead"
     (plus "chili:booking" for a picked call slot) for CRM and Meta Pixel wiring.
*/
import LandingMarkup from "@/components/LandingMarkup";
import LandingEffects from "@/components/LandingEffects";

export default function Page() {
  return (
    <>
      <LandingMarkup />
      <LandingEffects />
    </>
  );
}
