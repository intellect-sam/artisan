"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Loader2,
  Wrench,
  ArrowLeft,
  Eye,
  EyeOff,
  Star,
  Shield,
  Hammer,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginAction } from "@/actions/auth"
import { useAuthStore } from "@/stores/authStore"
import { GoogleSignInButton } from "@/components/shared/GoogleSignInButton"
import type { User } from "@/types"

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type FormValues = z.infer<typeof schema>

const FEATURES = [
  { icon: Star, label: "Verified skilled artisans" },
  { icon: Shield, label: "Secure & trusted platform" },
  { icon: Hammer, label: "From repairs to renovations" },
]

const STATS = [
  { value: "10K+", label: "Artisans" },
  { value: "50K+", label: "Projects" },
  { value: "4.9★", label: "Rating" },
]

export default function LoginPage() {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData()
    formData.set("email", values.email)
    formData.set("password", values.password)

    const result = await loginAction(formData)

    if (result.error) {
      toast.error(result.error)
      return
    }

    if (result.success && result.user) {
      const user = result.user as User
      setAuth(user, "")
      toast.success("Welcome back!")
      router.push(user.role === "artisan" ? "/artisan/dashboard" : "/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex lg:w-[46%] xl:w-[42%] relative overflow-hidden bg-primary flex-col">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-white/10" />
        <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 -right-28 w-80 h-80 rounded-full bg-black/10" />
        <div className="pointer-events-none absolute -bottom-28 left-8 w-72 h-72 rounded-full bg-white/[0.07]" />

        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm">
              <Wrench className="size-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">ArtisanConnect</span>
          </div>

          {/* Hero copy */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-white leading-[1.2] tracking-tight mb-4">
              Craftsmanship<br />meets convenience.
            </h2>
            <p className="text-white/70 text-base leading-relaxed max-w-xs">
              Find skilled artisans for every project, or grow your craft business with the tools you need.
            </p>

            {/* Feature list */}
            <ul className="mt-10 space-y-3">
              {FEATURES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="size-4 text-white" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats footer */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="text-white font-bold text-2xl leading-none">{value}</div>
                <div className="text-white/55 text-xs mt-1.5 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col min-h-screen bg-background">
        {/* Back link */}
        <div className="px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>
        </div>

        {/* Centered form */}
        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-[360px]">

            {/* Mobile-only logo */}
            <div className="flex flex-col items-center mb-8 lg:hidden">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary mb-3">
                <Wrench className="size-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-secondary">ArtisanConnect</span>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <h1 className="text-[1.65rem] font-bold text-secondary tracking-tight leading-tight">
                Welcome back
              </h1>
              <p className="text-muted-foreground text-sm mt-1.5">
                Sign in to continue to your account
              </p>
            </div>

            {/* Google first */}
            <GoogleSignInButton />

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide">
                or with email
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  className="h-11 rounded-lg bg-card border-border focus-visible:ring-primary/40"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    aria-invalid={!!errors.password}
                    className="h-11 rounded-lg bg-card border-border focus-visible:ring-primary/40 pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword
                      ? <EyeOff className="size-[1.05rem]" />
                      : <Eye className="size-[1.05rem]" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm tracking-wide transition-colors mt-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    Signing in…
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            {/* Sign-up link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register/customer"
                className="text-primary font-semibold hover:underline"
              >
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
