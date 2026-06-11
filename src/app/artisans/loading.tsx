import { ArtisanCardSkeleton } from "@/components/shared/LoadingSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function ArtisansLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header skeleton */}
      <div className="bg-secondary py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-2">
          <Skeleton className="h-8 w-64 bg-white/20" />
          <Skeleton className="h-4 w-48 bg-white/10" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar skeleton */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-5">
              <Skeleton className="h-5 w-24" />
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-9 w-full rounded-lg" />
                <Skeleton className="h-9 w-full rounded-lg" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-10 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          </aside>

          {/* Main grid skeleton */}
          <main className="lg:col-span-3 space-y-4">
            {/* Toolbar skeleton */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-36 rounded-lg" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <ArtisanCardSkeleton key={i} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
