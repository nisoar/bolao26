import Image from "next/image"

interface CountryFlagProps {
  countryName: string
  className?: string
}

// Map country names to their ISO 3166-1 alpha-2 codes
const countryCodeMap: Record<string, string> = {
  USA: "us",
  "United States": "us",
  Mexico: "mx",
  Canada: "ca",
  Algeria: "dz",
  Argentina: "ar",
  Australia: "au",
  Austria: "at",
  Belgium: "be",
  Brazil: "br",
  Cape_Verde: "cv",
  "Cape Verde": "cv",
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
  "Ivory Coast": "ci",
  Japan: "jp",
  Jordan: "jo",
  Morocco: "ma",
  Netherlands: "nl",
  New_Zealand: "nz",
  "New Zealand": "nz",
  Norway: "no",
  Panama: "pa",
  Paraguay: "py",
  Portugal: "pt",
  Qatar: "qa",
  Saudi_Arabia: "sa",
  "Saudi Arabia": "sa",
  Scotland: "gb-sct",
  Senegal: "sn",
  South_Africa: "za",
  "South Africa": "za",
  South_Korea: "kr",
  "South Korea": "kr",
  Spain: "es",
  Switzerland: "ch",
  Tunisia: "tn",
  Uruguay: "uy",
  Uzbekistan: "uz",
  Albania: "al",
  Bolivia: "bo",
  BosniaAndHerzegovina: "ba",
  "Bosnia and Herzegovina": "ba",
  Czechia: "cz",
  Denmark: "dk",
  DRCongo: "cd",
  Iraq: "iq",
  Italy: "it",
  Jamaica: "jm",
  Kosovo: "xk",
  NewCaledonia: "nc",
  "New Caledonia": "nc",
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

export function CountryFlag({ countryName, className = "" }: CountryFlagProps) {
  const countryCode = countryCodeMap[countryName] || "un"

  return (
    <Image
      src={`https://flagcdn.com/w20/${countryCode}.png`}
      srcSet={`https://flagcdn.com/w40/${countryCode}.png 2x`}
      width={20}
      height={15}
      alt={`${countryName} flag`}
      className={`inline-block ${className}`}
    />
  )
}
