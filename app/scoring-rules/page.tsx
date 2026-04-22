import { createClient } from "@/lib/supabase/server"
import { PublicHeader } from "@/components/public-header"
import { Header } from "@/components/header"
import { ScoringContent } from "@/components/scoring-content"

export default async function ScoringRulesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {user ? <Header /> : <PublicHeader />}
      <main className="container mx-auto px-4 py-8">
        <ScoringContent isLoggedIn={!!user} />
      </main>
    </div>
  )
}
