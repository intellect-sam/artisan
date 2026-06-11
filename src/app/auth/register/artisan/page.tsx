"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Eye, EyeOff, Check, ArrowLeft, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { GoogleSignInButton } from "@/components/shared/GoogleSignInButton"
import { registerArtisanAction } from "@/actions/auth"
import { useAuthStore } from "@/stores/authStore"
import { NIGERIAN_STATES, TRADES, getLGAs } from "@/components/shared/NigeriaData"
import type { User } from "@/types"

// ── Schemas ───────────────────────────────────────────────────────────────────

const passwordSchema = z
  .string()
  .min(8, "At least 8 characters")
  .regex(/[A-Z]/, "Include an uppercase letter")
  .regex(/[a-z]/, "Include a lowercase letter")
  .regex(/[0-9]/, "Include a number")
  .regex(/[^A-Za-z0-9]/, "Include a special character")

const step1Schema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: passwordSchema,
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  })

const step2Schema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  phone: z
    .string()
    .regex(/^(\+234|0)[789][01]\d{8}$/, "Enter a valid Nigerian phone number"),
  trade: z.string().min(1, "Please select a trade"),
  specialization: z.string().min(3, "Describe your specialization"),
  years_experience: z
    .string()
    .transform(Number)
    .pipe(z.number().min(0).max(60, "Value seems too high")),
  state: z.string().min(1, "Please select a state"),
  lga: z.string().min(1, "Please select an LGA"),
})

type Step1 = z.infer<typeof step1Schema>
type Step2Input = Omit<z.input<typeof step2Schema>, never>
type Step2 = z.infer<typeof step2Schema>

// ── Password strength ─────────────────────────────────────────────────────────

const REQUIREMENTS = [
  { label: "8+ characters",    test: (v: string) => v.length >= 8 },
  { label: "Uppercase (A-Z)", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Lowercase (a-z)", test: (v: string) => /[a-z]/.test(v) },
  { label: "Number (0-9)",    test: (v: string) => /[0-9]/.test(v) },
  { label: "Special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
]

function PasswordStrength({ value }: { value: string }) {
  const met = REQUIREMENTS.filter((r) => r.test(value)).length
  const colors = ["bg-red-400", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-emerald-400", "bg-emerald-500"]
  const labels = ["", "Weak", "Weak", "Fair", "Good", "Strong"]
  if (!value) return null
  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={cn("flex-1 h-1 rounded-full transition-all duration-300", i <= met ? colors[met] : "bg-border")} />
        ))}
      </div>
      {met > 0 && (
        <p className={cn("text-xs font-medium", met <= 2 ? "text-red-500" : met <= 3 ? "text-orange-500" : "text-emerald-600")}>
          {labels[met]}
        </p>
      )}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1">
        {REQUIREMENTS.map((r) => (
          <div key={r.label} className="flex items-center gap-1.5">
            <div className={cn("w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 transition-colors", r.test(value) ? "bg-emerald-500" : "bg-muted")}>
              {r.test(value) && <Check className="w-2 h-2 text-white" strokeWidth={3} />}
            </div>
            <span className={cn("text-xs transition-colors", r.test(value) ? "text-emerald-600" : "text-muted-foreground")}>
              {r.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── OTP Input ─────────────────────────────────────────────────────────────────

function OTPInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const set = useCallback((i: number, digit: string) => {
    const arr = Array.from({ length: 6 }, (_, k) => value[k] || "")
    arr[i] = digit
    onChange(arr.join(""))
    if (digit && i < 5) refs.current[i + 1]?.focus()
  }, [value, onChange])

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => set(i, e.target.value.replace(/\D/g, "").slice(-1))}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !value[i] && i > 0) {
              set(i - 1, "")
              refs.current[i - 1]?.focus()
            }
          }}
          onPaste={(e) => {
            e.preventDefault()
            const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
            onChange(digits.padEnd(6, "").slice(0, 6))
            refs.current[Math.min(digits.length, 5)]?.focus()
          }}
          className="w-12 h-14 text-center text-xl font-bold border-2 border-border rounded-xl bg-background focus:border-primary focus:outline-none transition-colors"
        />
      ))}
    </div>
  )
}

// ── Left Panel ────────────────────────────────────────────────────────────────

const STEPS = [
  { num: 1, label: "Create Account", desc: "Email & password" },
  { num: 2, label: "Your Profile",   desc: "Skills & location" },
  { num: 3, label: "Verify Phone",   desc: "OTP confirmation" },
]

function LeftPanel({ step }: { step: number }) {
  return (
    <div className="hidden lg:flex lg:w-[42%] relative flex-col justify-between bg-[#1C1C1C] p-12 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80"
        alt=""
        fill
        className="object-cover object-center opacity-15"
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#1C1C1C]/70 via-[#1C1C1C]/80 to-[#1C1C1C]" />

      <div className="relative z-10">
        <Link href="/">
          <span className="text-xl font-bold text-white tracking-tight">
            Artisan<span className="text-primary">Connect</span>
          </span>
        </Link>
      </div>

      <div className="relative z-10 space-y-6">
        <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-8">
          Artisan Sign Up
        </p>
        {STEPS.map((s) => (
          <div key={s.num} className="flex items-start gap-4">
            <div className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-300",
              step > s.num   ? "bg-emerald-500 text-white" :
              step === s.num ? "bg-primary text-white ring-4 ring-primary/20" :
                               "bg-white/10 text-white/30"
            )}>
              {step > s.num ? <Check className="w-4 h-4" /> : s.num}
            </div>
            <div className="pt-1">
              <p className={cn("font-semibold text-sm transition-colors", step >= s.num ? "text-white" : "text-white/30")}>
                {s.label}
              </p>
              <p className={cn("text-xs mt-0.5 transition-colors", step >= s.num ? "text-white/50" : "text-white/20")}>
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <p className="text-white/50 text-sm italic leading-relaxed">
          &ldquo;I&apos;ve gotten more clients in 3 months on ArtisanConnect than in the last year.&rdquo;
        </p>
        <p className="text-white/30 text-xs mt-2">— Emeka O., Master Carpenter</p>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RegisterArtisanPage() {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  const [step, setStep] = useState(1)
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [otp, setOtp] = useState("")
  const [resendTimer, setResendTimer] = useState(0)

  const [s1, setS1] = useState<Step1 | null>(null)
  const [s2, setS2] = useState<Step2 | null>(null)

  const form1 = useForm<Step1>({ resolver: zodResolver(step1Schema) })
  const form2 = useForm<Step2Input, unknown, Step2>({
    resolver: zodResolver(step2Schema),
    defaultValues: { trade: "", state: "", lga: "", years_experience: "" },
  })

  const pw = form1.watch("password") || ""
  const selectedState = form2.watch("state") || ""
  const lgas = getLGAs(selectedState)

  useEffect(() => {
    if (resendTimer <= 0) return
    const t = setTimeout(() => setResendTimer((n) => n - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  const goStep2 = form1.handleSubmit((v) => { setS1(v); setStep(2) })
  const goStep3 = form2.handleSubmit((v) => { setS2(v); setStep(3); setResendTimer(60) })

  const handleVerify = async () => {
    if (otp.length < 6) { toast.error("Enter the 6-digit code"); return }
    if (!s1 || !s2) return
    setIsSubmitting(true)

    const result = await registerArtisanAction({
      full_name: s2.full_name,
      email: s1.email,
      phone: s2.phone,
      password: s1.password,
      trade: s2.trade,
      skills: s2.specialization.split(",").map((s) => s.trim()).filter(Boolean),
      years_experience: s2.years_experience,
      state: s2.state,
      lga: s2.lga,
    })

    setIsSubmitting(false)
    if (result.error) { toast.error(result.error); return }
    if (result.success && result.user) {
      setAuth(result.user as User, "")
      toast.success("Welcome to ArtisanConnect! 🎉")
      router.push("/artisan/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex">
      <LeftPanel step={step} />

      <div className="flex-1 flex flex-col bg-background overflow-y-auto">
        <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md w-full mx-auto">

          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <Link href="/">
              <span className="text-xl font-bold text-foreground tracking-tight">
                Artisan<span className="text-primary">Connect</span>
              </span>
            </Link>
          </div>

          {/* Mobile step bar */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            {STEPS.map((s) => (
              <div key={s.num} className={cn(
                "flex-1 h-1.5 rounded-full transition-all duration-300",
                step > s.num ? "bg-emerald-500" : step === s.num ? "bg-primary" : "bg-border"
              )} />
            ))}
          </div>

          <div key={step} style={{ animation: "fade-up 0.4s ease both" }}>

            {/* ── Step 1: Account ──────────────────────────────────────────── */}
            {step === 1 && (
              <form onSubmit={goStep2} noValidate className="space-y-5">
                <div className="mb-6">
                  <h1 className="text-3xl font-black text-foreground tracking-tight">Create account</h1>
                  <p className="text-muted-foreground text-sm mt-1">Join thousands of skilled artisans on ArtisanConnect.</p>
                </div>

                <GoogleSignInButton role="artisan" />

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">or sign up with email</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-11"
                    aria-invalid={!!form1.formState.errors.email}
                    {...form1.register("email")}
                  />
                  {form1.formState.errors.email && (
                    <p className="text-xs text-destructive">{form1.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPw ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="h-11 pr-10"
                      aria-invalid={!!form1.formState.errors.password}
                      {...form1.register("password")}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {form1.formState.errors.password && (
                    <p className="text-xs text-destructive">{form1.formState.errors.password.message}</p>
                  )}
                  <PasswordStrength value={pw} />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirm">Confirm password</Label>
                  <div className="relative">
                    <Input
                      id="confirm"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Repeat your password"
                      className="h-11 pr-10"
                      aria-invalid={!!form1.formState.errors.confirm}
                      {...form1.register("confirm")}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {form1.formState.errors.confirm && (
                    <p className="text-xs text-destructive">{form1.formState.errors.confirm.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full h-11 font-semibold text-sm mt-2">
                  Continue
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-primary font-medium hover:underline">Sign in</Link>
                </p>
              </form>
            )}

            {/* ── Step 2: Profile ──────────────────────────────────────────── */}
            {step === 2 && (
              <form onSubmit={goStep3} noValidate className="space-y-4">
                <div className="mb-6">
                  <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <h1 className="text-3xl font-black text-foreground tracking-tight">Your profile</h1>
                  <p className="text-muted-foreground text-sm mt-1">Tell customers about you and your craft.</p>
                </div>

                {/* Full name */}
                <div className="space-y-1.5">
                  <Label htmlFor="full_name">Full name</Label>
                  <Input id="full_name" placeholder="e.g. Emeka Okafor" className="h-11" aria-invalid={!!form2.formState.errors.full_name} {...form2.register("full_name")} />
                  {form2.formState.errors.full_name && <p className="text-xs text-destructive">{form2.formState.errors.full_name.message}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" placeholder="e.g. 08012345678" className="h-11" aria-invalid={!!form2.formState.errors.phone} {...form2.register("phone")} />
                  {form2.formState.errors.phone && <p className="text-xs text-destructive">{form2.formState.errors.phone.message}</p>}
                  <p className="text-xs text-muted-foreground">We&apos;ll send a verification code to this number.</p>
                </div>

                {/* Trade + Years (2 cols) */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Trade</Label>
                    <Select
                      value={form2.watch("trade")}
                      onValueChange={(v) => form2.setValue("trade", v ?? "", { shouldValidate: true })}
                    >
                      <SelectTrigger className="h-11" aria-invalid={!!form2.formState.errors.trade}>
                        <SelectValue placeholder="Select trade" />
                      </SelectTrigger>
                      <SelectContent>
                        {TRADES.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.icon} {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form2.formState.errors.trade && <p className="text-xs text-destructive">{form2.formState.errors.trade.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="years_experience">Years of experience</Label>
                    <Input
                      id="years_experience"
                      type="number"
                      min={0}
                      max={60}
                      placeholder="e.g. 5"
                      className="h-11"
                      aria-invalid={!!form2.formState.errors.years_experience}
                      {...form2.register("years_experience")}
                    />
                    {form2.formState.errors.years_experience && <p className="text-xs text-destructive">{form2.formState.errors.years_experience.message}</p>}
                  </div>
                </div>

                {/* Specialization */}
                <div className="space-y-1.5">
                  <Label htmlFor="specialization">Specialization</Label>
                  <textarea
                    id="specialization"
                    placeholder="e.g. pipe fitting, leak repair, bathroom installation (comma separated)"
                    rows={2}
                    className="w-full rounded-xl border border-input bg-transparent px-3 py-2.5 text-sm outline-none resize-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 placeholder:text-muted-foreground transition-colors"
                    aria-invalid={!!form2.formState.errors.specialization}
                    {...form2.register("specialization")}
                  />
                  {form2.formState.errors.specialization && <p className="text-xs text-destructive">{form2.formState.errors.specialization.message}</p>}
                  <p className="text-xs text-muted-foreground">List your specific skills or specialties, separated by commas.</p>
                </div>

                {/* State + LGA (2 cols) */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>State</Label>
                    <Select
                      value={form2.watch("state")}
                      onValueChange={(v) => {
                        form2.setValue("state", v ?? "", { shouldValidate: true })
                        form2.setValue("lga", "", { shouldValidate: false })
                      }}
                    >
                      <SelectTrigger className="h-11" aria-invalid={!!form2.formState.errors.state}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {NIGERIAN_STATES.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form2.formState.errors.state && <p className="text-xs text-destructive">{form2.formState.errors.state.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label>Local Government</Label>
                    <Select
                      value={form2.watch("lga")}
                      onValueChange={(v) => form2.setValue("lga", v ?? "", { shouldValidate: true })}
                      disabled={!selectedState}
                    >
                      <SelectTrigger className="h-11" aria-invalid={!!form2.formState.errors.lga}>
                        <SelectValue placeholder={selectedState ? "Select LGA" : "Select state first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {lgas.map((l) => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form2.formState.errors.lga && <p className="text-xs text-destructive">{form2.formState.errors.lga.message}</p>}
                  </div>
                </div>

                <Button type="submit" className="w-full h-11 font-semibold text-sm mt-2">
                  Send Verification Code
                </Button>
              </form>
            )}

            {/* ── Step 3: OTP ──────────────────────────────────────────────── */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="mb-6">
                  <button type="button" onClick={() => setStep(2)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <h1 className="text-3xl font-black text-foreground tracking-tight">Verify your phone</h1>
                  <p className="text-muted-foreground text-sm mt-1">
                    Enter the 6-digit code sent to{" "}
                    <span className="font-semibold text-foreground">{s2?.phone}</span>
                  </p>
                </div>

                <OTPInput value={otp} onChange={setOtp} />

                <Button
                  onClick={handleVerify}
                  disabled={otp.length < 6 || isSubmitting}
                  className="w-full h-11 font-semibold text-sm"
                >
                  {isSubmitting
                    ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Verifying...</>
                    : "Verify & Complete Registration"
                  }
                </Button>

                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Resend code in <span className="font-semibold text-foreground">{resendTimer}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setResendTimer(60)}
                      className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Resend code
                    </button>
                  )}
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Didn&apos;t receive the code? Check your SMS or try a different number.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
