import Link from "next/link"
import Image from "next/image"
import { CalendarDays, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./StatusBadge"
import { PLACEHOLDER_AVATAR } from "@/components/shared/NigeriaData"
import type { Booking } from "@/types"

interface BookingCardProps {
  booking: Booking
  viewAs?: "customer" | "artisan"
}

export function BookingCard({ booking, viewAs = "customer" }: BookingCardProps) {
  const person = viewAs === "customer" ? booking.artisan : booking.customer
  const personName = viewAs === "customer"
    ? booking.artisan?.full_name || "Artisan"
    : booking.customer?.full_name || "Customer"

  const photo = viewAs === "customer"
    ? booking.artisan?.photo_url
    : booking.customer?.avatar_url

  const date = new Date(booking.scheduled_date).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{booking.job_title}</h4>
          <p className="text-xs text-gray-400 mt-0.5">#{booking.id.slice(-8).toUpperCase()}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="flex items-center gap-3 mb-3">
        <Image
          src={photo || PLACEHOLDER_AVATAR(personName)}
          alt={personName}
          width={32}
          height={32}
          className="rounded-full w-8 h-8 object-cover"
        />
        <span className="text-sm text-gray-700">{personName}</span>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <CalendarDays className="w-3 h-3" />
          {date}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {booking.state}
        </span>
        {booking.price && (
          <span className="font-semibold text-secondary ml-auto">
            ₦{booking.price.toLocaleString()}
          </span>
        )}
      </div>

      <div className="flex gap-2 justify-end">
        <Link href={`/bookings/${booking.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
        {booking.status === "completed" && !booking.has_review && viewAs === "customer" && (
          <Link href={`/bookings/${booking.id}/review`}>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Leave Review
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
