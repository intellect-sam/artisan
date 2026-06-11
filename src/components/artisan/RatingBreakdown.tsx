import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"
import type { Review } from "@/types"

interface RatingBreakdownProps {
  rating: number
  totalReviews: number
  reviews: Review[]
}

export function RatingBreakdown({ rating, totalReviews, reviews }: RatingBreakdownProps) {
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: totalReviews > 0
      ? Math.round((reviews.filter((r) => r.rating === star).length / totalReviews) * 100)
      : 0,
  }))

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center gap-6 mb-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-secondary">{rating.toFixed(1)}</p>
          <div className="flex justify-center mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-1">{totalReviews} reviews</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {counts.map(({ star, count, pct }) => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-3">{star}</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <Progress value={pct} className="flex-1 h-1.5" />
              <span className="text-xs text-gray-400 w-5">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
