"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Award } from "lucide-react"
import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"
import { LanguageSwitcher } from "@/components/language-switcher"

export function HomeContent() {
  const { locale } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Trophy className="h-20 w-20 text-green-700" />
          </div>
          <h1 className="text-5xl font-bold text-green-700 mb-4">{t("home", "title", locale)}</h1>
          <h2 className="text-3xl font-semibold text-foreground mb-4">{t("home", "subtitle", locale)}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("home", "description", locale)}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <Target className="h-10 w-10 text-green-700 mb-2" />
              <CardTitle>{t("home", "predictScores", locale)}</CardTitle>
              <CardDescription>{t("home", "predictScoresDesc", locale)}</CardDescription>
            </CardHeader>
          </Card>
          <Link href="/scoring-rules" className="transition-transform hover:scale-105">
            <Card className="cursor-pointer h-full">
              <CardHeader>
                <Award className="h-10 w-10 text-green-700 mb-2" />
                <CardTitle>{t("home", "earnPoints", locale)}</CardTitle>
                <CardDescription>{t("home", "earnPointsDesc", locale)}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Card>
            <CardHeader>
              <Trophy className="h-10 w-10 text-green-700 mb-2" />
              <CardTitle>{t("home", "compete", locale)}</CardTitle>
              <CardDescription>{t("home", "competeDesc", locale)}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/auth/sign-up">{t("home", "getStarted", locale)}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent">
            <Link href="/auth/login">{t("nav", "login", locale)}</Link>
          </Button>
        </div>

        <div className="mt-12 text-center">
          <Link href="/leaderboard" className="text-green-700 hover:underline">
            {t("home", "viewLeaderboard", locale)}
          </Link>
          <span className="mx-2 text-muted-foreground">•</span>
          <Link href="/scoring-rules" className="text-green-700 hover:underline">
            {t("home", "scoringRules", locale)}
          </Link>
        </div>
      </div>
    </div>
  )
}
