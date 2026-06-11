import { ArtisanCard } from "./ArtisanCard"
import { EmptyState } from "@/components/shared/EmptyState"
import type { Artisan } from "@/types"

interface ArtisanGridProps {
  artisans: Artisan[]
}

export function ArtisanGrid({ artisans }: ArtisanGridProps) {
  if (artisans.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No artisans found"
        description="Try adjusting your search filters or broadening your location."
        actionLabel="Clear Filters"
        actionHref="/artisans"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {artisans.map((artisan) => (
        <ArtisanCard key={artisan.id} artisan={artisan} />
      ))}
    </div>
  )
}
