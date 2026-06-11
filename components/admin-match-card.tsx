"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { MatchFormDialog } from "./match-form-dialog"
import { deleteMatch } from "@/app/admin/actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"
import { formatMatchDateTime } from "@/lib/utils/format-date"

interface Match {
  id: string
  match_number: number
  team_a: string
  team_b: string
  match_date: string
  actual_score_a: number | null
  actual_score_b: number | null
  is_finished: boolean
}

interface AdminMatchCardProps {
  match: Match
}

export function AdminMatchCard({ match }: AdminMatchCardProps) {
  const [scoreA, setScoreA] = useState(match.actual_score_a?.toString() || "")
  const [scoreB, setScoreB] = useState(match.actual_score_b?.toString() || "")
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const { locale } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error: rpcError } = await supabase.rpc("update_match_score", {
        p_match_id: match.id,
        p_score_a: Number.parseInt(scoreA),
        p_score_b: Number.parseInt(scoreB),
      })

      if (rpcError) throw rpcError

      setSuccess(true)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update match score")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      const result = await deleteMatch(match.id)
      if (!result.success) {
        setError(result.error || "Failed to delete match")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete match")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Match {match.match_number}: {match.team_a} vs {match.team_b}
          </CardTitle>
          {match.is_finished ? (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {t("admin", "finished", locale)}
            </Badge>
          ) : (
            <Badge variant="outline">{t("admin", "pending", locale)}</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{formatMatchDateTime(match.match_date, locale)}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor={`score-a-${match.id}`} className="text-sm font-medium">
                {match.team_a}
              </Label>
              <Input
                id={`score-a-${match.id}`}
                type="number"
                min="0"
                max="20"
                value={scoreA}
                onChange={(e) => setScoreA(e.target.value)}
                required
                placeholder="0"
                className="mt-2"
              />
            </div>
            <div className="text-2xl font-bold text-muted-foreground pt-6">-</div>
            <div className="flex-1">
              <Label htmlFor={`score-b-${match.id}`} className="text-sm font-medium">
                {match.team_b}
              </Label>
              <Input
                id={`score-b-${match.id}`}
                type="number"
                min="0"
                max="20"
                value={scoreB}
                onChange={(e) => setScoreB(e.target.value)}
                required
                placeholder="0"
                className="mt-2"
              />
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && <p className="text-sm text-green-700">{t("admin", "scoreSuccess", locale)}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t("admin", "updating", locale) : match.is_finished ? t("admin", "updateScore", locale) : t("admin", "setFinalScore", locale)}
          </Button>
        </form>

        <div className="flex gap-2 mt-4">
          <MatchFormDialog match={match} mode="edit" />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="gap-2 flex-1" disabled={isDeleting}>
                <Trash2 className="h-4 w-4" />
                {t("admin", "delete", locale)}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("admin", "deleteConfirm", locale)}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("admin", "deleteConfirmDesc", locale)}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("admin", "cancel", locale)}</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                  {isDeleting ? t("admin", "deleting", locale) : t("admin", "deleteMatch", locale)}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
}
