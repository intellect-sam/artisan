import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CheckCircle, MapPin, Star, Clock, Briefcase, MessageSquare, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PortfolioGallery } from "@/components/artisan/PortfolioGallery"
import { ReviewCard } from "@/components/artisan/ReviewCard"
import { RatingBreakdown } from "@/components/artisan/RatingBreakdown"
import { StarRating } from "@/components/shared/StarRating"
import { BookingRequestSidebar } from "@/components/artisan/BookingRequestSidebar"
import { PLACEHOLDER_AVATAR } from "@/components/shared/NigeriaData"
import type { Artisan, Review } from "@/types"

const MOCK_ARTISANS: Record<string, Artisan & { reviews: Review[] }> = {
  "1": {
    id: "1",
    user_id: "u1",
    full_name: "Emeka Okafor",
    trade: "plumber",
    bio: "Professional plumber with 8 years of hands-on experience across residential and commercial properties in Lagos. I specialise in burst pipe repairs, bathroom installations, toilet and sink fitting, boreholes, water tank installation, and full drainage system design. I use quality materials and always clean up after every job. Available for emergencies — call anytime.",
    state: "Lagos",
    lga: "Ikeja",
    rating: 4.8,
    total_reviews: 127,
    total_jobs: 203,
    min_rate: 5000,
    max_rate: 25000,
    is_available: true,
    is_verified: true,
    photo_url: null as unknown as string,
    portfolio: [],
    created_at: "2024-01-01",
    reviews: [
      {
        id: "r1",
        booking_id: "b1",
        customer_id: "c1",
        artisan_id: "1",
        rating: 5,
        comment:
          "Excellent work! Fixed my burst pipe quickly and cleanly. He arrived within 2 hours of my call and had everything sorted in under an hour. Highly recommend.",
        customer_name: "Tunde Adeyemi",
        created_at: "2024-03-15",
      },
      {
        id: "r2",
        booking_id: "b2",
        customer_id: "c2",
        artisan_id: "1",
        rating: 4,
        comment:
          "Good job, arrived a bit late but did quality work. Fixed the drainage issue in my bathroom and replaced a faulty pipe. Fair pricing.",
        customer_name: "Chisom Obi",
        created_at: "2024-03-10",
      },
      {
        id: "r3",
        booking_id: "b3",
        customer_id: "c3",
        artisan_id: "1",
        rating: 5,
        comment:
          "Best plumber I have worked with in Lagos. Installed my entire bathroom fittings — shower, toilet, sink. Very professional and tidy.",
        customer_name: "Adaeze Nwosu",
        created_at: "2024-02-28",
      },
    ],
  },
  "2": {
    id: "2",
    user_id: "u2",
    full_name: "Chidi Nweze",
    trade: "electrician",
    bio: "Licensed electrician. Installations, repairs, wiring for homes and offices.",
    state: "Lagos",
    lga: "Surulere",
    rating: 4.9,
    total_reviews: 89,
    total_jobs: 156,
    min_rate: 8000,
    max_rate: 40000,
    is_available: true,
    is_verified: true,
    photo_url: null as unknown as string,
    portfolio: [],
    created_at: "2024-01-02",
    reviews: [],
  },
}

interface ArtisanProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function ArtisanProfilePage({ params }: ArtisanProfilePageProps) {
  const { id } = await params
  const artisan = MOCK_ARTISANS[id]

  if (!artisan) notFound()

  const tradeName = artisan.trade.replace(/_/g, " ")
  const avatarSrc = artisan.photo_url || PLACEHOLDER_AVATAR(artisan.full_name)

  const statCards = [
    {
      icon: <Star className="w-4 h-4 fill-amber-400 text-amber-400" />,
      value: artisan.rating.toFixed(1),
      label: `${artisan.total_reviews} reviews`,
    },
    {
      icon: <Briefcase className="w-4 h-4 text-primary" />,
      value: artisan.total_jobs,
      label: "jobs completed",
    },
    {
      icon: <MessageSquare className="w-4 h-4 text-secondary" />,
      value: artisan.total_reviews,
      label: "verified reviews",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Back */}
        <Link
          href="/artisans"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to artisans
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Main profile */}
          <div className="lg:col-span-2 space-y-5">
            {/* Profile header card */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Avatar */}
                <div className="relative shrink-0 self-start">
                  <Image
                    src={avatarSrc}
                    alt={artisan.full_name}
                    width={96}
                    height={96}
                    className="rounded-full object-cover w-24 h-24 ring-4 ring-primary/10"
                  />
                  {artisan.is_available ? (
                    <span
                      className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                      title="Available now"
                    />
                  ) : (
                    <span
                      className="absolute bottom-1 right-1 w-4 h-4 bg-gray-400 border-2 border-white rounded-full"
                      title="Currently busy"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {artisan.full_name}
                    </h1>
                    {artisan.is_verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="text-primary font-semibold capitalize text-sm mb-2">
                    {tradeName}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {artisan.lga}, {artisan.state}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {artisan.is_available ? (
                        <span className="text-green-600 font-medium">Available now</span>
                      ) : (
                        <span className="text-gray-400">Currently busy</span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <StarRating rating={artisan.rating} size="md" />
                    <span className="font-semibold text-gray-900 text-sm">
                      {artisan.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({artisan.total_reviews} reviews)
                    </span>
                  </div>

                  {/* Rate range badge */}
                  {artisan.min_rate && (
                    <Badge
                      variant="outline"
                      className="text-xs border-primary/20 text-primary bg-primary/5"
                    >
                      ₦{artisan.min_rate.toLocaleString()} – ₦
                      {artisan.max_rate?.toLocaleString()} per job
                    </Badge>
                  )}
                </div>
              </div>

              {/* Stat row */}
              <Separator className="my-5" />
              <div className="grid grid-cols-3 gap-4">
                {statCards.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="flex justify-center mb-1">{s.icon}</div>
                    <p className="font-bold text-lg text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Book button (mobile) */}
              <div className="mt-5 lg:hidden">
                <Link href={`/dashboard/bookings/new?artisan_id=${artisan.id}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    Book This Artisan
                  </Button>
                </Link>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{artisan.bio}</p>
            </div>

            {/* Portfolio */}
            {artisan.portfolio.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="font-semibold text-gray-900 mb-3">
                  Portfolio ({artisan.portfolio.length})
                </h2>
                <PortfolioGallery items={artisan.portfolio} />
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">
                Reviews ({artisan.total_reviews})
              </h2>

              {artisan.reviews.length > 0 ? (
                <>
                  <RatingBreakdown
                    rating={artisan.rating}
                    totalReviews={artisan.total_reviews}
                    reviews={artisan.reviews}
                  />
                  <div className="space-y-3 mt-4">
                    {artisan.reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-400 text-center py-6">
                  No reviews yet.
                </p>
              )}
            </div>
          </div>

          {/* RIGHT: Booking sidebar (desktop) */}
          <aside className="hidden lg:block lg:col-span-1">
            <BookingRequestSidebar
              artisanId={artisan.id}
              artisanName={artisan.full_name}
              minRate={artisan.min_rate}
              maxRate={artisan.max_rate}
              isAvailable={artisan.is_available}
            />
          </aside>
        </div>
      </div>
    </div>
  )
}
