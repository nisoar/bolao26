"use client"

import { useLanguage } from "@/lib/i18n/use-language"
import { t } from "@/lib/i18n/translations"
import { Users } from "lucide-react"

export function AdminUsersTitle() {
  const { locale } = useLanguage()
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Users className="h-8 w-8 text-green-700" />
        <h2 className="text-3xl font-bold text-green-700">{t("admin", "usersManagement", locale)}</h2>
      </div>
      <p className="text-muted-foreground">{t("admin", "usersManagementDesc", locale)}</p>
    </div>
  )
}

export function AdminUsersTableHeaders() {
  const { locale } = useLanguage()
  return (
    <>
      <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">{t("auth", "displayName", locale)}</th>
      <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">{t("auth", "email", locale)}</th>
      <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">{t("admin", "status", locale)}</th>
      <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">{t("admin", "joined", locale)}</th>
      <th className="h-10 px-2 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">{t("admin", "actions", locale)}</th>
    </>
  )
}

export function AdminUsersCardHeader() {
  const { locale } = useLanguage()
  return { title: t("admin", "allUsers", locale), description: t("admin", "allUsersDesc", locale) }
}

export function AdminUsersEmpty() {
  const { locale } = useLanguage()
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">{t("admin", "noUsers", locale)}</p>
    </div>
  )
}
