"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil } from "lucide-react"
import { createMatch, updateMatch } from "@/app/admin/actions"
import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"

interface Match {
  id: string
  match_number: number
  team_a: string
  team_b: string
  match_date: string
}

interface MatchFormDialogProps {
  match?: Match
  mode: "create" | "edit"
}

export function MatchFormDialog({ match, mode }: MatchFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { locale } = useLanguage()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const result = mode === "create" ? await createMatch(formData) : await updateMatch(match!.id, formData)

      if (result.success) {
        setOpen(false)
        if (mode === "create") {
          ;(e.target as HTMLFormElement).reset()
        }
      } else {
        setError(result.error || "An error occurred")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().slice(0, 16)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t("admin", "addNewMatch", locale)}
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Pencil className="h-4 w-4" />
            {t("admin", "edit", locale)}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{mode === "create" ? t("admin", "addNewMatch", locale) : t("admin", "editMatch", locale)}</DialogTitle>
            <DialogDescription>
              {mode === "create" ? t("admin", "addMatchesDesc", locale) : t("admin", "editMatchDesc", locale)}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="matchNumber">{t("admin", "matchNumber", locale)}</Label>
              <Input
                id="matchNumber"
                name="matchNumber"
                type="number"
                min="1"
                defaultValue={match?.match_number}
                required
                placeholder="1"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="teamA">Team A</Label>
              <Input id="teamA" name="teamA" type="text" defaultValue={match?.team_a} required placeholder="Brazil" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="teamB">Team B</Label>
              <Input
                id="teamB"
                name="teamB"
                type="text"
                defaultValue={match?.team_b}
                required
                placeholder="Argentina"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="matchDate">{t("admin", "matchDateTime", locale)}</Label>
              <Input
                id="matchDate"
                name="matchDate"
                type="datetime-local"
                defaultValue={match ? formatDateForInput(match.match_date) : ""}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading} className="bg-transparent">
              {t("admin", "cancel", locale)}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? t("admin", "saving", locale) : mode === "create" ? t("admin", "createMatch", locale) : t("admin", "updateMatch", locale)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
