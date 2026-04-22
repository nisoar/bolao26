import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { AdminMatchCard } from "@/components/admin-match-card"
import { MatchFormDialog } from "@/components/match-form-dialog"
import { AdminTitle, AdminInstructions, AdminNoMatches, AdminAccessDenied } from "@/components/admin-content"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin via database — single source of truth
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  const isAdmin = profile?.is_admin === true

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <AdminAccessDenied />
        </main>
      </div>
    )
  }

  // Fetch all matches
  const { data: matches } = await supabase.from("matches").select("*").order("match_date", { ascending: true })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <AdminTitle />
          <MatchFormDialog mode="create" />
        </div>

        <AdminInstructions />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {matches?.map((match) => (
            <AdminMatchCard key={match.id} match={match} />
          ))}
        </div>

        {!matches || matches.length === 0 ? <AdminNoMatches /> : null}
      </main>
    </div>
  )
}
