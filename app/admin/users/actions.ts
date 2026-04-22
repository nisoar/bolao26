"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateUserProfile(userId: string, displayName: string, isAdmin: boolean) {
  const supabase = await createClient()

  // Check if current user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Not authenticated" }
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    return { error: "Not authorized" }
  }

  // Prevent removing own admin access
  if (userId === user.id && !isAdmin) {
    return { error: "Cannot remove your own admin access" }
  }

  // Update user profile
  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName,
      is_admin: isAdmin,
    })
    .eq("id", userId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/users")
  return { success: true }
}

export async function toggleUserAdmin(userId: string, isAdmin: boolean) {
  const supabase = await createClient()

  // Check if current user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Not authenticated" }
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    return { error: "Not authorized" }
  }

  // Prevent removing own admin access
  if (userId === user.id && !isAdmin) {
    return { error: "Cannot remove your own admin access" }
  }

  // Update user admin status
  const { error } = await supabase.from("profiles").update({ is_admin: isAdmin }).eq("id", userId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/users")
  return { success: true }
}

export async function deleteUser(userId: string) {
  const supabase = await createClient()

  // Check if current user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "Not authenticated" }
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    return { error: "Not authorized" }
  }

  // Prevent deleting own account
  if (userId === user.id) {
    return { error: "Cannot delete your own account" }
  }

  // Delete user profile (cascade will handle auth.users deletion)
  const { error } = await supabase.from("profiles").delete().eq("id", userId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/users")
  return { success: true }
}
