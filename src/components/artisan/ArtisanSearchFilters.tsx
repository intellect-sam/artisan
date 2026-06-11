"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { TRADES, NIGERIAN_STATES } from "@/components/shared/NigeriaData"
import { cn } from "@/lib/utils"

const MIN_RATING_OPTIONS = [
  { label: "3+ stars", value: "3" },
  { label: "4+ stars", value: "4" },
  { label: "4.5+ stars", value: "4.5" },
]

const selectClass = "w-full text-sm border border-border rounded-xl px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"

interface ArtisanSearchFiltersProps {
  initialTrade?: string
  initialState?: string
  initialMinRating?: string
  initialAvailable?: boolean
}

export function ArtisanSearchFilters({
  initialTrade,
  initialState,
  initialMinRating,
  initialAvailable = false,
}: ArtisanSearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [trade, setTrade]       = useState(initialTrade ?? "")
  const [state, setState]       = useState(initialState ?? "")
  const [minRating, setMinRating] = useState(initialMinRating ?? "")
  const [available, setAvailable] = useState(initialAvailable)

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString())
    trade     ? params.set("trade", trade)           : params.delete("trade")
    state     ? params.set("state", state)           : params.delete("state")
    minRating ? params.set("min_rating", minRating)  : params.delete("min_rating")
    available ? params.set("available", "true")      : params.delete("available")
    params.delete("page")
    router.push(`/artisans?${params.toString()}`)
  }

  function clearFilters() {
    setTrade(""); setState(""); setMinRating(""); setAvailable(false)
    router.push("/artisans")
  }

  const isDirty =
    trade !== (initialTrade ?? "") ||
    state !== (initialState ?? "") ||
    minRating !== (initialMinRating ?? "") ||
    available !== initialAvailable

  return (
    <div className="space-y-5">

      {/* Trade */}
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">Trade / Skill</p>
        <select value={trade} onChange={e => setTrade(e.target.value)} className={selectClass}>
          <option value="">All trades</option>
          {TRADES.map(t => (
            <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
          ))}
        </select>
      </div>

      {/* State */}
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">State</p>
        <select value={state} onChange={e => setState(e.target.value)} className={selectClass}>
          <option value="">All states</option>
          {NIGERIAN_STATES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Min Rating */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Minimum Rating</p>
        <div className="flex flex-col gap-1.5">
          {MIN_RATING_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setMinRating(minRating === opt.value ? "" : opt.value)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-colors text-left",
                minRating === opt.value
                  ? "border-primary bg-primary/8 text-primary"
                  : "border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
              )}
            >
              <span className={cn(
                "w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0",
                minRating === opt.value ? "border-primary bg-primary" : "border-border"
              )}>
                {minRating === opt.value && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
              </span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Available Now */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={available}
          onClick={() => setAvailable(!available)}
          className={cn(
            "relative w-9 h-5 rounded-full transition-colors duration-200 shrink-0",
            available ? "bg-primary" : "bg-muted"
          )}
        >
          <span className={cn(
            "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200",
            available ? "translate-x-4" : "translate-x-0"
          )} />
        </button>
        <span className="text-sm text-foreground font-medium">Available now</span>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-1">
        <button
          onClick={applyFilters}
          className="w-full bg-primary hover:bg-primary/90 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          Apply Filters
        </button>
        {isDirty && (
          <button
            type="button"
            onClick={clearFilters}
            className="w-full text-xs text-muted-foreground hover:text-foreground py-1 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

    </div>
  )
}
