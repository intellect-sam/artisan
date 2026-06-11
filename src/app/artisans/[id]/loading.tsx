import { ProfileSkeleton } from "@/components/shared/LoadingSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function ArtisanProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Back link skeleton */}
        <Skeleton className="h-4 w-36" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Profile header card */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
              <ProfileSkeleton />
            </div>

            {/* About section skeleton */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Reviews skeleton */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
              <Skeleton className="h-5 w-32" />
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-6">
                  <div className="text-center space-y-2">
                    <Skeleton className="h-10 w-16 mx-auto" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </div>
                  <div className="flex-1 space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-3 w-3" />
                        <Skeleton className="h-1.5 flex-1" />
                        <Skeleton className="h-3 w-5" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar skeleton */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4 sticky top-6">
              <div className="space-y-1">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-14 w-full rounded-lg" />
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
