"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function SignUpSuccessPage() {
  const { locale } = useLanguage()

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-700 mb-2">{t("home", "title", locale)}</h1>
            <p className="text-muted-foreground">{t("nav", "subtitle", locale)}</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t("auth", "checkEmail", locale)}</CardTitle>
              <CardDescription>{t("auth", "confirmAccount", locale)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t("auth", "checkEmailDesc", locale)}
              </p>
              <Button asChild className="w-full">
                <Link href="/auth/login">{t("auth", "goToLogin", locale)}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
