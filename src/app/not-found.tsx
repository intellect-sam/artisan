import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="text-8xl font-bold text-primary mb-4">404</div>
        <h1 className="text-3xl font-bold text-secondary mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          We couldn't find the page you were looking for. It may have been moved or deleted.
        </p>
        <div className="flex gap-3">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90">Go Home</Button>
          </Link>
          <Link href="/artisans">
            <Button variant="outline">Find Artisans</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
