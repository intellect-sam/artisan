"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HomeSearchBar } from "@/components/home/HomeSearchBar"
import {
  Star, ArrowRight, CheckCircle, Shield,
  Clock, MapPin, Zap, Lock,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ── Data ─────────────────────────────────────────────────────────────────────

const TRADES = [
  { value: "plumber",            label: "Plumber",            icon: "🔧" },
  { value: "electrician",        label: "Electrician",        icon: "⚡" },
  { value: "carpenter",          label: "Carpenter",          icon: "🪚" },
  { value: "tailor",             label: "Tailor",             icon: "🧵" },
  { value: "ac_technician",      label: "AC Technician",      icon: "❄️" },
  { value: "painter",            label: "Painter",            icon: "🎨" },
  { value: "welder",             label: "Welder",             icon: "🔥" },
  { value: "phone_repairer",     label: "Phone Repairer",     icon: "📱" },
  { value: "generator_mechanic", label: "Generator Mechanic", icon: "⚙️" },
  { value: "tiler",              label: "Tiler",              icon: "🏠" },
]

const FEATURED_ARTISANS = [
  {
    name: "Emeka Okafor",
    trade: "Master Carpenter",
    location: "Ikeja, Lagos",
    rating: 4.9,
    jobs: 312,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=500&q=80",
    badge: "Top Rated",
    badgeColor: "bg-primary text-white",
  },
  {
    name: "Chidi Nweze",
    trade: "Electrical Engineer",
    location: "Surulere, Lagos",
    rating: 4.8,
    jobs: 198,
    photo: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=400&h=500&q=80",
    badge: "Verified",
    badgeColor: "bg-emerald-500 text-white",
  },
  {
    name: "Ngozi Adaeze",
    trade: "Fashion Designer",
    location: "Lagos Island",
    rating: 5.0,
    jobs: 427,
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=500&q=80",
    badge: "Top Rated",
    badgeColor: "bg-primary text-white",
  },
]

const TESTIMONIALS = [
  {
    quote: "I needed a plumber urgently and found one within 30 minutes. Professional, fast, and fair pricing. ArtisanConnect changed how I handle home repairs.",
    name: "Adaeze Okonkwo",
    role: "Homeowner, Lagos",
    initials: "AO",
  },
  {
    quote: "As a property manager, ArtisanConnect is indispensable. The quality and reliability is consistently excellent. My absolute go-to platform.",
    name: "Chukwuemeka Eze",
    role: "Property Manager, Abuja",
    initials: "CE",
  },
  {
    quote: "Got my AC serviced and native attire made. Both artisans were verified, punctual, and exceptional at their craft. Highly recommended.",
    name: "Fatima Abubakar",
    role: "Business Owner, Kano",
    initials: "FA",
  },
]

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView] as const
}

function useCounter(end: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf: number
    const startTime = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * end)
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setCount(end)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, end, duration])

  return count
}

// ── Shared components ─────────────────────────────────────────────────────────

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-primary text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
      {children}
    </span>
  )
}

function StatCounter({
  value,
  suffix,
  label,
  inView,
}: {
  value: number
  suffix: string
  label: string
  inView: boolean
}) {
  const count = useCounter(value, inView)
  const isDecimal = value % 1 !== 0
  const display = isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString()

  return (
    <div className="text-center px-8 py-6">
      <p className="text-4xl md:text-5xl font-bold text-foreground tabular-nums" style={{ letterSpacing: "-0.03em" }}>
        {display}{suffix}
      </p>
      <p className="text-muted-foreground text-sm mt-2">{label}</p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [statsRef, statsInView] = useInView(0.3)

  return (
    <>
      <Navbar transparent />
      <main className="overflow-x-hidden">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center" style={{ backgroundColor: "#110b05" }}>
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80"
            alt=""
            fill
            className="object-cover object-center opacity-[0.12]"
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #110b05 50%, #110b05cc 100%)" }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-24">
            <div className="grid lg:grid-cols-[1fr_auto] gap-20 items-center">

              {/* Left copy */}
              <div className="max-w-2xl">
                <div
                  className="inline-flex items-center gap-2 border border-white/10 text-white/50 rounded-full px-4 py-1.5 text-[0.7rem] font-medium mb-10 tracking-[0.12em] uppercase"
                  style={{ animation: "fade-up 0.6s ease both" }}
                >
                  Nigeria&apos;s trusted artisan marketplace
                </div>

                <h1
                  className="text-white font-bold leading-[1.08] mb-7"
                  style={{
                    fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
                    letterSpacing: "-0.025em",
                    animation: "fade-up 0.7s ease both 0.08s",
                  }}
                >
                  Skilled hands,<br />
                  <span className="text-primary">right where you are.</span>
                </h1>

                <p
                  className="text-white/40 text-base leading-relaxed mb-10 max-w-lg"
                  style={{ animation: "fade-up 0.7s ease both 0.16s" }}
                >
                  Verified craftspeople across Nigeria — plumbers, electricians, carpenters,
                  tailors, and more. Background-checked. Rated. Ready.
                </p>

                <div style={{ animation: "fade-up 0.7s ease both 0.24s" }}>
                  <HomeSearchBar dark />
                </div>

                <div
                  className="flex items-center gap-5 mt-10"
                  style={{ animation: "fade-up 0.7s ease both 0.32s" }}
                >
                  <div className="flex -space-x-2.5">
                    {[
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&h=50&q=80",
                      "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=50&h=50&q=80",
                      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=50&h=50&q=80",
                    ].map((src, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 overflow-hidden shrink-0" style={{ borderColor: "#110b05" }}>
                        <Image src={src} alt="" width={32} height={32} className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-white/35 text-xs">Trusted by 15,000+ Nigerians</p>
                  </div>
                </div>
              </div>

              {/* Right — photo mosaic */}
              <div
                className="hidden xl:grid grid-cols-2 gap-3 w-72"
                style={{ animation: "fade-up 0.9s ease both 0.2s" }}
              >
                {[
                  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&h=360&q=80",
                  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=300&h=240&q=80",
                  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=240&q=80",
                  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=300&h=360&q=80",
                ].map((src, i) => (
                  <div
                    key={i}
                    className={cn(
                      "relative overflow-hidden rounded-2xl",
                      i === 0 || i === 3 ? "row-span-2 h-70" : "h-33"
                    )}
                  >
                    <Image src={src} alt="" fill sizes="144px" className="object-cover" />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                ))}

                {/* Verified chip */}
                <div className="col-span-2 bg-white/8 backdrop-blur-xl border border-white/12 rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">2,400+ Verified Artisans</p>
                    <p className="text-white/40 text-[0.65rem] mt-0.5">All background-checked</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <Clock className="w-3 h-3 text-primary" />
                    <span className="text-white/40 text-[0.65rem]">Avg. 30 min reply</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ─────────────────────────────────────────────────────────── */}
        <section className="bg-background border-b border-border">
          <div
            ref={statsRef}
            className="max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch divide-y sm:divide-y-0 sm:divide-x divide-border"
          >
            <StatCounter value={2400}  suffix="+"  label="Verified artisans"  inView={statsInView} />
            <StatCounter value={18}    suffix=""   label="States covered"     inView={statsInView} />
            <StatCounter value={15000} suffix="+"  label="Jobs completed"     inView={statsInView} />
            <StatCounter value={4.9}   suffix="★"  label="Average rating"     inView={statsInView} />
          </div>
        </section>

        {/* ── WHY ARTISANCONNECT ─────────────────────────────────────────────── */}
        <section className="py-28 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-16">
              <SectionLabel>Why ArtisanConnect</SectionLabel>
              <h2
                className="text-foreground font-bold mt-4"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
              >
                Built for Nigeria.<br />Built for trust.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: <Shield className="w-5 h-5 text-primary" />,
                  title: "Verified Artisans",
                  desc: "Every artisan passes identity and skill verification before joining our platform.",
                },
                {
                  icon: <Zap className="w-5 h-5 text-primary" />,
                  title: "Fast Response",
                  desc: "Artisans respond within 30 minutes on average — no more waiting.",
                },
                {
                  icon: <Lock className="w-5 h-5 text-primary" />,
                  title: "Secure Payments",
                  desc: "Pay only when the job is done. 100% safe escrow on every transaction.",
                },
                {
                  icon: <MapPin className="w-5 h-5 text-primary" />,
                  title: "18 States",
                  desc: "Covering major cities and towns across Nigeria, with more coming soon.",
                },
              ].map(({ icon, title, desc }, i) => (
                <Reveal key={title} delay={i * 70}>
                  <div className="p-7 rounded-2xl border border-border bg-card hover:shadow-md transition-all duration-300 h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      {icon}
                    </div>
                    <h3 className="font-semibold text-foreground text-[0.95rem] mb-2">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
        <section className="py-28 px-4 bg-muted">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-20 text-center">
              <SectionLabel>Simple Process</SectionLabel>
              <h2
                className="text-foreground font-bold mt-4"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
              >
                How it works
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 relative">
              {/* connector line */}
              <div className="hidden md:block absolute top-12 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px bg-border" />

              {[
                {
                  num: "01",
                  title: "Post Your Job",
                  desc: "Describe what you need. Our platform automatically identifies the right trade and formats your request.",
                },
                {
                  num: "02",
                  title: "Get Matched",
                  desc: "Browse top-rated verified artisans near you. View profiles, ratings, and completed job history.",
                },
                {
                  num: "03",
                  title: "Pay When Satisfied",
                  desc: "Your artisan completes the job. Release payment only when you're fully satisfied with the result.",
                },
              ].map(({ num, title, desc }, i) => (
                <Reveal key={num} delay={i * 100}>
                  <div className="text-center md:text-left">
                    <div className="inline-flex w-10 h-10 rounded-xl bg-primary/12 text-primary text-sm font-bold items-center justify-center mb-7">
                      {num}
                    </div>
                    <h3 className="font-semibold text-foreground text-[0.95rem] mb-3">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED ARTISANS ─────────────────────────────────────────────── */}
        <section className="py-28 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <Reveal className="flex items-end justify-between mb-14">
              <div>
                <SectionLabel>Top Craftspeople</SectionLabel>
                <h2
                  className="font-bold text-foreground mt-4"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
                >
                  Meet the hands<br />behind the work.
                </h2>
              </div>
              <Link
                href="/artisans"
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all duration-200"
              >
                Browse all <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {FEATURED_ARTISANS.map((a, i) => (
                <Reveal key={a.name} delay={i * 80}>
                  <Link href="/artisans" className="group block">
                    <div className="rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 ease-out">
                      <div className="relative h-72 bg-muted">
                        <Image
                          src={a.photo}
                          alt={a.name}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className={cn("text-[0.7rem] font-medium px-2.5 py-1 rounded-full", a.badgeColor)}>
                            {a.badge}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-semibold leading-tight">{a.name}</p>
                          <p className="text-white/60 text-sm">{a.trade}</p>
                        </div>
                      </div>
                      <div className="px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium text-foreground">{a.rating}</span>
                          <span className="text-muted-foreground text-sm">· {a.jobs} jobs</span>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {a.location}
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link href="/artisans" className="text-sm font-medium text-primary flex items-center justify-center gap-1">
                Browse all artisans <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── BROWSE BY TRADE ───────────────────────────────────────────────── */}
        <section className="py-28 px-4 bg-muted">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-12">
              <SectionLabel>All Trades</SectionLabel>
              <h2
                className="text-foreground font-bold mt-4"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
              >
                What do you need?
              </h2>
            </Reveal>

            <div className="flex flex-wrap gap-2.5">
              {TRADES.map((t, i) => (
                <Reveal key={t.value} delay={i * 25}>
                  <Link href={`/artisans?trade=${t.value}`}>
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card hover:bg-primary hover:border-primary hover:text-white px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 cursor-pointer group">
                      <span className="text-base leading-none">{t.icon}</span>
                      <span>{t.label}</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
              <Reveal delay={TRADES.length * 25}>
                <Link href="/artisans">
                  <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200 cursor-pointer">
                    View all trades <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
        <section className="py-28 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-14">
              <SectionLabel>Customer Stories</SectionLabel>
              <h2
                className="font-bold text-foreground mt-4"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
              >
                What Nigerians say.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 80}>
                  <div className="bg-card border border-border rounded-2xl p-7 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
                    <div className="flex gap-0.5 mb-5">
                      {[1,2,3,4,5].map(j => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-foreground/70 text-sm leading-relaxed flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-7 pt-5 border-t border-border">
                      <div className="w-9 h-9 bg-primary/12 text-primary text-xs font-semibold rounded-full flex items-center justify-center shrink-0">
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{t.name}</p>
                        <p className="text-muted-foreground text-xs">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOIN AS ARTISAN ────────────────────────────────────────────────── */}
        <section className="overflow-hidden" style={{ backgroundColor: "#110b05" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-150">

              {/* Text */}
              <Reveal className="flex flex-col justify-center py-24 lg:pr-16">
                <SectionLabel>For Artisans</SectionLabel>
                <h2
                  className="text-white font-bold mt-5 mb-6"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
                >
                  Grow your craft.<br />
                  <span className="text-primary">Grow your income.</span>
                </h2>
                <p className="text-white/45 leading-relaxed mb-9 max-w-md text-sm">
                  Join thousands of skilled Nigerians who have turned their trade into a thriving business.
                  Get more clients, manage jobs from your phone, and get paid securely.
                </p>
                <ul className="space-y-3.5 mb-10">
                  {[
                    "Free profile — get discovered by thousands",
                    "AI-powered bio writing for your skills",
                    "Secure escrow payments, released when done",
                    "Performance insights to grow your bookings",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-white/55">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/auth/register/artisan"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-7 py-3.5 rounded-xl transition-colors text-sm"
                  >
                    Join as Artisan <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/artisans"
                    className="inline-flex items-center gap-2 border border-white/12 hover:border-white/25 text-white/70 hover:text-white font-medium px-7 py-3.5 rounded-xl transition-colors text-sm"
                  >
                    View Profiles
                  </Link>
                </div>
              </Reveal>

              {/* Photo */}
              <div className="relative hidden lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                  alt="Artisan at work"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #110b05, #110b0544, transparent)" }} />

                <div
                  className="absolute bottom-12 right-10 backdrop-blur-xl rounded-2xl p-5 shadow-2xl"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", animation: "float 4s ease-in-out infinite" }}
                >
                  <p className="text-2xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>₦285k</p>
                  <p className="text-white/45 text-xs mt-0.5">Avg. monthly earnings</p>
                  <div className="flex gap-0.5 mt-2.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
