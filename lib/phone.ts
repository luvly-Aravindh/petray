/* WhatsApp number: country code picker + digit rules.
   India (+91): exactly 10 digits, starting with 6, 7, 8 or 9.
   Every other country: 7 to 14 digits. */

export type Country = { iso: string; name: string; dial: string };

export const COUNTRIES: Country[] = [
  { iso: "IN", name: "India", dial: "91" },
  { iso: "US", name: "United States", dial: "1" },
  { iso: "CA", name: "Canada", dial: "1" },
  { iso: "GB", name: "United Kingdom", dial: "44" },
  { iso: "AE", name: "United Arab Emirates", dial: "971" },
  { iso: "SA", name: "Saudi Arabia", dial: "966" },
  { iso: "QA", name: "Qatar", dial: "974" },
  { iso: "KW", name: "Kuwait", dial: "965" },
  { iso: "OM", name: "Oman", dial: "968" },
  { iso: "BH", name: "Bahrain", dial: "973" },
  { iso: "SG", name: "Singapore", dial: "65" },
  { iso: "MY", name: "Malaysia", dial: "60" },
  { iso: "ID", name: "Indonesia", dial: "62" },
  { iso: "PH", name: "Philippines", dial: "63" },
  { iso: "TH", name: "Thailand", dial: "66" },
  { iso: "AU", name: "Australia", dial: "61" },
  { iso: "NZ", name: "New Zealand", dial: "64" },
  { iso: "DE", name: "Germany", dial: "49" },
  { iso: "FR", name: "France", dial: "33" },
  { iso: "NL", name: "Netherlands", dial: "31" },
  { iso: "IE", name: "Ireland", dial: "353" },
  { iso: "ES", name: "Spain", dial: "34" },
  { iso: "IT", name: "Italy", dial: "39" },
  { iso: "ZA", name: "South Africa", dial: "27" },
  { iso: "NG", name: "Nigeria", dial: "234" },
  { iso: "KE", name: "Kenya", dial: "254" },
  { iso: "BD", name: "Bangladesh", dial: "880" },
  { iso: "LK", name: "Sri Lanka", dial: "94" },
  { iso: "NP", name: "Nepal", dial: "977" },
  { iso: "PK", name: "Pakistan", dial: "92" },
  { iso: "BR", name: "Brazil", dial: "55" },
  { iso: "MX", name: "Mexico", dial: "52" },
];

export const DEFAULT_COUNTRY = "IN";

export function countryOf(iso: string): Country {
  return COUNTRIES.find((c) => c.iso === iso) || COUNTRIES[0];
}

export function maxDigits(iso: string): number {
  return iso === "IN" ? 10 : 14;
}

/* Digits only. A pasted number that still carries its country code is trimmed. */
export function cleanDigits(raw: string, iso: string): string {
  let d = raw.replace(/\D/g, "");
  const { dial } = countryOf(iso);
  const max = maxDigits(iso);
  if (d.length > max && d.startsWith(dial)) d = d.slice(dial.length);
  if (iso === "IN" && d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return d.slice(0, max);
}

/* Returns an error message, or "" when the number is valid. */
export function phoneError(digits: string, iso: string): string {
  if (!digits) return "Add your WhatsApp number so setup help can reach you.";
  if (iso === "IN") {
    if (!/^[6-9]/.test(digits)) return "Indian mobile numbers start with 6, 7, 8 or 9.";
    if (digits.length !== 10) return "Enter all 10 digits of your mobile number.";
    return "";
  }
  if (digits.length < 7 || digits.length > 14) return "Enter a valid number: 7 to 14 digits after the country code.";
  return "";
}

export function flagUrl(iso: string): string {
  return `https://flagcdn.com/w40/${iso.toLowerCase()}.png`;
}
