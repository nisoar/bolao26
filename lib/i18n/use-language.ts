"use client"

import { useState, useEffect, useCallback } from "react"
import type { Locale } from "./translations"

const STORAGE_KEY = "wc2026-locale"
const DEFAULT_LOCALE: Locale = "en"

function getStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && ["en", "pt", "es", "it", "fr"].includes(stored)) {
      return stored as Locale
    }
  } catch {}
  return DEFAULT_LOCALE
}

export function useLanguage() {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    // Check for lang parameter in URL first
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const langParam = params.get("lang")
      
      if (langParam && ["en", "pt", "es", "it", "fr"].includes(langParam)) {
        const urlLocale = langParam as Locale
        setLocaleState(urlLocale)
        try {
          localStorage.setItem(STORAGE_KEY, urlLocale)
        } catch {}
        return
      }
    }
    
    // Fall back to localStorage
    setLocaleState(getStoredLocale())
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      localStorage.setItem(STORAGE_KEY, newLocale)
    } catch {}
    // Dispatch a storage event so other components on the page update
    window.dispatchEvent(new CustomEvent("locale-change", { detail: newLocale }))
  }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<Locale>
      setLocaleState(customEvent.detail)
    }
    window.addEventListener("locale-change", handler)
    return () => window.removeEventListener("locale-change", handler)
  }, [])

  return { locale, setLocale }
}

// For server components: read from cookies
export function getServerLocale(): Locale {
  return DEFAULT_LOCALE
}
