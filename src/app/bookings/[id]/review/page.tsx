"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { StarRating } from "@/components/shared/StarRating"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock artisan data for the booking
const MOCK_ARTISAN = {
  full_name: "Emeka Okafor",
  trade: "Plumber",
  photo_url: null as string | null,
}

export default function ReviewPage() {
  const params = useParams()
  const id = params.id as string

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const artisan = MOCK_ARTISAN

  const artisanInitials = artisan.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a star rating before submitting.")
      return
    }

    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
    setSubmitted(true)
    toast.success("Review submitted successfully!")
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-md w-full text-center space-y-5">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Review Submitted!</h2>
            <p className="text-gray-500 text-sm">
              Thank you for your feedback. It helps other customers find great artisans.
            </p>
            <Link href="/dashboard/bookings">
              <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                Back to Bookings
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
          {/* Back link */}
          <Link
            href={`/bookings/${id}`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Booking
          </Link>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-orange-50 px-6 py-8 text-center border-b border-gray-100">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Leave a Review
              </h1>
              <p className="text-sm text-gray-500">
                for <span className="font-semibold text-gray-700">{artisan.full_name}</span>
              </p>
            </div>

            <div className="p-6 space-y-8">
              {/* Artisan info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <Avatar className="w-14 h-14">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                    {artisanInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">{artisan.full_name}</p>
                  <Badge
                    variant="outline"
                    className="mt-1 bg-primary/10 text-primary border-primary/20 capitalize text-xs"
                  >
                    {artisan.trade}
                  </Badge>
                </div>
              </div>

              {/* Star rating */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  How would you rate this artisan?
                </label>
                <div className="flex items-center gap-2">
                  <StarRating
                    rating={rating}
                    size="lg"
                    interactive={true}
                    onRate={setRating}
                  />
                  {rating > 0 && (
                    <span className="text-sm text-gray-500 ml-2">
                      {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
                    </span>
                  )}
                </div>
                {rating === 0 && (
                  <p className="text-xs text-gray-400">Click the stars to rate</p>
                )}
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Share your experience
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder="Share your experience... Was the artisan punctual? Was the work done well? Would you recommend them?"
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />
                <p className="text-xs text-gray-400 text-right">{comment.length}/500</p>
              </div>

              {/* Submit button */}
              <Button
                onClick={handleSubmit}
                disabled={loading || rating === 0}
                className="w-full bg-primary hover:bg-primary/90 text-white h-11 text-base"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
