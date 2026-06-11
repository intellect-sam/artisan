"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Briefcase, TrendingUp, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { href: "/artisan/dashboard",    icon: LayoutDashboard, label: "Home"     },
  { href: "/artisan/jobs",         icon: Briefcase,       label: "Jobs"     },
  { href: "/artisan/earnings",     icon: TrendingUp,      label: "Earnings" },
  { href: "/artisan/performance",  icon: BarChart3,       label: "Profile"  },
]

export function ArtisanBottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === "/artisan/dashboard"
      ? pathname === href
      : pathname.startsWith(href)

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 border-t border-border"
      style={{ background: "color-mix(in oklch, var(--background) 92%, transparent)", backdropFilter: "blur(20px)" }}
    >
      <div className="flex items-center max-w-lg mx-auto px-4">
        {tabs.map(({ href, icon: Icon, label }) => {
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
              <span className={cn(
                "text-[10px] font-semibold tracking-wide",
                active ? "text-primary" : "text-muted-foreground"
              )}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
