import { ArtisanBottomNav } from "@/components/layout/ArtisanBottomNav"

export default function ArtisanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-lg mx-auto pb-28">
        {children}
      </main>
      <ArtisanBottomNav />
    </div>
  )
}
