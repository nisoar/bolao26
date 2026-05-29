"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Trophy, Shield, Users, User } from "lucide-react"
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const [isAdmin, setIsAdmin] = useState(false)
  const [displayName, setDisplayName] = useState<string | null>(null)
  const { locale } = useLanguage()

  useEffect(() => {
    const loadUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      // Fetch profile data including admin status and display name
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin, display_name")
        .eq("id", user.id)
        .single()

      if (profile) {
        setIsAdmin(profile.is_admin === true)
        setDisplayName(profile.display_name || user.email?.split("@")[0] || null)
      }
    }
    loadUserData()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-green-700" />
            <div>
              <h1 className="text-xl font-bold text-green-700">{t("home", "title", locale)}</h1>
              <p className="text-xs text-muted-foreground">{t("nav", "subtitle", locale)}</p>
            </div>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant={pathname === "/dashboard" ? "default" : "ghost"}>{t("nav", "dashboard", locale)}</Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant={pathname === "/leaderboard" ? "default" : "ghost"}>{t("nav", "leaderboard", locale)}</Button>
            </Link>
            <Link href="/calendar">
              <Button variant={pathname === "/calendar" ? "default" : "ghost"}>{t("nav", "calendar", locale)}</Button>
            </Link>
            <Link href="/scoring-rules">
              <Button variant={pathname === "/scoring-rules" ? "default" : "ghost"}>{t("nav", "rules", locale)}</Button>
            </Link>
            {isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={pathname.startsWith("/admin") ? "default" : "ghost"} className="gap-2">
                    <Shield className="h-4 w-4" />
                    {t("nav", "admin", locale)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      <Shield className="h-4 w-4 mr-2" />
                      {t("nav", "matches", locale)}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/users" className="cursor-pointer">
                      <Users className="h-4 w-4 mr-2" />
                      {t("nav", "users", locale)}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <LanguageSwitcher />
            {displayName && (
              <Link href="/profile">
                <Button 
                  variant={pathname === "/profile" ? "default" : "ghost"} 
                  className="gap-2"
                >
                  <User className="h-4 w-4" />
                  {displayName}
                </Button>
              </Link>
            )}
            <Button variant="outline" onClick={handleLogout} className="bg-transparent">
              {t("nav", "logout", locale)}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
