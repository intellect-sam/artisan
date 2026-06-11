import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { GoogleAuthProvider } from "@/components/layout/GoogleAuthProvider"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "ArtisanConnect — Find Skilled Artisans Near You",
  description:
    "Connect with trusted plumbers, electricians, carpenters, tailors, and more skilled artisans across Nigeria.",
  keywords: "artisan, Nigeria, plumber, electrician, carpenter, handyman, skilled workers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <GoogleAuthProvider>
          {children}
        </GoogleAuthProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
