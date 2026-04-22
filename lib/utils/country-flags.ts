// Convert country code to flag emoji using Regional Indicator Symbols
function countryCodeToFlag(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65))
    .join("")
}

// Map country names to their ISO 3166-1 alpha-2 codes
const countryCodeMap: Record<string, string> = {
  USA: "us",
  Mexico: "mx",
  Canada: "ca",
  Algeria: "dz",
  Argentina: "ar",
  Australia: "au",
  Austria: "at",
  Belgium: "be",
  Brazil: "br",
  Cape_Verde: "cv",
  Colombia: "co",
  Croatia: "hr",
  Curaçao: "cw",
  Ecuador: "ec",
  Egypt: "eg",
  England: "gb-eng",
  France: "fr",
  Germany: "de",
  Ghana: "gh",
  Haiti: "ht",
  Iran: "ir",
  Ivory_Coast: "ci",
  Japan: "jp",
  Jordan: "jo",
  Morocco: "ma",
  Netherlands: "nl",
  New_Zealand: "nz",
  Norway: "no",
  Panama: "pa",
  Paraguay: "py",
  Portugal: "pt",
  Qatar: "qa",
  Saudi_Arabia: "sa",
  Scotland: "gb-sct",
  Senegal: "sn",
  South_Africa: "za",
  South_Korea: "kr",
  Spain: "es",
  Switzerland: "ch",
  Tunisia: "tn",
  Uruguay: "uy",
  Uzbekistan: "uz",
  Albania: "al",
  Bolivia: "bo",
  BosniaAndHerzegovina: "ba",
  Czechia: "cz",
  Denmark: "dk",
  DRCongo: "cd",
  Iraq: "iq",
  Italy: "it",
  Jamaica: "jm",
  Kosovo: "xk",
  NewCaledonia: "nc",
  NorthMacedonia: "mk",
  NorthernIreland: "gb-nir",
  Poland: "pl",
  RepublicOfIreland: "ie",
  Romania: "ro",
  Slovakia: "sk",
  Suriname: "sr",
  Sweden: "se",
  Türkiye: "tr",
  Ukraine: "ua",
  Wales: "gb-wls"
}

// Map country names to their flag emojis
export function getCountryFlag(countryName: string): string {
  const countryCode = countryCodeMap[countryName]

  if (!countryCode) {
    return "🏳️" // White flag as fallback
  }

  // Special case for England - use GB flag since England subdivision flag has rendering issues
  if (countryCode === "GB-ENG") {
    return countryCodeToFlag("GB")
  }

  return countryCodeToFlag(countryCode)
}
