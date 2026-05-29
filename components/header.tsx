"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Trophy, Shield, Users, User, Menu, X } from "lucide-react"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 flex-shrink-0">
            <Trophy className="h-6 w-6 md:h-8 md:w-8 text-green-700" />
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-green-700">{t("home", "title", locale)}</h1>
              <p className="text-xs text-muted-foreground">{t("nav", "subtitle", locale)}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-4">
            <Link href="/dashboard">
              <Button variant={pathname === "/dashboard" ? "default" : "ghost"} size="sm" className="text-xs xl:text-base">{t("nav", "dashboard", locale)}</Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant={pathname === "/leaderboard" ? "default" : "ghost"} size="sm" className="text-xs xl:text-base">{t("nav", "leaderboard", locale)}</Button>
            </Link>
            <Link href="/calendar">
              <Button variant={pathname === "/calendar" ? "default" : "ghost"} size="sm" className="text-xs xl:text-base">{t("nav", "calendar", locale)}</Button>
            </Link>
            <Link href="/scoring-rules">
              <Button variant={pathname === "/scoring-rules" ? "default" : "ghost"} size="sm" className="text-xs xl:text-base">{t("nav", "rules", locale)}</Button>
            </Link>
            {isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={pathname.startsWith("/admin") ? "default" : "ghost"} size="sm" className="gap-1 xl:gap-2 text-xs xl:text-base">
                    <Shield className="h-3 w-3 xl:h-4 xl:w-4" />
                    {t("nav", "admin", locale)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer text-xs xl:text-base">
                      <Shield className="h-4 w-4 mr-2" />
                      {t("nav", "matches", locale)}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/users" className="cursor-pointer text-xs xl:text-base">
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
                  size="sm"
                  className="gap-1 xl:gap-2 text-xs xl:text-base"
                >
                  <User className="h-3 w-3 xl:h-4 xl:w-4" />
                  <span className="hidden xl:inline">{displayName}</span>
                </Button>
              </Link>
            )}
            <Button variant="outline" onClick={handleLogout} size="sm" className="bg-transparent text-xs xl:text-base">
              {t("nav", "logout", locale)}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-0 h-auto w-auto"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-3 pb-3 space-y-1 border-t pt-3">
            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant={pathname === "/dashboard" ? "default" : "ghost"} className="w-full justify-start text-sm">
                {t("nav", "dashboard", locale)}
              </Button>
            </Link>
            <Link href="/leaderboard" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant={pathname === "/leaderboard" ? "default" : "ghost"} className="w-full justify-start text-sm">
                {t("nav", "leaderboard", locale)}
              </Button>
            </Link>
            <Link href="/calendar" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant={pathname === "/calendar" ? "default" : "ghost"} className="w-full justify-start text-sm">
                {t("nav", "calendar", locale)}
              </Button>
            </Link>
            <Link href="/scoring-rules" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant={pathname === "/scoring-rules" ? "default" : "ghost"} className="w-full justify-start text-sm">
                {t("nav", "rules", locale)}
              </Button>
            </Link>
            {isAdmin && (
              <>
                <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant={pathname.startsWith("/admin") ? "default" : "ghost"} className="w-full justify-start text-sm gap-2">
                    <Shield className="h-4 w-4" />
                    {t("nav", "matches", locale)}
                  </Button>
                </Link>
                <Link href="/admin/users" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-sm gap-2">
                    <Users className="h-4 w-4" />
                    {t("nav", "users", locale)}
                  </Button>
                </Link>
              </>
            )}
            {displayName && (
              <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant={pathname === "/profile" ? "default" : "ghost"} className="w-full justify-start text-sm gap-2">
                  <User className="h-4 w-4" />
                  {displayName}
                </Button>
              </Link>
            )}
            <Button variant="outline" onClick={() => { handleLogout(); setIsMobileMenuOpen(false) }} className="w-full justify-start bg-transparent text-sm">
              {t("nav", "logout", locale)}
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
