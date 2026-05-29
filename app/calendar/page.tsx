import { createClient } from "@/lib/supabase/server"
import { CountryFlag } from "@/components/country-flag"
import { Header } from "@/components/header"
import { cookies } from "next/headers"
import { t, type Locale } from "@/lib/i18n/translations"
import { Trophy, ChevronLeft, ChevronRight } from "lucide-react"

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

  // Group matches by date (using ISO date as key for sorting)
  const matchesByDate = new Map<string, { dateObj: Date; matches: Match[] }>()

  if (matches) {
    for (const match of matches) {
      const dateObj = new Date(match.match_date)
      const dateKey = dateObj.toISOString().split("T")[0]

      if (!matchesByDate.has(dateKey)) {
        matchesByDate.set(dateKey, { dateObj, matches: [] })
      }
      matchesByDate.get(dateKey)?.matches.push(match as Match)
    }
  }

  // Get all unique months from matches
  const months = new Map<string, { month: number; year: number; dates: string[] }>()
  
  for (const [dateKey, { dateObj }] of matchesByDate) {
    const monthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}`
    if (!months.has(monthKey)) {
      months.set(monthKey, { 
        month: dateObj.getMonth(), 
        year: dateObj.getFullYear(),
        dates: []
      })
    }
    months.get(monthKey)?.dates.push(dateKey)
  }

  const formatTeamName = (name: string) => {
    const short = name.replace(/_/g, " ")
    // Abbreviate long names
    if (short.length > 10) {
      const abbrevMap: Record<string, string> = {
        "United States": "EUA",
        "Saudi Arabia": "SAU",
        "South Korea": "COR",
        "Costa Rica": "CRC",
        "New Zealand": "NZL",
      }
      return abbrevMap[short] || short.slice(0, 3).toUpperCase()
    }
    return short
  }

  const weekDays = locale === "pt" 
    ? ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    : locale === "es"
    ? ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const monthNames = locale === "pt"
    ? ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    : locale === "es"
    ? ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      {/* Title */}
      <div className="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-2xl font-bold text-white md:text-3xl">
            {t("calendar", "title", locale)}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {t("calendar", "subtitle", locale)}
          </p>
        </div>
      </div>

      {/* Calendar Grid */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {Array.from(months.entries()).map(([monthKey, { month, year, dates }]) => {
          // Calculate calendar grid
          const firstDay = new Date(year, month, 1)
          const lastDay = new Date(year, month + 1, 0)
          const startPadding = firstDay.getDay()
          const totalDays = lastDay.getDate()

          // Create calendar cells
          const cells: (number | null)[] = []
          for (let i = 0; i < startPadding; i++) cells.push(null)
          for (let i = 1; i <= totalDays; i++) cells.push(i)
          while (cells.length % 7 !== 0) cells.push(null)

          return (
            <div key={monthKey} className="mb-8">
              {/* Month Header */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  {monthNames[month]} {year}
                </h2>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span>{dates.length} dias com jogos</span>
                </div>
              </div>

              {/* Calendar */}
              <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur">
                {/* Week Days Header */}
                <div className="grid grid-cols-7 border-b border-slate-700/50 bg-slate-800/50">
                  {weekDays.map((day) => (
                    <div key={day} className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7">
                  {cells.map((day, index) => {
                    if (day === null) {
                      return <div key={index} className="min-h-[100px] border-b border-r border-slate-700/30 bg-slate-900/30 md:min-h-[120px]" />
                    }

                    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                    const dayData = matchesByDate.get(dateKey)
                    const hasMatches = dayData && dayData.matches.length > 0
                    const isToday = new Date().toISOString().split("T")[0] === dateKey

                    return (
                      <div
                        key={index}
                        className={`min-h-[100px] border-b border-r border-slate-700/30 p-1 transition-colors md:min-h-[120px] md:p-2 ${
                          hasMatches
                            ? "bg-emerald-900/20 hover:bg-emerald-900/30"
                            : "bg-slate-800/20 hover:bg-slate-800/40"
                        } ${isToday ? "ring-2 ring-inset ring-yellow-500/50" : ""}`}
                      >
                        {/* Day Number */}
                        <div className={`mb-1 text-right text-xs font-medium md:text-sm ${
                          hasMatches ? "text-emerald-400" : "text-slate-500"
                        } ${isToday ? "text-yellow-400" : ""}`}>
                          {day}
                        </div>

                        {/* Matches */}
                        {hasMatches && (
                          <div className="space-y-1">
                            {dayData.matches.map((match) => {
                              const matchTime = new Date(match.match_date).toLocaleTimeString(locale, {
                                hour: "2-digit",
                                minute: "2-digit",
                              })

                              return (
                                <div
                                  key={match.id}
                                  className={`group relative overflow-hidden rounded-lg p-1.5 text-xs transition-all hover:scale-[1.02] md:p-2 ${
                                    match.is_finished
                                      ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 ring-1 ring-yellow-500/30"
                                      : "bg-slate-700/50 ring-1 ring-slate-600/30 hover:ring-emerald-500/50"
                                  }`}
                                >
                                  {/* Time */}
                                  <div className="mb-1 text-[10px] font-medium text-slate-400 md:text-xs">
                                    {matchTime}
                                  </div>

                                  {/* Teams */}
                                  <div className="flex items-center justify-between gap-1">
                                    <div className="flex items-center gap-1 min-w-0 flex-1">
                                      <CountryFlag countryName={match.team_a} size="sm" />
                                      <span className="truncate text-[10px] font-medium text-white md:text-xs">
                                        {formatTeamName(match.team_a)}
                                      </span>
                                    </div>

                                    {match.is_finished ? (
                                      <div className="flex items-center gap-0.5 rounded bg-slate-900/50 px-1.5 py-0.5">
                                        <span className="text-[10px] font-bold text-white md:text-xs">{match.actual_score_a}</span>
                                        <span className="text-[10px] text-slate-500">:</span>
                                        <span className="text-[10px] font-bold text-white md:text-xs">{match.actual_score_b}</span>
                                      </div>
                                    ) : (
                                      <span className="text-[10px] text-slate-500 md:text-xs">vs</span>
                                    )}

                                    <div className="flex items-center gap-1 min-w-0 flex-1 justify-end">
                                      <span className="truncate text-[10px] font-medium text-white md:text-xs">
                                        {formatTeamName(match.team_b)}
                                      </span>
                                      <CountryFlag countryName={match.team_b} size="sm" />
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}

        {matchesByDate.size === 0 && (
          <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-12 text-center">
            <p className="text-slate-400">{t("calendar", "noMatches", locale)}</p>
          </div>
        )}
      </main>

      {/* Legend */}
      <div className="border-t border-slate-700/50 bg-slate-800/30">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-emerald-900/50 ring-1 ring-emerald-500/30" />
              <span>Dia com jogos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-gradient-to-r from-yellow-500/30 to-amber-500/30 ring-1 ring-yellow-500/30" />
              <span>Jogo finalizado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-slate-700/50 ring-2 ring-yellow-500/50" />
              <span>Hoje</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
