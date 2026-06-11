import { AvailabilityToggle } from "@/components/artisan/AvailabilityToggle"
import { EarningsChart } from "@/components/artisan/EarningsChart"
import { Bell, ChevronRight, Clock, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

// ── Mock data ─────────────────────────────────────────────────────────────────

const ARTISAN = { name: "Emeka Okafor", initials: "EO" }

const MOCK_STATS = {
  new_requests: 3,
  active_jobs: 2,
  monthly_earnings: 285000,
  rating: 4.8,
}

const MOCK_RECENT_REQUESTS = [
  {
    id: "r1",
    job_title: "Fix Burst Pipe in Bathroom",
    customer: { full_name: "Kemi Adebayo" },
    state: "Lagos",
    scheduled_date: "2024-12-22",
  },
  {
    id: "r2",
    job_title: "Install New Kitchen Taps",
    customer: { full_name: "Tunde Fashola" },
    state: "Lagos",
    scheduled_date: "2024-12-23",
  },
  {
    id: "r3",
    job_title: "Repair Guest Toilet Cistern",
    customer: { full_name: "Amaka Eze" },
    state: "Lagos",
    scheduled_date: "2024-12-24",
  },
]

const MOCK_WEEKLY_EARNINGS = [
  { day: "Mon", amount: 25000 },
  { day: "Tue", amount: 0 },
  { day: "Wed", amount: 45000 },
  { day: "Thu", amount: 38000 },
  { day: "Fri", amount: 60000 },
  { day: "Sat", amount: 75000 },
  { day: "Sun", amount: 42000 },
]

const weekTotal = MOCK_WEEKLY_EARNINGS.reduce((s, d) => s + d.amount, 0)

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", { day: "2-digit", month: "short" })
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ArtisanDashboardPage() {
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
            <p className="font-semibold text-foreground leading-tight">{ARTISAN.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <AvailabilityToggle />
            <button className="relative w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <Bell className="w-4 h-4 text-muted-foreground" strokeWidth={1.8} />
              {MOCK_STATS.new_requests > 0 && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full" />
              )}
            </button>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-xs">{ARTISAN.initials}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-5 pt-6 pb-2 space-y-7">

        {/* ── Stats row ───────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span>
            <span className="font-semibold text-primary">{MOCK_STATS.new_requests}</span>
            <span className="text-muted-foreground"> new requests</span>
          </span>
          <span className="text-border select-none">·</span>
          <span>
            <span className="font-semibold text-foreground">{MOCK_STATS.active_jobs}</span>
            <span className="text-muted-foreground"> active jobs</span>
          </span>
          <span className="text-border select-none">·</span>
          <span>
            <span className="font-semibold text-foreground">
              ₦{(MOCK_STATS.monthly_earnings / 1000).toFixed(0)}k
            </span>
            <span className="text-muted-foreground"> this month</span>
          </span>
          <span className="text-border select-none">·</span>
          <span>
            <span className="font-semibold text-foreground">{MOCK_STATS.rating}★</span>
            <span className="text-muted-foreground"> rating</span>
          </span>
        </div>

        {/* ── Job requests ────────────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">Job Requests</p>
            <Link href="/artisan/jobs" className="text-xs font-medium text-primary">
              See all
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
            {MOCK_RECENT_REQUESTS.map((job) => (
              <div key={job.id} className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{job.job_title}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{job.customer.full_name}</span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" /> {fmt(job.scheduled_date)}
                      </span>
                      <span>{job.state}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 text-xs font-semibold bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
                    Accept
                  </button>
                  <button className="flex-1 py-2 text-xs font-medium text-muted-foreground bg-muted rounded-xl hover:bg-muted/80 transition-colors">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── This week earnings ──────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">This Week</p>
            <Link href="/artisan/earnings" className="text-xs font-medium text-primary flex items-center gap-0.5">
              Details <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-5">
              <p className="text-xs text-muted-foreground">Total earned</p>
              <p className="text-xl font-bold text-foreground" style={{ letterSpacing: "-0.02em" }}>
                ₦{weekTotal.toLocaleString()}
              </p>
            </div>
            <EarningsChart data={MOCK_WEEKLY_EARNINGS} />
          </div>
        </div>

        {/* ── Rating ──────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-1.5 text-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-foreground">{MOCK_STATS.rating}</span>
            <span className="text-muted-foreground">· Top 10% of artisans</span>
          </div>
          <Link href="/artisan/performance" className="text-xs text-primary font-medium flex items-center gap-0.5">
            View <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>
    </div>
  )
}
