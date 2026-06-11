"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CalendarDays, PlusCircle, Search, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { href: "/dashboard",          icon: LayoutDashboard, label: "Home" },
  { href: "/dashboard/bookings", icon: CalendarDays,    label: "Bookings" },
  { href: "/artisans",           icon: Search,          label: "Browse" },
  { href: "/dashboard/settings", icon: Settings,        label: "Account" },
]

export function CustomerSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname.startsWith(href)

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 border-t border-border"
      style={{ background: "rgba(253, 239, 216, 0.92)", backdropFilter: "blur(20px)" }}
    >
      <div className="flex items-center max-w-lg mx-auto px-4">
        {/* First 2 tabs */}
        {tabs.slice(0, 2).map(({ href, icon: Icon, label }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-3 transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon
                className={cn("w-5 h-5 transition-all", active && "scale-110")}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={cn("text-[10px] font-semibold tracking-wide", active ? "text-primary" : "text-muted-foreground")}>
                {label}
              </span>
            </Link>
          )
        })}

        {/* Center FAB */}
        <div className="flex-1 flex flex-col items-center -mt-5 pb-1">
          <Link
            href="/dashboard/bookings/new"
            className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg"
            style={{ boxShadow: "0 8px 24px oklch(0.64 0.095 50 / 0.40)" }}
          >
            <PlusCircle className="w-6 h-6 text-white" strokeWidth={1.8} />
          </Link>
          <span className="text-[10px] font-semibold text-primary mt-1">Post Job</span>
        </div>

        {/* Last 2 tabs */}
        {tabs.slice(2).map(({ href, icon: Icon, label }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-3 transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon
                className={cn("w-5 h-5 transition-all", active && "scale-110")}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={cn("text-[10px] font-semibold tracking-wide", active ? "text-primary" : "text-muted-foreground")}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
