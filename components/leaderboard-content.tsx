"use client"

import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, Medal, Award } from "lucide-react"

interface LeaderboardEntry {
  display_name: string
  predictions_count: number
  total_points: number
}

export function LeaderboardContent({ leaderboard, isLoggedIn }: { leaderboard: LeaderboardEntry[] | null; isLoggedIn: boolean }) {
  const { locale } = useLanguage()

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />
    return null
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-2">{t("leaderboard", "title", locale)}</h2>
        <p className="text-muted-foreground">{t("leaderboard", "subtitle", locale)}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("leaderboard", "rankings", locale)}</CardTitle>
          <CardDescription>{t("leaderboard", "rankingsDesc", locale)}</CardDescription>
        </CardHeader>
        <CardContent>
          {leaderboard && leaderboard.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">{t("leaderboard", "rank", locale)}</TableHead>
                  <TableHead>{t("leaderboard", "player", locale)}</TableHead>
                  <TableHead className="text-center">{t("leaderboard", "predictions", locale)}</TableHead>
                  <TableHead className="text-right">{t("leaderboard", "points", locale)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((entry, index) => (
                  <TableRow key={index} className={index < 3 ? "bg-green-50/50" : ""}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getRankIcon(index + 1)}
                        <span>{index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{entry.display_name}</TableCell>
                    <TableCell className="text-center">{entry.predictions_count}</TableCell>
                    <TableCell className="text-right font-bold text-green-700">{entry.total_points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("leaderboard", "noPredictions", locale)}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {!isLoggedIn && (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">{t("leaderboard", "wantToCompete", locale)}</p>
          <div className="flex justify-center gap-4">
            <a
              href="/auth/sign-up"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              {t("leaderboard", "joinChallenge", locale)}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
