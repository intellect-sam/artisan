import Link from "next/link"
import { Wrench, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl">
                Artisan<span className="text-primary">Connect</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Connecting Nigerians with trusted skilled artisans. Fast, reliable, and affordable.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors text-xs font-bold">
                f
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors text-xs font-bold">
                𝕏
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors text-xs font-bold">
                ig
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/artisans" className="hover:text-primary transition-colors">Find Artisan</Link></li>
              <li><Link href="/auth/register/artisan" className="hover:text-primary transition-colors">Become an Artisan</Link></li>
              <li><Link href="/auth/login" className="hover:text-primary transition-colors">Login</Link></li>
              <li><Link href="/auth/register/customer" className="hover:text-primary transition-colors">Sign Up</Link></li>
              <li><Link href="/support" className="hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Popular Trades</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/artisans?trade=plumber" className="hover:text-primary transition-colors">Plumbers</Link></li>
              <li><Link href="/artisans?trade=electrician" className="hover:text-primary transition-colors">Electricians</Link></li>
              <li><Link href="/artisans?trade=carpenter" className="hover:text-primary transition-colors">Carpenters</Link></li>
              <li><Link href="/artisans?trade=tailor" className="hover:text-primary transition-colors">Tailors</Link></li>
              <li><Link href="/artisans?trade=ac_technician" className="hover:text-primary transition-colors">AC Technicians</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+234 800 ARTISAN</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>hello@artisanconnect.ng</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm gap-4">
          <p>© {new Date().getFullYear()} ArtisanConnect. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
