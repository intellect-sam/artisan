"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Calendar, User } from "lucide-react"

interface JobRequest {
  id: string
  job_title: string
  customer: { full_name: string }
  address: string
  state: string
  scheduled_date: string
  status: string
  trade: string
  description: string
}

interface JobRequestCardProps {
  job: JobRequest
  onAccept?: (id: string, price: number) => void
  onDecline?: (id: string) => void
}

export function JobRequestCard({ job, onAccept, onDecline }: JobRequestCardProps) {
  const [price, setPrice] = useState("")
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const handleAccept = () => {
    const numPrice = parseFloat(price)
    if (!price || isNaN(numPrice) || numPrice <= 0) {
      toast.error("Please enter a valid price before accepting")
      return
    }
    toast.success("Job accepted!")
    onAccept?.(job.id, numPrice)
    setDismissed(true)
  }

  const handleDecline = () => {
    toast("Job declined")
    onDecline?.(job.id)
    setDismissed(true)
  }

  const formattedDate = new Date(job.scheduled_date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base">{job.job_title}</h3>
          <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{job.description}</p>
        </div>
        <Badge className="bg-amber-100 text-amber-700 border-amber-200 shrink-0 capitalize">
          {job.trade}
        </Badge>
      </div>

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-3.5 h-3.5 text-gray-400" />
          <span>{job.customer.full_name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-3.5 h-3.5 text-gray-400" />
          <span>{job.address}, {job.state}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* AI Price Estimate */}
      <div className="bg-purple-50 border border-purple-100 rounded-lg px-3 py-2 mb-4">
        <p className="text-xs text-purple-600 font-medium">
          AI Estimate: Typical: ₦8,000 — ₦20,000
        </p>
      </div>

      {/* Price input */}
      <div className="mb-4">
        <Label htmlFor={`price-${job.id}`} className="text-sm text-gray-700 mb-1.5 block">
          Set your price (₦)
        </Label>
        <Input
          id={`price-${job.id}`}
          type="number"
          placeholder="e.g. 15000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="h-9"
        />
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleAccept}
          className="flex-1 bg-primary hover:bg-primary/90 text-white h-9 text-sm"
        >
          Accept Job
        </Button>
        <Button
          onClick={handleDecline}
          variant="outline"
          className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 h-9 text-sm"
        >
          Decline
        </Button>
      </div>
    </div>
  )
}
