import Link from "next/link"
import { Bell, ChevronRight, Star, Clock, ArrowRight } from "lucide-react"
import { StatusBadge } from "@/components/booking/StatusBadge"
import type { Booking } from "@/types"

// ── Mock data ─────────────────────────────────────────────────────────────────

const USER = { name: "Kemi Adebayo", initials: "KA" }

const STATS = { active: 2, completed: 14, reviews: 1 }

const RECENT_BOOKINGS: Booking[] = [
  {
    id: "b1",
    customer_id: "c1",
    artisan_id: "a1",
    job_title: "Fix Kitchen Pipe Leak",
    description: "Water pipe under kitchen sink is leaking badly",
    trade: "plumber",
    address: "12 Adeyemi Street",
    state: "Lagos",
    scheduled_date: "2024-12-20",
    status: "active",
    price: 12000,
    payment_status: "unpaid",
    has_review: false,
    created_at: "2024-12-15",
    artisan: {
      id: "a1", user_id: "u1", full_name: "Emeka Okafor",
      photo_url: undefined, trade: "plumber", bio: "", state: "Lagos",
      lga: "Ikeja", rating: 4.8, total_reviews: 127, total_jobs: 200,
      is_available: true, is_verified: true, portfolio: [], created_at: "2024-01-01",
    },
  },
  {
    id: "b2",
    customer_id: "c1",
    artisan_id: "a2",
    job_title: "Install New Circuit Breaker",
    description: "Need new breaker installed in utility room",
    trade: "electrician",
    address: "12 Adeyemi Street",
    state: "Lagos",
    scheduled_date: "2024-12-18",
    status: "completed",
    price: 25000,
    payment_status: "paid",
    has_review: false,
    created_at: "2024-12-10",
    artisan: {
      id: "a2", user_id: "u2", full_name: "Chidi Nweze",
      photo_url: undefined, trade: "electrician", bio: "", state: "Lagos",
      lga: "Surulere", rating: 4.6, total_reviews: 89, total_jobs: 150,
      is_available: true, is_verified: true, portfolio: [], created_at: "2024-01-01",
    },
  },
  {
    id: "b3",
    customer_id: "c1",
    artisan_id: "a3",
    job_title: "Sew Traditional Agbada",
    description: "Need a complete set of native attire for wedding",
    trade: "tailor",
    address: "12 Adeyemi Street",
    state: "Lagos",
    scheduled_date: "2024-12-10",
    status: "completed",
    price: 45000,
    payment_status: "released",
    has_review: true,
    created_at: "2024-12-01",
    artisan: {
      id: "a3", user_id: "u3", full_name: "Ngozi Adaeze",
      photo_url: undefined, trade: "tailor", bio: "", state: "Lagos",
      lga: "Lagos Island", rating: 4.9, total_reviews: 210, total_jobs: 300,
      is_available: true, is_verified: true, portfolio: [], created_at: "2024-01-01",
    },
  },
]

const TRADE_ICONS: Record<string, string> = {
  plumber: "🔧", electrician: "⚡", tailor: "🧵",
  carpenter: "🪚", painter: "🎨", welder: "🔥",
  ac_technician: "❄️", phone_repairer: "📱",
}
const tradeIcon = (t: string) => TRADE_ICONS[t] ?? "🛠️"

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", { day: "2-digit", month: "short" })
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const activeBooking = RECENT_BOOKINGS.find(b => b.status === "active")

  return (
    <div>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 px-5 py-4 border-b border-border"
        style={{ background: "color-mix(in oklch, var(--background) 92%, transparent)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Good morning</p>
            <p className="font-semibold text-foreground leading-tight">{USER.name}</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <Bell className="w-4 h-4 text-muted-foreground" strokeWidth={1.8} />
              {STATS.reviews > 0 && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full" />
              )}
            </button>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-semibold text-xs">{USER.initials}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-5 pt-6 pb-2 space-y-7">

        {/* ── Stats row ───────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 text-sm">
          <span>
            <span className="font-semibold text-foreground">{STATS.active}</span>
            <span className="text-muted-foreground"> active</span>
          </span>
          <span className="text-border select-none">·</span>
          <span>
            <span className="font-semibold text-foreground">{STATS.completed}</span>
            <span className="text-muted-foreground"> completed</span>
          </span>
          {STATS.reviews > 0 && (
            <>
              <span className="text-border select-none">·</span>
              <span>
                <span className="font-semibold text-primary">{STATS.reviews}</span>
                <span className="text-muted-foreground"> to review</span>
              </span>
            </>
          )}
        </div>

        {/* ── Active job or Book CTA ───────────────────────────────────────────── */}
        {activeBooking ? (
          <Link
            href={`/bookings/${activeBooking.id}`}
            className="block rounded-2xl border border-primary/20 bg-primary/8 p-5 active:scale-[0.99] transition-transform"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[0.68rem] font-semibold text-primary uppercase tracking-wider mb-1.5">
                  Active Job
                </p>
                <p className="font-semibold text-foreground text-sm leading-snug truncate">
                  {activeBooking.job_title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activeBooking.artisan?.full_name}
                  <span className="mx-1.5 text-border">·</span>
                  {fmt(activeBooking.scheduled_date)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                {activeBooking.price && (
                  <span className="font-semibold text-foreground text-sm">
                    ₦{activeBooking.price.toLocaleString()}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </Link>
        ) : (
          <Link
            href="/dashboard/bookings/new"
            className="flex items-center justify-between bg-primary hover:bg-primary/90 text-white rounded-2xl px-5 py-4 transition-colors active:scale-[0.99]"
          >
            <span className="font-medium text-sm">Book a service</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}

        {/* ── Review nudge ────────────────────────────────────────────────────── */}
        {STATS.reviews > 0 && (
          <Link
            href="/dashboard/bookings"
            className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3.5 active:scale-[0.99] transition-transform"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
            <p className="text-sm text-foreground flex-1">
              {STATS.reviews} completed job needs your review
            </p>
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          </Link>
        )}

        {/* ── Recent bookings ──────────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">Recent Bookings</p>
            <Link href="/dashboard/bookings" className="text-xs font-medium text-primary">
              See all
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
            {RECENT_BOOKINGS.map((booking) => (
              <Link
                key={booking.id}
                href={`/bookings/${booking.id}`}
                className="flex items-center gap-3.5 px-4 py-3.5 active:bg-muted/50 transition-colors"
              >
                <span className="text-xl shrink-0 leading-none">{tradeIcon(booking.trade)}</span>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{booking.job_title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <StatusBadge status={booking.status} />
                    <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" /> {fmt(booking.scheduled_date)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {booking.price && (
                    <span className="text-sm font-semibold text-foreground">
                      ₦{(booking.price / 1000).toFixed(0)}k
                    </span>
                  )}
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Browse artisans ──────────────────────────────────────────────────── */}
        <Link
          href="/artisans"
          className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
        >
          <span>Browse 2,400+ verified artisans</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

      </div>
    </div>
  )
}
