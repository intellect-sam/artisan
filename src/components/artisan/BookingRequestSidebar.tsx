"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookingRequestSidebarProps {
  artisanId: string
  artisanName: string
  minRate?: number
  maxRate?: number
  isAvailable: boolean
}

export function BookingRequestSidebar({
  artisanId,
  artisanName,
  minRate,
  maxRate,
  isAvailable,
}: BookingRequestSidebarProps) {
  const router = useRouter()
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")

  const today = new Date().toISOString().split("T")[0]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams({
      artisan_id: artisanId,
      ...(date && { scheduled_date: date }),
      ...(description && { description }),
    })
    router.push(`/dashboard/bookings/new?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4 sticky top-6">
      {/* Header */}
      <div>
        <h3 className="font-semibold text-gray-900">Book {artisanName.split(" ")[0]}</h3>
        <p className="text-xs text-gray-400 mt-0.5">Fill in details to start your request</p>
      </div>

      {/* Rate range */}
      {(minRate || maxRate) && (
        <div className="bg-primary/5 border border-primary/10 rounded-lg px-3 py-2.5">
          <p className="text-xs text-gray-500 mb-0.5">Estimated rate range</p>
          <p className="font-semibold text-secondary text-sm">
            {minRate ? `₦${minRate.toLocaleString()}` : ""}
            {minRate && maxRate ? " – " : ""}
            {maxRate ? `₦${maxRate.toLocaleString()}` : ""}
          </p>
        </div>
      )}

      {/* Availability notice */}
      {!isAvailable && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
          <p className="text-xs text-amber-700 font-medium">
            This artisan is currently busy. You can still send a request and they&apos;ll get back to you.
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Preferred Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Preferred Date
          </label>
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
        </div>

        {/* Job Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            Describe the Job
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="E.g. I need my burst pipe fixed in the kitchen, water is leaking under the sink..."
            rows={4}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold gap-2"
        >
          Send Booking Request
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Free to request &mdash; you only pay after confirming with the artisan.
      </p>
    </div>
  )
}
