"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil } from "lucide-react"
import { updateUserProfile } from "@/app/admin/users/actions"
import { useToast } from "@/hooks/use-toast"

interface UserEditDialogProps {
  userId: string
  currentDisplayName: string
  currentEmail: string
  currentIsAdmin: boolean
  isCurrentUser: boolean
}

export function UserEditDialog({
  userId,
  currentDisplayName,
  currentEmail,
  currentIsAdmin,
  isCurrentUser,
}: UserEditDialogProps) {
  const [open, setOpen] = useState(false)
  const [displayName, setDisplayName] = useState(currentDisplayName)
  const [isAdmin, setIsAdmin] = useState(currentIsAdmin)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prevent removing own admin access
    if (isCurrentUser && currentIsAdmin && !isAdmin) {
      toast({
        title: "Error",
        description: "Cannot remove your own admin access",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    const result = await updateUserProfile(userId, displayName, isAdmin)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "User profile updated successfully",
      })
      setOpen(false)
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user profile and permissions</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={currentEmail} disabled className="mt-2 bg-muted" />
              <p className="text-xs text-muted-foreground mt-1">Email cannot be changed from admin panel</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAdmin"
                checked={isAdmin}
                onCheckedChange={(checked) => setIsAdmin(checked as boolean)}
                disabled={isCurrentUser && currentIsAdmin}
              />
              <Label
                htmlFor="isAdmin"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Administrator privileges
              </Label>
            </div>
            {isCurrentUser && currentIsAdmin && (
              <p className="text-xs text-muted-foreground">You cannot remove your own admin access</p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
