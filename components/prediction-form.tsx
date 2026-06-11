"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { CountryFlag } from "@/components/country-flag"
import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"

interface Match {
  id: string
  match_number: number
  team_a: string
  team_b: string
  match_date: string
  is_finished: boolean
  actual_score_a: number | null
  actual_score_b: number | null
}

interface Prediction {
  predicted_score_a: number
  predicted_score_b: number
  points: number
}

interface PredictionFormProps {
  match: Match
  existingPrediction?: Prediction
}

export function PredictionForm({ match, existingPrediction }: PredictionFormProps) {
  const [scoreA, setScoreA] = useState(existingPrediction?.predicted_score_a?.toString() || "")
  const [scoreB, setScoreB] = useState(existingPrediction?.predicted_score_b?.toString() || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()
  const { locale } = useLanguage()

  const matchDate = new Date(match.match_date)
  const isPastDeadline = matchDate < new Date()
  const isFinished = match.is_finished

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Resolve the authenticated user server-side — never trust client-provided userId
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("Not authenticated")

      const predictionData = {
        user_id: user.id,
        match_id: match.id,
        predicted_score_a: Number.parseInt(scoreA),
        predicted_score_b: Number.parseInt(scoreB),
      }

      const { error } = await supabase.from("predictions").upsert(predictionData, {
        onConflict: "user_id,match_id",
      })

      if (error) throw error

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save prediction")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Match {match.match_number}: <CountryFlag countryName={match.team_a} /> {match.team_a} vs {match.team_b}{" "}
          <CountryFlag countryName={match.team_b} />
        </CardTitle>
        <p className="text-sm text-muted-foreground">{matchDate.toLocaleString()}</p>
      </CardHeader>
      <CardContent>
        {isFinished ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="text-center flex-1">
                <p className="font-semibold flex items-center justify-center gap-2">
                  <CountryFlag countryName={match.team_a} /> {match.team_a}
                </p>
                <p className="text-3xl font-bold text-green-700">{match.actual_score_a}</p>
              </div>
              <div className="text-2xl font-bold text-muted-foreground">-</div>
              <div className="text-center flex-1">
                <p className="font-semibold flex items-center justify-center gap-2">
                  {match.team_b} <CountryFlag countryName={match.team_b} />
                </p>
                <p className="text-3xl font-bold text-green-700">{match.actual_score_b}</p>
              </div>
            </div>
            {existingPrediction && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium mb-2">{t("dashboard", "yourPrediction", locale)}</p>
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="text-2xl font-bold">{existingPrediction.predicted_score_a}</p>
                  </div>
                  <div className="text-xl font-bold text-muted-foreground">-</div>
                  <div className="text-center flex-1">
                    <p className="text-2xl font-bold">{existingPrediction.predicted_score_b}</p>
                  </div>
                </div>
                <p className="text-center mt-2 text-sm font-semibold text-green-700">
                  {t("dashboard", "pointsEarned", locale)} {existingPrediction.points}
                </p>
              </div>
            )}
          </div>
        ) : isPastDeadline ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t("dashboard", "matchStarted", locale)}</p>
            {existingPrediction && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">{t("dashboard", "yourPrediction", locale)}</p>
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="font-semibold flex items-center justify-center gap-2">
                      <CountryFlag countryName={match.team_a} /> {match.team_a}
                    </p>
                    <p className="text-2xl font-bold">{existingPrediction.predicted_score_a}</p>
                  </div>
                  <div className="text-xl font-bold text-muted-foreground">-</div>
                  <div className="text-center flex-1">
                    <p className="font-semibold flex items-center justify-center gap-2">
                      {match.team_b} <CountryFlag countryName={match.team_b} />
                    </p>
                    <p className="text-2xl font-bold">{existingPrediction.predicted_score_b}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2 flex items-center gap-2">
                  <CountryFlag countryName={match.team_a} /> {match.team_a}
                </label>
                <Input
                  type="number"
                  min="0"
                  max="20"
                  value={scoreA}
                  onChange={(e) => setScoreA(e.target.value)}
                  required
                  placeholder="0"
                />
              </div>
              <div className="text-2xl font-bold text-muted-foreground pt-6">-</div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2 flex items-center justify-end gap-2">
                  {match.team_b} <CountryFlag countryName={match.team_b} />
                </label>
                <Input
                  type="number"
                  min="0"
                  max="20"
                  value={scoreB}
                  onChange={(e) => setScoreB(e.target.value)}
                  required
                  placeholder="0"
                />
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? t("dashboard", "saving", locale)
                : existingPrediction
                  ? t("dashboard", "updatePrediction", locale)
                  : t("dashboard", "submitPrediction", locale)}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
