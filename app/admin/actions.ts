"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { brtInputToUTC } from "@/lib/utils/format-date"

async function checkAdminAccess() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Unauthorized: not authenticated")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  if (!profile?.is_admin) {
    throw new Error("Unauthorized: admin access required")
  }

  return { supabase, user }
}

export async function createMatch(formData: FormData) {
  try {
    const { supabase } = await checkAdminAccess()

    const matchNumber = Number.parseInt(formData.get("matchNumber") as string)
    const teamA = formData.get("teamA") as string
    const teamB = formData.get("teamB") as string
    // The input value is in BRT — convert to UTC before storing
    const matchDate = brtInputToUTC(formData.get("matchDate") as string)

    const { error } = await supabase.from("matches").insert({
      match_number: matchNumber,
      team_a: teamA,
      team_b: teamB,
      match_date: matchDate,
      is_finished: false,
    })

    if (error) throw error

    revalidatePath("/admin")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to create match" }
  }
}

export async function updateMatch(matchId: string, formData: FormData) {
  try {
    const { supabase } = await checkAdminAccess()

    const matchNumber = Number.parseInt(formData.get("matchNumber") as string)
    const teamA = formData.get("teamA") as string
    const teamB = formData.get("teamB") as string
    // The input value is in BRT — convert to UTC before storing
    const matchDate = brtInputToUTC(formData.get("matchDate") as string)

    const { error } = await supabase
      .from("matches")
      .update({
        match_number: matchNumber,
        team_a: teamA,
        team_b: teamB,
        match_date: matchDate,
      })
      .eq("id", matchId)

    if (error) throw error

    revalidatePath("/admin")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to update match" }
  }
}

export async function deleteMatch(matchId: string) {
  try {
    const { supabase } = await checkAdminAccess()

    // Delete the match (predictions will be cascade deleted)
    const { error } = await supabase.from("matches").delete().eq("id", matchId)

    if (error) throw error

    revalidatePath("/admin")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete match" }
  }
}
