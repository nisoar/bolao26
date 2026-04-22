"use client"

import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Target, Trophy, Clock } from "lucide-react"

export function ScoringContent({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { locale } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-2">{t("scoring", "title", locale)}</h2>
        <p className="text-muted-foreground">{t("scoring", "subtitle", locale)}</p>
      </div>

      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-green-700" />
              <CardTitle>{t("scoring", "pointSystem", locale)}</CardTitle>
            </div>
            <CardDescription>{t("scoring", "pointSystemDesc", locale)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex-shrink-0 w-14 h-14 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                25
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{t("scoring", "exactScore", locale)}</h3>
                <p className="text-muted-foreground">{t("scoring", "exactScoreDesc", locale)}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex-shrink-0 w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                18
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{t("scoring", "winnerAndWinnerGoals", locale)}</h3>
                <p className="text-muted-foreground">{t("scoring", "winnerAndWinnerGoalsDesc", locale)}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                15
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{t("scoring", "winnerAndGoalDiff", locale)}</h3>
                <p className="text-muted-foreground">{t("scoring", "winnerAndGoalDiffDesc", locale)}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
              <div className="flex-shrink-0 w-14 h-14 bg-cyan-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                15
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{t("scoring", "correctDraw", locale)}</h3>
                <p className="text-muted-foreground">{t("scoring", "correctDrawDesc", locale)}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="flex-shrink-0 w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                12
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{t("scoring", "winnerAndLoserGoals", locale)}</h3>
                <p className="text-muted-foreground">{t("scoring", "winnerAndLoserGoalsDesc", locale)}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex-shrink-0 w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                10
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{t("scoring", "onlyWinner", locale)}</h3>
                <p className="text-muted-foreground">{t("scoring", "onlyWinnerDesc", locale)}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex-shrink-0 w-14 h-14 bg-gray-400 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                0
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{t("scoring", "incorrect", locale)}</h3>
                <p className="text-muted-foreground">{t("scoring", "incorrectDesc", locale)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-green-700" />
              <CardTitle>{t("scoring", "deadlines", locale)}</CardTitle>
            </div>
            <CardDescription>{t("scoring", "deadlinesDesc", locale)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-700 mt-0.5" />
              <div>
                <p className="font-medium">{t("scoring", "beforeMatch", locale)}</p>
                <p className="text-sm text-muted-foreground">{t("scoring", "beforeMatchDesc", locale)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-700 mt-0.5" />
              <div>
                <p className="font-medium">{t("scoring", "afterMatchStarts", locale)}</p>
                <p className="text-sm text-muted-foreground">{t("scoring", "afterMatchStartsDesc", locale)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-700 mt-0.5" />
              <div>
                <p className="font-medium">{t("scoring", "afterMatchEnds", locale)}</p>
                <p className="text-sm text-muted-foreground">{t("scoring", "afterMatchEndsDesc", locale)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-green-700" />
              <CardTitle>{t("scoring", "examples", locale)}</CardTitle>
            </div>
            <CardDescription>{t("scoring", "examplesDesc", locale)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <span className="font-semibold">{t("scoring", "matchResult", locale)}</span> Brazil 3 - 1 Argentina
                </p>
                <p className="text-sm">
                  <span className="font-semibold">{t("scoring", "yourPrediction", locale)}</span> Brazil 3 - 1 Argentina
                </p>
                <p className="text-sm text-green-700 font-semibold">Points: 25 ({t("scoring", "exactScore", locale)})</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <span className="font-semibold">{t("scoring", "matchResult", locale)}</span> Spain 2 - 1 Germany
                </p>
                <p className="text-sm">
                  <span className="font-semibold">{t("scoring", "yourPrediction", locale)}</span> Spain 2 - 0 Germany
                </p>
                <p className="text-sm text-emerald-600 font-semibold">Points: 18 ({t("scoring", "winnerAndWinnerGoals", locale)})</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <span className="font-semibold">{t("scoring", "matchResult", locale)}</span> France 3 - 1 England
                </p>
                <p className="text-sm">
                  <span className="font-semibold">{t("scoring", "yourPrediction", locale)}</span> France 2 - 0 England
                </p>
                <p className="text-sm text-blue-600 font-semibold">Points: 15 ({t("scoring", "winnerAndGoalDiff", locale)})</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <span className="font-semibold">{t("scoring", "matchResult", locale)}</span> Italy 1 - 1 Portugal
                </p>
                <p className="text-sm">
                  <span className="font-semibold">{t("scoring", "yourPrediction", locale)}</span> Italy 2 - 2 Portugal
                </p>
                <p className="text-sm text-cyan-600 font-semibold">Points: 15 ({t("scoring", "correctDraw", locale)})</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <span className="font-semibold">{t("scoring", "matchResult", locale)}</span> Netherlands 3 - 1 Belgium
                </p>
                <p className="text-sm">
                  <span className="font-semibold">{t("scoring", "yourPrediction", locale)}</span> Netherlands 2 - 1 Belgium
                </p>
                <p className="text-sm text-indigo-600 font-semibold">Points: 12 ({t("scoring", "winnerAndLoserGoals", locale)})</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <span className="font-semibold">{t("scoring", "matchResult", locale)}</span> Mexico 4 - 2 USA
                </p>
                <p className="text-sm">
                  <span className="font-semibold">{t("scoring", "yourPrediction", locale)}</span> Mexico 1 - 0 USA
                </p>
                <p className="text-sm text-purple-600 font-semibold">Points: 10 ({t("scoring", "onlyWinner", locale)})</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <span className="font-semibold">{t("scoring", "matchResult", locale)}</span> Japan 2 - 0 South Korea
                </p>
                <p className="text-sm">
                  <span className="font-semibold">{t("scoring", "yourPrediction", locale)}</span> South Korea 1 - 0 Japan
                </p>
                <p className="text-sm text-gray-600 font-semibold">Points: 0 ({t("scoring", "incorrect", locale)})</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {!isLoggedIn && (
        <div className="text-center">
          <p className="text-muted-foreground mb-4">{t("scoring", "readyToPredict", locale)}</p>
          <a
            href="/auth/sign-up"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            {t("scoring", "joinNow", locale)}
          </a>
        </div>
      )}
    </div>
  )
}
