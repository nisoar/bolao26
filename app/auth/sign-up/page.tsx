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

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { locale } = useLanguage()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    // Client-side validation
    const trimmedName = displayName.trim()
    if (trimmedName.length < 2) {
      setError(t("auth", "displayNameTooShort", locale))
      setIsLoading(false)
      return
    }
    if (trimmedName.length > 50) {
      setError(t("auth", "displayNameTooLong", locale))
      setIsLoading(false)
      return
    }
    if (password.length < 8) {
      setError(t("auth", "passwordMinLength", locale))
      setIsLoading(false)
      return
    }
    if (password !== repeatPassword) {
      setError(t("auth", "passwordsNoMatch", locale))
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            display_name: trimmedName,
          },
        },
      })
      if (error) {
        // Map known Supabase errors to safe messages; never leak internal details
        if (error.message.toLowerCase().includes("already registered") || error.message.toLowerCase().includes("already in use")) {
          setError(t("auth", "emailAlreadyInUse", locale))
        } else {
          setError(t("auth", "genericAuthError", locale))
        }
        return
      }
      router.push("/auth/sign-up-success")
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
              <CardTitle className="text-2xl">{t("auth", "signUpTitle", locale)}</CardTitle>
              <CardDescription>{t("auth", "signUpDesc", locale)}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="display-name">{t("auth", "displayName", locale)}</Label>
                    <Input
                      id="display-name"
                      type="text"
                      placeholder={t("auth", "yourName", locale)}
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
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
                    <Label htmlFor="password">{t("auth", "password", locale)}</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="repeat-password">{t("auth", "repeatPassword", locale)}</Label>
                    <Input
                      id="repeat-password"
                      type="password"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t("auth", "creatingAccount", locale) : t("nav", "signUp", locale)}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  {t("auth", "alreadyHaveAccount", locale)}{" "}
                  <Link href="/auth/login" className="underline underline-offset-4 text-green-700 hover:text-green-800">
                    {t("nav", "login", locale)}
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
