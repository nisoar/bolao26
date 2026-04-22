import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Trash2 } from "lucide-react"
import { UserEditDialog } from "@/components/user-edit-dialog"
import { deleteUser } from "./actions"
import { AdminAccessDenied } from "@/components/admin-content"
import { AdminUsersTitle, AdminUsersEmpty } from "@/components/admin-users-content"

async function DeleteUserButton({ userId, isCurrentUser }: { userId: string; isCurrentUser: boolean }) {
  async function handleDelete() {
    "use server"
    await deleteUser(userId)
  }

  return (
    <form action={handleDelete}>
      <Button
        type="submit"
        variant="destructive"
        size="sm"
        disabled={isCurrentUser}
        title={isCurrentUser ? "Cannot delete your own account" : "Delete user"}
      >
        <Trash2 className="h-4 w-4 mr-1" />
        Delete
      </Button>
    </form>
  )
}

export default async function AdminUsersPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin via database — single source of truth
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

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

  const { data: users, error } = await supabase.rpc("get_all_users_with_emails")

  // If the function doesn't exist yet, fall back to profiles only
  let usersData = users
  if (error || !users) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, display_name, is_admin, created_at")
      .order("created_at", { ascending: false })

    usersData = profiles?.map((p) => ({
      ...p,
      email: "Email not available",
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AdminUsersTitle />

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>View and manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Display Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersData?.map((userProfile) => (
                  <TableRow key={userProfile.id}>
                    <TableCell className="font-medium">{userProfile.display_name}</TableCell>
                    <TableCell>{userProfile.email}</TableCell>
                    <TableCell>
                      {userProfile.is_admin ? (
                        <Badge className="bg-green-700">
                          <Shield className="h-3 w-3 mr-1" />
                          Admin
                        </Badge>
                      ) : (
                        <Badge variant="secondary">User</Badge>
                      )}
                    </TableCell>
                    <TableCell>{new Date(userProfile.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <UserEditDialog
                          userId={userProfile.id}
                          currentDisplayName={userProfile.display_name}
                          currentEmail={userProfile.email}
                          currentIsAdmin={userProfile.is_admin || false}
                          isCurrentUser={userProfile.id === user.id}
                        />
                        <DeleteUserButton userId={userProfile.id} isCurrentUser={userProfile.id === user.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {!usersData || usersData.length === 0 ? <AdminUsersEmpty /> : null}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
