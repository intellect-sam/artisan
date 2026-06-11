"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { NIGERIAN_STATES, TRADES } from "@/components/shared/NigeriaData"

interface HomeSearchBarProps {
  dark?: boolean
}

export function HomeSearchBar({ dark = false }: HomeSearchBarProps) {
  const [trade, setTrade] = useState("")
  const [state, setState] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (trade) params.set("trade", trade)
    if (state) params.set("state", state)
    router.push(`/artisans?${params.toString()}`)
  }

  const selectClass = dark
    ? "flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 border border-white/20 backdrop-blur-sm"
    : "flex-1 px-4 py-3 rounded-xl bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 border-0"

  if (dark) {
    return (
      <div className="flex flex-col sm:flex-row gap-2 max-w-2xl">
        <select
          value={trade}
          onChange={(e) => setTrade(e.target.value)}
          className={selectClass}
        >
          <option value="" className="text-gray-800">Select Trade</option>
          {TRADES.map((t) => (
            <option key={t.value} value={t.value} className="text-gray-800">
              {t.icon} {t.label}
            </option>
          ))}
        </select>

        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className={selectClass}
        >
          <option value="" className="text-gray-800">Select State</option>
          {NIGERIAN_STATES.map((s) => (
            <option key={s} value={s} className="text-gray-800">{s}</option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-7 py-3 rounded-xl font-semibold shrink-0 transition-colors"
        >
          <Search className="w-4 h-4" />
          Find Artisan
        </button>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl shadow-xl border border-border">
      <select
        value={trade}
        onChange={(e) => setTrade(e.target.value)}
        className={selectClass}
      >
        <option value="">Select Trade</option>
        {TRADES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.icon} {t.label}
          </option>
        ))}
      </select>

      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className={selectClass}
      >
        <option value="">Select State</option>
        {NIGERIAN_STATES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <button
        onClick={handleSearch}
        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold shrink-0 transition-colors"
      >
        <Search className="w-4 h-4" />
        Find Artisan
      </button>
    </div>
  )
}
