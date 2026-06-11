import { CustomerSidebar } from "@/components/layout/CustomerSidebar"

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-lg mx-auto pb-28">
        {children}
      </main>
      <CustomerSidebar />
    </div>
  )
}
