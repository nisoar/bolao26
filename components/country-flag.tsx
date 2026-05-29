"use client"

import Image from "next/image"

interface CountryFlagProps {
  countryName?: string
  country?: string // alias for countryName
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
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
  Turkey: "tr",
  Ukraine: "ua",
  Wales: "gb-wls",
  Chile: "cl",
  Peru: "pe",
  Venezuela: "ve",
  CostaRica: "cr",
  "Costa Rica": "cr",
  Honduras: "hn",
  ElSalvador: "sv",
  "El Salvador": "sv",
  Guatemala: "gt",
  Nicaragua: "ni",
  TrinidadAndTobago: "tt",
  "Trinidad and Tobago": "tt",
}

const sizeMap = {
  sm: { width: 16, height: 12, flagWidth: "w20" },
  md: { width: 24, height: 18, flagWidth: "w40" },
  lg: { width: 32, height: 24, flagWidth: "w40" },
  xl: { width: 48, height: 36, flagWidth: "w80" },
}

export function CountryFlag({ countryName, country, className = "", size = "md" }: CountryFlagProps) {
  const name = countryName || country || ""
  const countryCode = countryCodeMap[name] || countryCodeMap[name.replace(/_/g, " ")] || "un"
  const { width, height, flagWidth } = sizeMap[size]

  return (
    <Image
      src={`https://flagcdn.com/${flagWidth}/${countryCode}.png`}
      srcSet={`https://flagcdn.com/${flagWidth === "w20" ? "w40" : "w80"}/${countryCode}.png 2x`}
      width={width}
      height={height}
      alt={`${name} flag`}
      className={`inline-block rounded-sm shadow-sm ${className}`}
      unoptimized
    />
  )
}
