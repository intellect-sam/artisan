import Link from "next/link"
import { ArrowRight, User, Wrench, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#1C1C1C] flex flex-col items-center justify-center px-4 py-16">
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to home
      </Link>

      {/* Logo */}
      <Link href="/" className="mb-12">
        <span className="text-2xl font-bold text-white tracking-tight">
          Artisan<span className="text-primary">Connect</span>
        </span>
      </Link>

      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-3">
          How would you<br />like to join?
        </h1>
        <p className="text-white/45 text-base">
          Choose the account type that fits you best.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {/* Customer Card */}
        <Link href="/auth/register/customer" className="group">
          <div className="bg-white/5 border border-white/10 hover:border-primary/60 hover:bg-primary/5 rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-white/8 group-hover:bg-primary/15 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300">
              <User className="w-8 h-8 text-white/60 group-hover:text-primary transition-colors duration-300" />
            </div>
            <h2 className="text-white font-bold text-xl mb-2">I need services</h2>
            <p className="text-white/45 text-sm leading-relaxed">
              Find and hire skilled artisans for your home or business needs.
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-6 text-primary text-sm font-semibold">
              Join as Customer <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* Artisan Card */}
        <Link href="/auth/register/artisan" className="group">
          <div className="bg-primary/8 border border-primary/20 hover:border-primary hover:bg-primary/12 rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-primary/20 group-hover:bg-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300">
              <Wrench className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-white font-bold text-xl mb-2">I offer services</h2>
            <p className="text-white/45 text-sm leading-relaxed">
              Showcase your skills and grow your client base across Nigeria.
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-6 text-primary text-sm font-semibold">
              Join as Artisan <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>

      <p className="text-white/35 text-sm mt-10">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
