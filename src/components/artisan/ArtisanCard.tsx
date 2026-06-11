import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, CheckCircle } from "lucide-react"
import { PLACEHOLDER_AVATAR } from "@/components/shared/NigeriaData"
import type { Artisan } from "@/types"

export function ArtisanCard({ artisan }: { artisan: Artisan }) {
  return (
    <Link href={`/artisans/${artisan.id}`} className="group block">
      <div className="bg-card rounded-2xl border border-border p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col">

        {/* Avatar + meta */}
        <div className="flex items-start gap-3 mb-3">
          <div className="relative shrink-0">
            <Image
              src={artisan.photo_url || PLACEHOLDER_AVATAR(artisan.full_name)}
              alt={artisan.full_name}
              width={48}
              height={48}
              className="rounded-full object-cover w-12 h-12"
            />
            {artisan.is_available && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-card rounded-full" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-foreground truncate text-sm">{artisan.full_name}</p>
              {artisan.is_verified && (
                <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
              )}
            </div>
            <p className="text-xs text-primary font-medium capitalize mt-0.5">
              {artisan.trade.replace(/_/g, " ")}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-0.5 mt-0.5">
              <MapPin className="w-2.5 h-2.5 shrink-0" />
              {artisan.lga ? `${artisan.lga}, ` : ""}{artisan.state}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-foreground">{artisan.rating.toFixed(1)}</span>
            <span>({artisan.total_reviews})</span>
          </span>
          <span className="text-border">·</span>
          <span>{artisan.total_jobs} jobs</span>
          <span className={`ml-auto text-xs font-medium ${artisan.is_available ? "text-emerald-600" : "text-muted-foreground"}`}>
            {artisan.is_available ? "Available" : "Busy"}
          </span>
        </div>

        {/* Bio */}
        {artisan.bio && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed flex-1">
            {artisan.bio}
          </p>
        )}

        {/* Rate */}
        {artisan.min_rate && (
          <p className="text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
            From <span className="font-semibold text-foreground">₦{artisan.min_rate.toLocaleString()}</span>
          </p>
        )}
      </div>
    </Link>
  )
}
