import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { PredictionForm } from "@/components/prediction-form"
import { DashboardTitle, DashboardEmpty } from "@/components/dashboard-content"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch all matches
  const { data: matches } = await supabase.from("matches").select("*").order("match_date", { ascending: true })

  // Fetch user's predictions
  const { data: predictions } = await supabase.from("predictions").select("*").eq("user_id", user.id)

  // Create a map of predictions by match_id
  const predictionMap = new Map(predictions?.map((p) => [p.match_id, p]) || [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <DashboardTitle />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {matches?.map((match) => (
            <PredictionForm
              key={match.id}
              match={match}
              existingPrediction={predictionMap.get(match.id)}
            />
          ))}
        </div>

        {!matches || matches.length === 0 ? <DashboardEmpty /> : null}
      </main>
    </div>
  )
}
