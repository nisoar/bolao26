"use client"

import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle } from "lucide-react"

export function AdminTitle() {
  const { locale } = useLanguage()
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Shield className="h-8 w-8 text-green-700" />
        <h2 className="text-3xl font-bold text-green-700">{t("admin", "panel", locale)}</h2>
      </div>
      <p className="text-muted-foreground">{t("admin", "manageMatches", locale)}</p>
    </div>
  )
}

export function AdminInstructions() {
  const { locale } = useLanguage()
  return (
    <Card className="mb-8 bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-lg">{t("admin", "instructions", locale)}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>
          <strong>{t("admin", "addNewMatch", locale)}:</strong> {t("admin", "instructionAdd", locale)}
        </p>
        <p>
          <strong>{t("admin", "edit", locale)}:</strong> {t("admin", "instructionEdit", locale)}
        </p>
        <p>
          <strong>{t("admin", "setFinalScore", locale)}:</strong> {t("admin", "instructionScore", locale)}
        </p>
        <p>
          <strong>{t("admin", "delete", locale)}:</strong> {t("admin", "instructionDelete", locale)}
        </p>
      </CardContent>
    </Card>
  )
}

export function AdminNoMatches() {
  const { locale } = useLanguage()
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">{t("admin", "noMatches", locale)}</p>
    </div>
  )
}

export function AdminAccessDenied() {
  const { locale } = useLanguage()
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-6 w-6" />
          <CardTitle>{t("admin", "accessDenied", locale)}</CardTitle>
        </div>
        <CardDescription>{t("admin", "accessDeniedDesc", locale)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{t("admin", "accessDeniedInfo", locale)}</p>
      </CardContent>
    </Card>
  )
}
