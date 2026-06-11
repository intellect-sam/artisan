"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle, ChevronRight, Clock, MapPin } from "lucide-react"
import { StatusBadge } from "@/components/booking/StatusBadge"
import { EmptyState } from "@/components/shared/EmptyState"
import type { Booking, BookingStatus } from "@/types"

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockBookings: Booking[] = [
  {
    id: "b1", customer_id: "c1", artisan_id: "a1",
    job_title: "Fix Kitchen Pipe Leak",
    description: "Water pipe under kitchen sink is leaking badly",
    trade: "plumber", address: "12 Adeyemi Street", state: "Lagos",
    scheduled_date: "2024-12-20", status: "active",
    price: 12000, payment_status: "unpaid", has_review: false,
    created_at: "2024-12-15",
    artisan: { id: "a1", user_id: "u1", full_name: "Emeka Okafor", photo_url: undefined, trade: "plumber", bio: "", state: "Lagos", lga: "Ikeja", rating: 4.8, total_reviews: 127, total_jobs: 200, is_available: true, is_verified: true, portfolio: [], created_at: "2024-01-01" },
  },
  {
    id: "b2", customer_id: "c1", artisan_id: "a2",
    job_title: "Install New Circuit Breaker",
    description: "Need new breaker installed in utility room",
    trade: "electrician", address: "12 Adeyemi Street", state: "Lagos",
    scheduled_date: "2024-12-18", status: "completed",
    price: 25000, payment_status: "paid", has_review: false,
    created_at: "2024-12-10",
    artisan: { id: "a2", user_id: "u2", full_name: "Chidi Nweze", photo_url: undefined, trade: "electrician", bio: "", state: "Lagos", lga: "Surulere", rating: 4.6, total_reviews: 89, total_jobs: 150, is_available: true, is_verified: true, portfolio: [], created_at: "2024-01-01" },
  },
  {
    id: "b3", customer_id: "c1", artisan_id: "a3",
    job_title: "Sew Traditional Agbada",
    description: "Need a complete set of native attire for wedding",
    trade: "tailor", address: "12 Adeyemi Street", state: "Lagos",
    scheduled_date: "2024-12-10", status: "completed",
    price: 45000, payment_status: "released", has_review: true,
    created_at: "2024-12-01",
    artisan: { id: "a3", user_id: "u3", full_name: "Ngozi Adaeze", photo_url: undefined, trade: "tailor", bio: "", state: "Lagos", lga: "Lagos Island", rating: 4.9, total_reviews: 210, total_jobs: 300, is_available: true, is_verified: true, portfolio: [], created_at: "2024-01-01" },
  },
  {
    id: "b4", customer_id: "c1", artisan_id: "a4",
    job_title: "Paint Living Room",
    description: "Need to repaint living room walls and ceiling",
    trade: "painter", address: "12 Adeyemi Street", state: "Lagos",
    scheduled_date: "2024-12-25", status: "pending",
    payment_status: "unpaid", has_review: false,
    created_at: "2024-12-20",
    artisan: { id: "a4", user_id: "u4", full_name: "Yusuf Ibrahim", photo_url: undefined, trade: "painter", bio: "", state: "Lagos", lga: "Mushin", rating: 4.5, total_reviews: 60, total_jobs: 80, is_available: true, is_verified: true, portfolio: [], created_at: "2024-01-01" },
  },
  {
    id: "b5", customer_id: "c1", artisan_id: "a5",
    job_title: "Weld Iron Gate",
    description: "Need to weld a broken iron gate",
    trade: "welder", address: "12 Adeyemi Street", state: "Lagos",
    scheduled_date: "2024-12-22", status: "cancelled",
    price: 8000, payment_status: "unpaid", has_review: false,
    created_at: "2024-12-18",
    artisan: { id: "a5", user_id: "u5", full_name: "Tunde Welderboy", photo_url: undefined, trade: "welder", bio: "", state: "Lagos", lga: "Ojo", rating: 4.2, total_reviews: 35, total_jobs: 50, is_available: true, is_verified: false, portfolio: [], created_at: "2024-01-01" },
  },
]

const TRADE_ICONS: Record<string, string> = {
  plumber: "🔧", electrician: "⚡", tailor: "🧵",
  carpenter: "🪚", painter: "🎨", welder: "🔥",
}
const tradeIcon = (t: string) => TRADE_ICONS[t] ?? "🛠️"

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-NG", { day: "2-digit", month: "short" })
}

// ── Filter tabs ───────────────────────────────────────────────────────────────

type TabValue = "all" | BookingStatus

const TABS: { value: TabValue; label: string }[] = [
  { value: "all",       label: "All"       },
  { value: "active",    label: "Active"    },
  { value: "pending",   label: "Pending"   },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<TabValue>("all")

  const filtered =
    activeTab === "all"
      ? mockBookings
      : mockBookings.filter(b => b.status === activeTab)

  const counts: Record<TabValue, number> = {
    all:       mockBookings.length,
    active:    mockBookings.filter(b => b.status === "active").length,
    pending:   mockBookings.filter(b => b.status === "pending").length,
    completed: mockBookings.filter(b => b.status === "completed").length,
    cancelled: mockBookings.filter(b => b.status === "cancelled").length,
    disputed:  mockBookings.filter(b => b.status === "disputed").length,
  }

  return (
    <div>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 px-5 pt-5 pb-0 border-b border-border"
        style={{ background: "rgba(253,239,216,0.92)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-black text-foreground tracking-tight">My Bookings</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{mockBookings.length} total jobs</p>
          </div>
          <Link
            href="/dashboard/bookings/new"
            className="flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3.5 py-2.5 rounded-xl active:scale-95 transition-transform"
          >
            <PlusCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
            Post Job
          </Link>
        </div>

        {/* Filter chips — horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5">
          {TABS.map(({ value, label }) => {
            const active = activeTab === value
            const count = counts[value]
            return (
              <button
                key={value}
                onClick={() => setActiveTab(value)}
                className={`flex items-center gap-1.5 shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "bg-card border border-border text-muted-foreground"
                }`}
              >
                {label}
                {count > 0 && (
                  <span
                    className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${
                      active ? "bg-white/25 text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </header>

      {/* ── List ────────────────────────────────────────────────────────────── */}
      <div className="px-5 pt-4">
        {filtered.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No bookings found"
            description="You don't have any bookings in this category yet."
            actionLabel="Post a Job"
            actionHref="/dashboard/bookings/new"
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => (
              <Link
                key={booking.id}
                href={`/bookings/${booking.id}`}
                className="flex items-center gap-4 bg-card rounded-2xl p-4 border border-border active:scale-[0.98] transition-transform block"
              >
                {/* Trade icon */}
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-2xl shrink-0">
                  {tradeIcon(booking.trade)}
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{booking.job_title}</p>

                  {booking.artisan && (
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{booking.artisan.full_name}</p>
                  )}

                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <StatusBadge status={booking.status} />
                    <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                      <Clock className="w-3 h-3" /> {fmt(booking.scheduled_date)}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" /> {booking.state}
                    </span>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  {booking.price ? (
                    <span className="text-sm font-black text-foreground">
                      ₦{booking.price.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">TBD</span>
                  )}
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
