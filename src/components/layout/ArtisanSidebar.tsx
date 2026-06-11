"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Briefcase, Image, TrendingUp, BarChart3, Settings, Headphones, LogOut, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/stores/authStore"
import { logoutAction } from "@/actions/auth"

const navItems = [
  { href: "/artisan/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/artisan/jobs", icon: Briefcase, label: "Job Requests" },
  { href: "/artisan/portfolio", icon: Image, label: "Portfolio" },
  { href: "/artisan/earnings", icon: TrendingUp, label: "Earnings" },
  { href: "/artisan/performance", icon: BarChart3, label: "Performance" },
  { href: "/support", icon: Headphones, label: "Support" },
]

export function ArtisanSidebar() {
  const pathname = usePathname()
  const { user } = useAuthStore()

  const handleLogout = async () => {
    useAuthStore.getState().clearAuth()
    await logoutAction()
  }

  return (
    <aside className="w-64 bg-secondary text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <Wrench className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-lg">
            Artisan<span className="text-primary">Connect</span>
          </span>
        </Link>
      </div>

      {user && (
        <div className="px-4 py-4 border-b border-white/10">
          <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Artisan</p>
          <p className="font-semibold text-white truncate">{user.full_name}</p>
          <p className="text-sm text-white/60 truncate">{user.email}</p>
        </div>
      )}

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/artisan/dashboard" && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
