import { createClient } from "@/lib/supabase/server"
import { CountryFlag } from "@/components/country-flag"
import { Header } from "@/components/header"
import { cookies } from "next/headers"
import { t, type Locale } from "@/lib/i18n/translations"
import { Calendar, Clock, Trophy, ChevronRight } from "lucide-react"

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

  const formatTeamName = (name: string) => name.replace(/_/g, " ")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-900">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-emerald-700/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-amber-500/25">
              <Calendar className="h-7 w-7 text-emerald-900" />
            </div>
          </div>
          <h1 className="text-center text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {t("calendar", "title", locale)}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-emerald-200/80">
            {t("calendar", "subtitle", locale)}
          </p>
          {matches && (
            <div className="mt-6 flex justify-center gap-6">
              <div className="flex items-center gap-2 rounded-full bg-emerald-800/50 px-4 py-2 backdrop-blur">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-emerald-100">
                  {matches.filter((m) => m.is_finished).length} {t("calendar", "finalScore", locale)}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-800/50 px-4 py-2 backdrop-blur">
                <Clock className="h-4 w-4 text-emerald-300" />
                <span className="text-sm font-medium text-emerald-100">
                  {matches.filter((m) => !m.is_finished).length} {t("calendar", "scheduled", locale)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Calendar Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        {matchesByDate.size === 0 ? (
          <div className="rounded-2xl border border-emerald-700/50 bg-emerald-800/30 p-12 text-center backdrop-blur">
            <Calendar className="mx-auto h-16 w-16 text-emerald-600" />
            <p className="mt-4 text-lg text-emerald-300">{t("calendar", "noMatches", locale)}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Array.from(matchesByDate.entries()).map(([date, dayMatches]) => (
              <div key={date} className="group">
                {/* Date Header */}
                <div className="sticky top-0 z-10 mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-md">
                    <Calendar className="h-5 w-5 text-emerald-900" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold capitalize text-white md:text-xl">{date}</h2>
                    <p className="text-sm text-emerald-400">
                      {dayMatches.length} {dayMatches.length === 1 ? "partida" : "partidas"}
                    </p>
                  </div>
                </div>

                {/* Matches Timeline */}
                <div className="relative ml-5 border-l-2 border-emerald-700/50 pl-8 space-y-4">
                  {dayMatches.map((match, index) => {
                    const matchTime = new Date(match.match_date).toLocaleTimeString(locale, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    const isFinished = match.is_finished

                    return (
                      <div
                        key={match.id}
                        className="relative"
                      >
                        {/* Timeline Dot */}
                        <div className={`absolute -left-[41px] top-6 h-4 w-4 rounded-full border-2 ${
                          isFinished 
                            ? "border-yellow-400 bg-yellow-400" 
                            : "border-emerald-500 bg-emerald-900"
                        }`} />

                        {/* Match Card */}
                        <div className={`overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                          isFinished
                            ? "border-yellow-500/30 bg-gradient-to-br from-emerald-800/80 to-emerald-900/80 shadow-lg shadow-yellow-500/5"
                            : "border-emerald-700/50 bg-emerald-800/50 hover:border-emerald-600/50"
                        } backdrop-blur`}>
                          {/* Card Header */}
                          <div className="flex items-center justify-between border-b border-emerald-700/30 px-4 py-3 md:px-6">
                            <div className="flex items-center gap-2">
                              <span className="rounded-lg bg-emerald-700/50 px-2 py-1 text-xs font-semibold text-emerald-200">
                                #{match.match_number}
                              </span>
                              {isFinished && (
                                <span className="flex items-center gap-1 rounded-lg bg-yellow-500/20 px-2 py-1 text-xs font-semibold text-yellow-400">
                                  <Trophy className="h-3 w-3" />
                                  {t("calendar", "finalScore", locale)}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-emerald-300">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm font-medium">{matchTime}</span>
                            </div>
                          </div>

                          {/* Teams Section */}
                          <div className="p-4 md:p-6">
                            <div className="flex items-center justify-between gap-4">
                              {/* Team A */}
                              <div className="flex flex-1 flex-col items-center gap-3 text-center">
                                <div className="relative">
                                  <div className="overflow-hidden rounded-xl border-2 border-emerald-600/50 bg-emerald-700/30 p-2 shadow-inner">
                                    <CountryFlag countryName={match.team_a} size="xl" />
                                  </div>
                                </div>
                                <span className="text-sm font-semibold text-white md:text-base">
                                  {formatTeamName(match.team_a)}
                                </span>
                              </div>

                              {/* Score */}
                              <div className="flex flex-col items-center gap-1">
                                {isFinished ? (
                                  <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold text-white md:text-4xl">
                                      {match.actual_score_a}
                                    </span>
                                    <span className="text-xl text-emerald-500 md:text-2xl">:</span>
                                    <span className="text-3xl font-bold text-white md:text-4xl">
                                      {match.actual_score_b}
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-3">
                                    <span className="text-2xl font-bold text-emerald-600 md:text-3xl">-</span>
                                    <span className="text-lg text-emerald-700">vs</span>
                                    <span className="text-2xl font-bold text-emerald-600 md:text-3xl">-</span>
                                  </div>
                                )}
                              </div>

                              {/* Team B */}
                              <div className="flex flex-1 flex-col items-center gap-3 text-center">
                                <div className="relative">
                                  <div className="overflow-hidden rounded-xl border-2 border-emerald-600/50 bg-emerald-700/30 p-2 shadow-inner">
                                    <CountryFlag countryName={match.team_b} size="xl" />
                                  </div>
                                </div>
                                <span className="text-sm font-semibold text-white md:text-base">
                                  {formatTeamName(match.team_b)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-800/50 bg-emerald-950/50 py-6">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-sm text-emerald-500">
            FIFA World Cup 2026
          </p>
        </div>
      </footer>
    </div>
  )
}
