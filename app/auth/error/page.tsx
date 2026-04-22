"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const errorParam = searchParams.get("error")
  const { locale } = useLanguage()

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-destructive">{t("auth", "authError", locale)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {errorParam ? (
                <p className="text-sm text-muted-foreground">Error: {errorParam}</p>
              ) : (
                <p className="text-sm text-muted-foreground">{t("auth", "unspecifiedError", locale)}</p>
              )}
              <Button asChild className="w-full">
                <Link href="/auth/login">{t("auth", "backToLogin", locale)}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
