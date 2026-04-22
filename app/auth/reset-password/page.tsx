"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)
  const [sessionError, setSessionError] = useState(false)
  const router = useRouter()
  const { locale } = useLanguage()

  useEffect(() => {
    // Supabase exchanges the tokens from the URL hash automatically on the client.
    // We listen to the PASSWORD_RECOVERY event to confirm the session is ready.
    const supabase = createClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setSessionReady(true)
      }
    })

    // Also check for an existing session in case the page is revisited
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionReady(true)
      } else {
        // Give the hash exchange a moment to complete
        const timer = setTimeout(() => {
          supabase.auth.getSession().then(({ data: { session: s } }) => {
            if (!s) setSessionError(true)
          })
        }, 2000)
        return () => clearTimeout(timer)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError(t("auth", "passwordMinLength", locale))
      return
    }

    if (password !== confirmPassword) {
      setError(t("auth", "passwordsNoMatch", locale))
      return
    }

    const supabase = createClient()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setUpdated(true)
      setTimeout(() => router.push("/auth/login"), 3000)
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
              <CardDescription>
                {updated
                  ? t("auth", "passwordUpdatedDesc", locale)
                  : t("auth", "newPassword", locale)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {updated ? (
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                  <div>
                    <p className="font-semibold text-base">{t("auth", "passwordUpdated", locale)}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t("auth", "passwordUpdatedDesc", locale)}
                    </p>
                  </div>
                  <Link
                    href="/auth/login"
                    className="text-sm underline underline-offset-4 text-green-700 hover:text-green-800"
                  >
                    {t("auth", "backToLogin", locale)}
                  </Link>
                </div>
              ) : sessionError ? (
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                  <AlertCircle className="h-12 w-12 text-destructive" />
                  <p className="text-sm text-muted-foreground">{t("auth", "resetLinkExpired", locale)}</p>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm underline underline-offset-4 text-green-700 hover:text-green-800"
                  >
                    {t("auth", "sendResetLink", locale)}
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="password">{t("auth", "newPassword", locale)}</Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={!sessionReady}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">{t("auth", "confirmNewPassword", locale)}</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        required
                        minLength={8}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={!sessionReady}
                      />
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading || !sessionReady}>
                      {isLoading
                        ? t("auth", "updatingPassword", locale)
                        : t("auth", "updatePassword", locale)}
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
