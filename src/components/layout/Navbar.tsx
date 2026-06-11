"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores/authStore"
import { logoutAction } from "@/actions/auth"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Find Artisans", href: "/artisans" },
  { label: "Become an Artisan", href: "/auth/register/artisan" },
]

interface NavbarProps {
  transparent?: boolean
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, user } = useAuthStore()

  const dashboardHref =
    user?.role === "artisan" ? "/artisan/dashboard" : "/dashboard"

  useEffect(() => {
    if (!transparent) return
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [transparent])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const handleLogout = async () => {
    useAuthStore.getState().clearAuth()
    await logoutAction()
    setMobileOpen(false)
  }

  const ghost = transparent && !scrolled
  const floating = transparent && scrolled

  return (
    <>
      <header
        className={cn(
          "top-0 z-50 w-full transition-all duration-500 ease-in-out",
          transparent ? "fixed" : "sticky",
          ghost    ? "bg-transparent" :
          floating ? "py-3 px-4 sm:px-6" :
                     "bg-white border-b border-border shadow-sm"
        )}
      >
        <div
          className={cn(
            "mx-auto transition-all duration-500 ease-in-out",
            floating
              ? "max-w-5xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.10)] px-5"
              : "max-w-7xl px-4 sm:px-6 lg:px-8"
          )}
        >
          <div className="flex items-center justify-between h-15">
            {/* Wordmark */}
            <Link href="/" className="flex items-center">
              <span
                className={cn(
                  "text-[0.95rem] font-semibold tracking-tight transition-colors duration-300",
                  ghost ? "text-white" : "text-foreground"
                )}
              >
                Artisan<span className="text-primary">Connect</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "text-sm transition-colors duration-300",
                    ghost
                      ? "text-white/80 hover:text-white"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link href={dashboardHref}>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "text-sm font-medium transition-colors duration-300",
                        ghost && "border-white/40 text-white hover:bg-white/10 hover:text-white"
                      )}
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleLogout}
                    className={cn(
                      "text-sm transition-colors duration-300",
                      ghost
                        ? "text-white/70 hover:text-white hover:bg-white/10"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-sm transition-colors duration-300",
                        ghost
                          ? "text-white/80 hover:text-white hover:bg-white/10"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/auth/register/customer">
                    <Button size="sm" className="text-sm font-medium px-4">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className={cn(
                "md:hidden p-2 rounded-md transition-colors duration-300",
                ghost
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-[200] md:hidden flex flex-col bg-black/70 backdrop-blur-xl transition-all duration-300 ease-in-out",
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        {/* Sheet header */}
        <div className="flex items-center justify-between h-15 px-4 sm:px-6 border-b border-white/10 shrink-0">
          <Link
            href="/"
            className="text-[0.95rem] font-semibold tracking-tight text-white"
            onClick={() => setMobileOpen(false)}
          >
            Artisan<span className="text-primary">Connect</span>
          </Link>
          <button
            className="p-2 rounded-md text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col px-6 pt-6 overflow-y-auto">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between py-5 text-2xl font-semibold text-white/90 border-b border-white/10 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {label}
              <ArrowRight className="w-5 h-5 text-white/40" />
            </Link>
          ))}
        </nav>

        {/* Auth actions pinned to bottom */}
        <div className="px-6 pb-10 pt-6 space-y-3 shrink-0">
          {isAuthenticated ? (
            <>
              <Link href={dashboardHref} onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full h-12 text-base font-medium border-white/20 text-white hover:bg-white/10 hover:text-white">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full h-12 text-base text-white/60 hover:text-white hover:bg-white/10"
                onClick={handleLogout}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/register/customer" onClick={() => setMobileOpen(false)}>
                <Button className="w-full h-12 text-base font-medium">
                  Get Started
                </Button>
              </Link>
              <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full h-12 text-base border-white/20 text-white hover:bg-white/10 hover:text-white">
                  Sign in
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}
