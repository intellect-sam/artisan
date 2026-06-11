import { Check, Clock, XCircle } from "lucide-react"
import type { BookingStatus } from "@/types"

const STEPS = [
  { key: "pending", label: "Request Sent", desc: "Waiting for artisan to accept" },
  { key: "active", label: "Accepted & Active", desc: "Job is in progress" },
  { key: "completed", label: "Completed", desc: "Job finished successfully" },
]

interface BookingTimelineProps {
  status: BookingStatus
  createdAt: string
}

export function BookingTimeline({ status, createdAt }: BookingTimelineProps) {
  const stepIndex = status === "cancelled" || status === "disputed"
    ? -1
    : STEPS.findIndex((s) => s.key === status)

  const isCancelled = status === "cancelled"
  const isDisputed = status === "disputed"

  return (
    <div className="space-y-2">
      {(isCancelled || isDisputed) && (
        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
          <XCircle className="w-5 h-5 text-red-500 shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-800">
              {isCancelled ? "Booking Cancelled" : "Dispute Raised"}
            </p>
            <p className="text-xs text-red-600">
              {isCancelled ? "This booking was cancelled." : "A dispute has been raised for this job."}
            </p>
          </div>
        </div>
      )}

      {STEPS.map((step, i) => {
        const done = i <= stepIndex
        const current = i === stepIndex
        return (
          <div key={step.key} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  done ? "bg-primary" : current ? "bg-primary/20 border-2 border-primary" : "bg-gray-100"
                }`}
              >
                {done ? (
                  <Check className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Clock className={`w-3.5 h-3.5 ${current ? "text-primary" : "text-gray-400"}`} />
                )}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-0.5 h-6 mt-0.5 ${done && i < stepIndex ? "bg-primary" : "bg-gray-200"}`} />
              )}
            </div>
            <div className="pb-4">
              <p className={`text-sm font-medium ${done ? "text-gray-900" : "text-gray-400"}`}>
                {step.label}
              </p>
              <p className="text-xs text-gray-400">{step.desc}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
