/* Getnos Desk lead endpoint.
   The "lh_" key is a lead-submit key: Desk's own landing-page snippet calls the API
   from the browser with it, so it is safe to ship. DESK_API_KEY (server) and
   NEXT_PUBLIC_DESK_API_KEY (browser fallback) override it per environment. */

export const DESK_URL = "https://deskbackend.getnos.io/v1/lead";
export const DESK_LEAD_KEY = "lh_nu6mKlAAAVt3b_HEN3feJHZjw7inlcfA3J_OnrPyqpo";
