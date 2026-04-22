"use client"

import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"

export function DashboardTitle() {
  const { locale } = useLanguage()
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-green-700 mb-2">{t("dashboard", "title", locale)}</h2>
      <p className="text-muted-foreground">{t("dashboard", "subtitle", locale)}</p>
    </div>
  )
}

export function DashboardEmpty() {
  const { locale } = useLanguage()
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">{t("dashboard", "noMatches", locale)}</p>
    </div>
  )
}
