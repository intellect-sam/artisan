import apiClient from "@/lib/axios"
import type { Review } from "@/types"

export interface SubmitReviewPayload {
  booking_id: string
  rating: number
  comment: string
}

export const reviewsApi = {
  submit: (payload: SubmitReviewPayload) =>
    apiClient.post<Review>("/reviews", payload).then((r) => r.data),

  getArtisanReviews: (artisanId: string) =>
    apiClient.get<Review[]>(`/reviews/artisan/${artisanId}`).then((r) => r.data),
}
