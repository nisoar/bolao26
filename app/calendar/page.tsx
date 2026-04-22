import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CountryFlag } from "@/components/country-flag"
import { Header } from "@/components/header"
import { cookies } from "next/headers"
import { t, type Locale } from "@/lib/i18n/translations"

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

export default async function CalendarPage() {
  const cookieStore = await cookies()
  const locale = (cookieStore.get("locale")?.value as Locale) || "en"

  const supabase = await createClient()

  // Fetch all matches ordered by date
  const { data: matches } = await supabase
    .from("matches")
    .select("*")
    .order("match_date", { ascending: true })

  // Group matches by date
  const matchesByDate = new Map<string, Match[]>()
  
  if (matches) {
    for (const match of matches) {
      const dateKey = new Date(match.match_date).toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      
      if (!matchesByDate.has(dateKey)) {
        matchesByDate.set(dateKey, [])
      }
      matchesByDate.get(dateKey)?.push(match as Match)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-balance text-4xl font-bold tracking-tight text-green-800 md:text-5xl">
            {t("calendar", "title", locale)}
          </h1>
          <p className="text-pretty text-lg text-gray-600 md:text-xl">
            {t("calendar", "subtitle", locale)}
          </p>
        </div>

        {/* Calendar Content */}
        {matchesByDate.size === 0 ? (
          <Card className="border-green-200 bg-white/80 backdrop-blur">
            <CardContent className="py-12 text-center">
              <p className="text-lg text-gray-600">{t("calendar", "noMatches", locale)}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {Array.from(matchesByDate.entries()).map(([date, dayMatches]) => (
              <div key={date}>
                {/* Date Header */}
                <div className="mb-4 rounded-lg bg-green-700 px-6 py-3">
                  <h2 className="text-xl font-bold text-white">{date}</h2>
                </div>

                {/* Matches for this date */}
                <div className="grid gap-4 md:grid-cols-2">
                  {dayMatches.map((match) => {
                    const matchTime = new Date(match.match_date).toLocaleTimeString(locale, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })

                    return (
                      <Card
                        key={match.id}
                        className="border-green-200 bg-white/80 backdrop-blur transition-all hover:shadow-lg"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">
                              {t("admin", "matchNumber", locale)} {match.match_number}
                            </span>
                            <span className="text-sm font-semibold text-green-700">
                              {matchTime}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {/* Teams */}
                          <div className="space-y-3">
                            {/* Team A */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <CountryFlag country={match.team_a} size="lg" />
                                <span className="font-semibold text-gray-800">
                                  {match.team_a.replace(/_/g, " ")}
                                </span>
                              </div>
                              {match.is_finished && match.actual_score_a !== null ? (
                                <span className="text-2xl font-bold text-green-700">
                                  {match.actual_score_a}
                                </span>
                              ) : (
                                <span className="text-xl font-bold text-gray-400">-</span>
                              )}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200" />

                            {/* Team B */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <CountryFlag country={match.team_b} size="lg" />
                                <span className="font-semibold text-gray-800">
                                  {match.team_b.replace(/_/g, " ")}
                                </span>
                              </div>
                              {match.is_finished && match.actual_score_b !== null ? (
                                <span className="text-2xl font-bold text-green-700">
                                  {match.actual_score_b}
                                </span>
                              ) : (
                                <span className="text-xl font-bold text-gray-400">-</span>
                              )}
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="mt-4 flex justify-center">
                            {match.is_finished ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                                <svg
                                  className="h-3 w-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {t("calendar", "finalScore", locale)}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                                <svg
                                  className="h-3 w-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {t("calendar", "scheduled", locale)}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
