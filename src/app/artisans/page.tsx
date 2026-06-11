import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ArtisanGrid } from "@/components/artisan/ArtisanGrid"
import { ArtisanSearchFilters } from "@/components/artisan/ArtisanSearchFilters"
import { SortSelect } from "@/components/artisan/SortSelect"
import type { Artisan } from "@/types"

const MOCK_ARTISANS: Artisan[] = [
  {
    id: "1", user_id: "u1",
    full_name: "Emeka Okafor", trade: "plumber",
    bio: "Professional plumber with 8 years experience in Lagos. Specializing in pipe repairs, bathroom installations, and drainage systems.",
    state: "Lagos", lga: "Ikeja",
    rating: 4.8, total_reviews: 127, total_jobs: 203,
    min_rate: 5000, max_rate: 25000,
    is_available: true, is_verified: true,
    photo_url: null as unknown as string, portfolio: [], created_at: "2024-01-01",
  },
  {
    id: "2", user_id: "u2",
    full_name: "Chidi Nweze", trade: "electrician",
    bio: "Licensed electrician. Installations, repairs, wiring for homes and offices.",
    state: "Lagos", lga: "Surulere",
    rating: 4.9, total_reviews: 89, total_jobs: 156,
    min_rate: 8000, max_rate: 40000,
    is_available: true, is_verified: true,
    photo_url: null as unknown as string, portfolio: [], created_at: "2024-01-02",
  },
  {
    id: "3", user_id: "u3",
    full_name: "Aminu Hassan", trade: "carpenter",
    bio: "Skilled carpenter for furniture making, fitting, and woodwork.",
    state: "Abuja", lga: "Gwagwalada",
    rating: 4.7, total_reviews: 64, total_jobs: 98,
    min_rate: 10000, max_rate: 60000,
    is_available: false, is_verified: true,
    photo_url: null as unknown as string, portfolio: [], created_at: "2024-01-03",
  },
  {
    id: "4", user_id: "u4",
    full_name: "Ngozi Adaeze", trade: "tailor",
    bio: "Expert fashion designer and tailor. Men and women outfits, uniforms, aso-ebi.",
    state: "Lagos", lga: "Lagos Island",
    rating: 5.0, total_reviews: 201, total_jobs: 380,
    min_rate: 3000, max_rate: 50000,
    is_available: true, is_verified: true,
    photo_url: null as unknown as string, portfolio: [], created_at: "2024-01-04",
  },
  {
    id: "5", user_id: "u5",
    full_name: "Segun Abiodun", trade: "ac_technician",
    bio: "AC installation, repair, servicing for all brands. Quick response.",
    state: "Lagos", lga: "Oshodi-Isolo",
    rating: 4.6, total_reviews: 43, total_jobs: 67,
    min_rate: 5000, max_rate: 30000,
    is_available: true, is_verified: false,
    photo_url: null as unknown as string, portfolio: [], created_at: "2024-01-05",
  },
  {
    id: "6", user_id: "u6",
    full_name: "Bello Musa", trade: "generator_mechanic",
    bio: "Generator repairs, servicing, and installation. Emergency callouts available.",
    state: "Kano", lga: "Kano Municipal",
    rating: 4.5, total_reviews: 37, total_jobs: 55,
    min_rate: 5000, max_rate: 20000,
    is_available: true, is_verified: true,
    photo_url: null as unknown as string, portfolio: [], created_at: "2024-01-06",
  },
]

interface SearchPageProps {
  searchParams: Promise<{
    trade?: string
    state?: string
    min_rating?: string
    sort?: string
    available?: string
  }>
}

export default async function ArtisansPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const { trade, state, min_rating, sort, available } = params

  let filtered = [...MOCK_ARTISANS]

  if (trade)               filtered = filtered.filter(a => a.trade === trade)
  if (state)               filtered = filtered.filter(a => a.state.toLowerCase() === state.toLowerCase())
  if (min_rating)          filtered = filtered.filter(a => a.rating >= parseFloat(min_rating))
  if (available === "true") filtered = filtered.filter(a => a.is_available)

  if (sort === "newest")        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  else if (sort === "most_jobs") filtered.sort((a, b) => b.total_jobs - a.total_jobs)
  else                           filtered.sort((a, b) => b.rating - a.rating)

  const activeFilters = [
    trade     && { key: "trade",     label: trade.replace(/_/g, " ") },
    state     && { key: "state",     label: state },
    min_rating && { key: "min_rating", label: `${min_rating}+ stars` },
    available === "true" && { key: "available", label: "Available now" },
  ].filter(Boolean) as { key: string; label: string }[]

  return (
    <>
      <Navbar />

      <div className="bg-background min-h-screen">
        {/* ── Page header ─────────────────────────────────────────────────── */}
        <div className="border-b border-border bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="font-bold text-foreground mb-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}>
              Find a Skilled Artisan
            </h1>
            <p className="text-muted-foreground text-sm">
              Browse verified tradespeople across Nigeria
            </p>
          </div>
        </div>

        {/* ── Main layout ─────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* Filters sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-5 sticky top-6">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-sm font-semibold text-foreground">Filters</p>
                  {activeFilters.length > 0 && (
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {activeFilters.length}
                    </span>
                  )}
                </div>
                <ArtisanSearchFilters
                  initialTrade={trade}
                  initialState={state}
                  initialMinRating={min_rating}
                  initialAvailable={available === "true"}
                />
              </div>
            </aside>

            {/* Results */}
            <main className="lg:col-span-3 space-y-5">
              {/* Toolbar */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                  artisan{filtered.length !== 1 ? "s" : ""} found
                  {trade && <span className="text-primary font-medium"> · {trade.replace(/_/g, " ")}</span>}
                  {state && <span> in {state}</span>}
                </p>
                <SortSelect currentSort={sort} />
              </div>

              {/* Active filter chips */}
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 items-center">
                  {activeFilters.map(f => (
                    <span
                      key={f.key}
                      className="inline-flex items-center gap-1 bg-primary/8 text-primary text-xs font-medium px-3 py-1 rounded-full capitalize"
                    >
                      {f.label}
                    </span>
                  ))}
                  <Link href="/artisans" className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors ml-1">
                    Clear all
                  </Link>
                </div>
              )}

              <ArtisanGrid artisans={filtered} />
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
