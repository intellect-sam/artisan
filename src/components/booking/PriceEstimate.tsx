import { Sparkles, Info } from "lucide-react"

interface PriceEstimateProps {
  min: number
  max: number
  typical?: number
  label?: string
}

export function PriceEstimate({ min, max, typical, label = "AI Price Estimate" }: PriceEstimateProps) {
  return (
    <div className="flex items-start gap-2 bg-purple-50 border border-purple-100 rounded-lg p-3">
      <Sparkles className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-medium text-purple-700 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-purple-900">
          ₦{min.toLocaleString()} — ₦{max.toLocaleString()}
        </p>
        {typical && (
          <p className="text-xs text-purple-600">
            Typical: ₦{typical.toLocaleString()}
          </p>
        )}
        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
          <Info className="w-3 h-3" />
          Final price set by artisan after reviewing your job
        </p>
      </div>
    </div>
  )
}
