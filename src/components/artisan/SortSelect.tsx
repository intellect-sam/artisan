"use client"

import { useRouter, useSearchParams } from "next/navigation"

const SORT_OPTIONS = [
  { value: "rating",    label: "Top Rated"  },
  { value: "newest",    label: "Newest"     },
  { value: "most_jobs", label: "Most Jobs"  },
]

export function SortSelect({ currentSort }: { currentSort?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    e.target.value ? params.set("sort", e.target.value) : params.delete("sort")
    router.push(`/artisans?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground shrink-0">Sort by</span>
      <select
        defaultValue={currentSort ?? "rating"}
        onChange={handleChange}
        className="text-sm border border-border rounded-xl px-3 py-1.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
      >
        {SORT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
