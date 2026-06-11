"use client"

import { useState } from "react"
import { AIButton } from "@/components/shared/AIButton"
import {
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Clock,
} from "lucide-react"

const MOCK_REPORT = {
  strengths: [
    "Excellent response time — you respond to requests within 2 hours",
    "Consistently high ratings from customers",
    "Strong repeat customer rate (35% of jobs are from returning customers)",
  ],
  improvements: [
    "Add more portfolio photos to increase booking rate by 40%",
    "Enable weekend availability — most requests come Saturday/Sunday",
    "Verify your NIN to get the verified badge and boost trust",
  ],
  tips: [
    "Reply to messages quickly — artisans who respond in under 30 mins get 60% more bookings",
    "Offer a small discount to first-time customers to build reviews",
    "Keep your availability status updated daily",
  ],
  best_times: [
    "Saturday 8am - 2pm",
    "Sunday 10am - 4pm",
    "Weekday mornings (8am - 11am)",
  ],
}

interface ReportSectionProps {
  title: string
  items: string[]
  icon: React.ElementType
  colorClasses: {
    card: string
    icon: string
    title: string
    bullet: string
    dot: string
  }
}

function ReportSection({
  title,
  items,
  icon: Icon,
  colorClasses,
}: ReportSectionProps) {
  return (
    <div className={`rounded-xl border p-5 ${colorClasses.card}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClasses.dot}`}>
          <Icon className={`w-4 h-4 ${colorClasses.icon}`} />
        </div>
        <h3 className={`font-semibold text-base ${colorClasses.title}`}>
          {title}
        </h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Icon
              className={`w-4 h-4 mt-0.5 shrink-0 ${colorClasses.bullet}`}
            />
            <span className={`text-sm leading-relaxed ${colorClasses.title}`}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PerformancePage() {
  const [reportVisible, setReportVisible] = useState(false)

  const handleGenerateReport = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setReportVisible(true)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Performance Report
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            AI-powered insights to help you grow your business
          </p>
        </div>
        <AIButton
          label="Generate AI Report"
          loadingLabel="Analysing your data..."
          onClick={handleGenerateReport}
        />
      </div>

      {!reportVisible ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-5">
            <svg
              className="w-9 h-9 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No report generated yet
          </h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Click &quot;Generate AI Report&quot; above to get personalised insights based
            on your jobs, ratings, and activity.
          </p>
        </div>
      ) : (
        /* Report cards */
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Summary banner */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-5 text-white mb-6">
            <p className="text-xs uppercase tracking-wider text-purple-200 mb-1">
              AI Performance Summary
            </p>
            <p className="font-semibold text-lg">
              Your performance is strong! Focus on portfolio and availability
              to unlock more bookings.
            </p>
          </div>

          <ReportSection
            title="Your Strengths"
            items={MOCK_REPORT.strengths}
            icon={CheckCircle}
            colorClasses={{
              card: "bg-green-50 border-green-200",
              icon: "text-green-600",
              title: "text-green-900",
              bullet: "text-green-500",
              dot: "bg-green-100",
            }}
          />

          <ReportSection
            title="Areas to Improve"
            items={MOCK_REPORT.improvements}
            icon={AlertCircle}
            colorClasses={{
              card: "bg-amber-50 border-amber-200",
              icon: "text-amber-600",
              title: "text-amber-900",
              bullet: "text-amber-500",
              dot: "bg-amber-100",
            }}
          />

          <ReportSection
            title="Booking Tips"
            items={MOCK_REPORT.tips}
            icon={Lightbulb}
            colorClasses={{
              card: "bg-blue-50 border-blue-200",
              icon: "text-blue-600",
              title: "text-blue-900",
              bullet: "text-blue-500",
              dot: "bg-blue-100",
            }}
          />

          <ReportSection
            title="Best Times to Be Available"
            items={MOCK_REPORT.best_times}
            icon={Clock}
            colorClasses={{
              card: "bg-purple-50 border-purple-200",
              icon: "text-purple-600",
              title: "text-purple-900",
              bullet: "text-purple-500",
              dot: "bg-purple-100",
            }}
          />

          <p className="text-xs text-gray-400 text-center pt-2">
            Report generated based on your last 30 days of activity
          </p>
        </div>
      )}
    </div>
  )
}
