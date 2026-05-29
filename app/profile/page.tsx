"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"
import { User, Lock, CheckCircle, AlertCircle } from "lucide-react"

export default function ProfilePage() {
  const supabase = createClient()
  const { locale } = useLanguage()
  
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isLoadingPassword, setIsLoadingPassword] = useState(false)
  const [profileMessage, setProfileMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setEmail(user.email || "")
        const { data: profile } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("id", user.id)
          .single()
        if (profile) {
          setDisplayName(profile.display_name || "")
        }
      }
    }
    loadUser()
  }, [supabase])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoadingProfile(true)
    setProfileMessage(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const trimmedName = displayName.trim()
      if (trimmedName.length < 2) {
        setProfileMessage({ type: "error", text: t("auth", "displayNameTooShort", locale) })
        setIsLoadingProfile(false)
        return
      }
      if (trimmedName.length > 50) {
        setProfileMessage({ type: "error", text: t("auth", "displayNameTooLong", locale) })
        setIsLoadingProfile(false)
        return
      }

      const { error } = await supabase
        .from("profiles")
        .update({ display_name: trimmedName })
        .eq("id", user.id)

      if (error) throw error

      setProfileMessage({ type: "success", text: t("profile", "profileUpdated", locale) })
    } catch (error) {
      setProfileMessage({ type: "error", text: t("auth", "genericAuthError", locale) })
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoadingPassword(true)
    setPasswordMessage(null)

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: t("profile", "passwordMismatch", locale) })
      setIsLoadingPassword(false)
      return
    }

    if (newPassword.length < 8) {
      setPasswordMessage({ type: "error", text: t("auth", "passwordMinLength", locale) })
      setIsLoadingPassword(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) throw error

      setPasswordMessage({ type: "success", text: t("profile", "passwordChanged", locale) })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      setPasswordMessage({ type: "error", text: t("auth", "genericAuthError", locale) })
    } finally {
      setIsLoadingPassword(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">{t("profile", "title", locale)}</h1>
          <p className="text-gray-600">{t("profile", "subtitle", locale)}</p>
        </div>

        <div className="grid gap-6 max-w-2xl">
          {/* Account Information */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-green-700" />
                {t("profile", "accountInfo", locale)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("auth", "email", locale)}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayName">{t("auth", "displayName", locale)}</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={t("auth", "yourName", locale)}
                  />
                </div>
                
                {profileMessage && (
                  <div className={`flex items-center gap-2 p-3 rounded-md ${
                    profileMessage.type === "success" 
                      ? "bg-green-50 text-green-700" 
                      : "bg-red-50 text-red-700"
                  }`}>
                    {profileMessage.type === "success" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    {profileMessage.text}
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isLoadingProfile}
                  className="bg-green-700 hover:bg-green-800"
                >
                  {isLoadingProfile ? t("profile", "saving", locale) : t("profile", "saveChanges", locale)}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-700" />
                {t("profile", "changePassword", locale)}
              </CardTitle>
              <CardDescription>
                {t("profile", "leaveBlankPassword", locale)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">{t("auth", "newPassword", locale)}</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("auth", "confirmNewPassword", locale)}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {passwordMessage && (
                  <div className={`flex items-center gap-2 p-3 rounded-md ${
                    passwordMessage.type === "success" 
                      ? "bg-green-50 text-green-700" 
                      : "bg-red-50 text-red-700"
                  }`}>
                    {passwordMessage.type === "success" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    {passwordMessage.text}
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isLoadingPassword || !newPassword}
                  className="bg-green-700 hover:bg-green-800"
                >
                  {isLoadingPassword ? t("profile", "saving", locale) : t("auth", "updatePassword", locale)}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
