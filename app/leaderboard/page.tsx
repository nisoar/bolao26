import { createClient } from "@/lib/supabase/server"
import { PublicHeader } from "@/components/public-header"
import { Header } from "@/components/header"
import { LeaderboardContent } from "@/components/leaderboard-content"

export default async function LeaderboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch leaderboard data
  const { data: leaderboard } = await supabase.from("leaderboard").select("*")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {user ? <Header /> : <PublicHeader />}
      <main className="container mx-auto px-4 py-8">
        <LeaderboardContent leaderboard={leaderboard} isLoggedIn={!!user} />
      </main>
    </div>
  )
}
