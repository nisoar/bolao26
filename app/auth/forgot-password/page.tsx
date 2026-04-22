"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { locale } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })
      if (error) throw error
      setSubmitted(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

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
              <CardTitle className="text-2xl">{t("auth", "forgotPasswordTitle", locale)}</CardTitle>
              <CardDescription>{t("auth", "forgotPasswordDesc", locale)}</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                  <div>
                    <p className="font-semibold text-base">{t("auth", "resetLinkSent", locale)}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t("auth", "resetLinkSentDesc", locale)}</p>
                  </div>
                  <Link
                    href="/auth/login"
                    className="text-sm underline underline-offset-4 text-green-700 hover:text-green-800"
                  >
                    {t("auth", "backToLogin", locale)}
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">{t("auth", "email", locale)}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? t("auth", "sendingResetLink", locale) : t("auth", "sendResetLink", locale)}
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    <Link
                      href="/auth/login"
                      className="underline underline-offset-4 text-green-700 hover:text-green-800"
                    >
                      {t("auth", "backToLogin", locale)}
                    </Link>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
