"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { locale } = useLanguage()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })
      if (error) {
        // Never expose raw Supabase error messages to prevent user enumeration
        setError(t("auth", "invalidCredentials", locale))
        return
      }
      router.refresh()
      router.push("/dashboard")
    } catch {
      setError(t("auth", "genericAuthError", locale))
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
              <CardTitle className="text-2xl">{t("auth", "loginTitle", locale)}</CardTitle>
              <CardDescription>{t("auth", "loginDesc", locale)}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
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
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">{t("auth", "password", locale)}</Label>
                      <Link
                        href="/auth/forgot-password"
                        className="text-xs underline underline-offset-4 text-green-700 hover:text-green-800"
                      >
                        {t("auth", "forgotPassword", locale)}
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t("auth", "loggingIn", locale) : t("auth", "loginTitle", locale)}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  {t("auth", "noAccount", locale)}{" "}
                  <Link
                    href="/auth/sign-up"
                    className="underline underline-offset-4 text-green-700 hover:text-green-800"
                  >
                    {t("nav", "signUp", locale)}
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
