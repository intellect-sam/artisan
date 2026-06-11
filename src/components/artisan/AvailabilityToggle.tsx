"use client"

import { useState } from "react"
import { toast } from "sonner"

export function AvailabilityToggle() {
  const [available, setAvailable] = useState(true)

  const handleToggle = () => {
    const next = !available
    setAvailable(next)
    toast(next ? "You are now available for jobs" : "You are now unavailable for jobs")
  }

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-border bg-card hover:bg-muted transition-colors text-sm font-medium"
    >
      <span
        className={`w-2 h-2 rounded-full transition-colors ${available ? "bg-emerald-500" : "bg-muted-foreground/40"}`}
      />
      <span className={available ? "text-foreground" : "text-muted-foreground"}>
        {available ? "Available" : "Unavailable"}
      </span>
      <span
        className={`inline-flex w-8 h-4 rounded-full transition-colors relative ${
          available ? "bg-emerald-500" : "bg-muted-foreground/30"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${
            available ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  )
}
