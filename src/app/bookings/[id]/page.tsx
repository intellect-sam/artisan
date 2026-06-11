import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Phone, BadgeCheck, AlertTriangle } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { BookingTimeline } from "@/components/booking/BookingTimeline"
import { MessageThread } from "@/components/booking/MessageThread"
import { StatusBadge } from "@/components/booking/StatusBadge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { BookingStatus, PaymentStatus } from "@/types"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_BOOKING = {
  id: "b1",
  customer_id: "c1",
  artisan_id: "a1",
  job_title: "Fix Kitchen Pipe Leak",
  description:
    "Water pipe under kitchen sink is leaking badly. Water is dripping onto cabinet floor causing damage.",
  trade: "plumber",
  address: "12 Adeyemi Street, Ikeja",
  state: "Lagos",
  scheduled_date: "2024-12-20",
  status: "active" as BookingStatus,
  price: 12000,
  payment_status: "unpaid" as PaymentStatus,
  has_review: false,
  created_at: "2024-12-15",
  artisan: {
    id: "a1",
    full_name: "Emeka Okafor",
    trade: "plumber",
    photo_url: null as string | null,
    phone: "+2348012345678",
    rating: 4.8,
    is_verified: true,
  },
  customer: {
    id: "c1",
    full_name: "Kemi Adebayo",
    avatar_url: null as string | null,
    phone: "+2348098765432",
  },
}

const MOCK_MESSAGES = [
  {
    id: "m1",
    booking_id: "b1",
    sender_id: "c1",
    sender_role: "customer" as const,
    content:
      "Hello! I have a kitchen pipe that's been leaking for 2 days. Can you come tomorrow morning?",
    created_at: "2024-12-15T10:00:00",
  },
  {
    id: "m2",
    booking_id: "b1",
    sender_id: "a1",
    sender_role: "artisan" as const,
    content:
      "Good day! Yes, I can come tomorrow at 9am. I'll bring all needed tools and parts. My price will be ₦12,000.",
    created_at: "2024-12-15T10:30:00",
  },
  {
    id: "m3",
    booking_id: "b1",
    sender_id: "c1",
    sender_role: "customer" as const,
    content: "That works! See you at 9am tomorrow.",
    created_at: "2024-12-15T10:35:00",
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // In production you'd fetch by id — here we always return the mock
  const booking = { ...MOCK_BOOKING, id }
  const messages = MOCK_MESSAGES

  const { artisan, customer, status } = booking

  const artisanInitials = artisan.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(booking.price)

  const formattedDate = new Date(booking.scheduled_date).toLocaleDateString(
    "en-NG",
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }
  )

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back link */}
          <Link
            href="/dashboard/bookings"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            My Bookings
          </Link>

          {/* Page title */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{booking.job_title}</h1>
              <p className="text-sm text-gray-500 mt-1">Booking #{booking.id}</p>
            </div>
            <StatusBadge status={status} />
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ── LEFT COLUMN (2/3) ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Job details card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
                <h2 className="font-semibold text-gray-900 text-lg">Job Details</h2>

                <p className="text-gray-600 text-sm leading-relaxed">{booking.description}</p>

                <div className="flex flex-wrap gap-3 pt-1">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 capitalize">
                    {booking.trade}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>{booking.address}, {booking.state}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>

              {/* Booking timeline */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900 text-lg mb-4">Job Progress</h2>
                <BookingTimeline status={status} createdAt={booking.created_at} />
              </div>

              {/* Message thread */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900 text-lg">Messages</h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Chat with {artisan.full_name}
                  </p>
                </div>
                <MessageThread
                  initialMessages={messages}
                  currentUserId={customer.id}
                />
              </div>
            </div>

            {/* ── RIGHT COLUMN (1/3) ── */}
            <div className="space-y-4">

              {/* Artisan card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Your Artisan</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {artisanInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-gray-900 text-sm">
                        {artisan.full_name}
                      </p>
                      {artisan.is_verified && (
                        <BadgeCheck className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 capitalize">{artisan.trade}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Rating</span>
                    <span className="font-medium text-amber-500">
                      ★ {artisan.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Phone</span>
                    <a
                      href={`tel:${artisan.phone}`}
                      className="font-medium text-primary hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      {artisan.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Payment card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Payment</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Amount</span>
                    <span className="font-bold text-gray-900 text-lg">{formattedPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <Badge
                      variant="outline"
                      className={
                        booking.payment_status === "paid"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : booking.payment_status === "released"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }
                    >
                      {booking.payment_status === "unpaid"
                        ? "Unpaid"
                        : booking.payment_status === "paid"
                        ? "Paid (in escrow)"
                        : "Released"}
                    </Badge>
                  </div>

                  {status === "completed" && (
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-2">
                      Release Payment
                    </Button>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                {status === "completed" && !booking.has_review && (
                  <Link href={`/bookings/${booking.id}/review`} className="block">
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary/5"
                    >
                      ⭐ Leave a Review
                    </Button>
                  </Link>
                )}

                {/* Raise a Dispute dialog */}
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button
                        variant="outline"
                        className="w-full border-red-200 text-red-600 hover:bg-red-50"
                      />
                    }
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Raise a Dispute
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Raise a Dispute</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 py-2">
                      <p className="text-sm text-gray-600">
                        If you&apos;re having an issue with this booking, our support team
                        will investigate within 48 hours.
                      </p>
                      <textarea
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                        rows={4}
                        placeholder="Describe the issue in detail..."
                      />
                    </div>
                    <DialogFooter showCloseButton>
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        Submit Dispute
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
