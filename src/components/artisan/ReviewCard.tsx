import Image from "next/image"
import { StarRating } from "@/components/shared/StarRating"
import { PLACEHOLDER_AVATAR } from "@/components/shared/NigeriaData"
import type { Review } from "@/types"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const date = new Date(review.created_at).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Image
          src={review.customer_avatar || PLACEHOLDER_AVATAR(review.customer_name)}
          alt={review.customer_name}
          width={40}
          height={40}
          className="rounded-full w-10 h-10 object-cover"
        />
        <div>
          <p className="font-medium text-gray-900 text-sm">{review.customer_name}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
        <div className="ml-auto">
          <StarRating rating={review.rating} size="sm" />
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
    </div>
  )
}
