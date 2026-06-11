const TIMEZONE = "America/Sao_Paulo"

/**
 * Formats a date string to a localized date + time string
 * using the Brazil timezone (BRT/BRST) explicitly.
 * Safe to use in both server and client components — always
 * produces the same output regardless of where it runs.
 */
export function formatMatchDateTime(date: string | Date, locale = "pt-BR"): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleString(locale, {
    timeZone: TIMEZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/**
 * Formats only the time portion of a date in Brazil timezone.
 */
export function formatMatchTime(date: string | Date, locale = "pt-BR"): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleTimeString(locale, {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
  })
}

/**
 * Returns the date key (YYYY-MM-DD) in Brazil timezone,
 * used to group matches by calendar day correctly.
 */
export function getDateKeyBrasilia(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d)
  return parts // returns "YYYY-MM-DD"
}

/**
 * Converts a UTC date string from the DB into the local "datetime-local" input
 * format (YYYY-MM-DDTHH:mm) expressed in Brazil timezone.
 * This ensures the admin sees and edits the correct BRT time.
 */
export function formatDateForBRTInput(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date
  const datePart = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d) // "YYYY-MM-DD"

  const timePart = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d) // "HH:mm"

  return `${datePart}T${timePart}`
}

/**
 * Converts a "datetime-local" input value (YYYY-MM-DDTHH:mm) that the admin
 * entered in BRT into an ISO 8601 UTC string suitable for storing in the DB.
 */
export function brtInputToUTC(localDatetime: string): string {
  // Append the BRT offset so the Date constructor parses it correctly
  const withOffset = `${localDatetime}:00-03:00`
  return new Date(withOffset).toISOString()
}
