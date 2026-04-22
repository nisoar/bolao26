"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"
import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"
import { LanguageSwitcher } from "@/components/language-switcher"

export function PublicHeader() {
  const { locale } = useLanguage()

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-green-700" />
            <div>
              <h1 className="text-xl font-bold text-green-700">{t("home", "title", locale)}</h1>
              <p className="text-xs text-muted-foreground">{t("nav", "subtitle", locale)}</p>
            </div>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/leaderboard">
              <Button variant="ghost">{t("nav", "leaderboard", locale)}</Button>
            </Link>
            <Link href="/calendar">
              <Button variant="ghost">{t("nav", "calendar", locale)}</Button>
            </Link>
            <Link href="/scoring-rules">
              <Button variant="ghost">{t("nav", "rules", locale)}</Button>
            </Link>
            <LanguageSwitcher />
            <Link href="/auth/login">
              <Button variant="outline" className="bg-transparent">{t("nav", "login", locale)}</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>{t("nav", "signUp", locale)}</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
