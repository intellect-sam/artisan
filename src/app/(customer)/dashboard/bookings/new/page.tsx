"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CheckCircle2, MapPin, Calendar, User, Star, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AIButton } from "@/components/shared/AIButton"
import { PriceEstimate } from "@/components/booking/PriceEstimate"
import { NIGERIAN_STATES, TRADES, PLACEHOLDER_AVATAR } from "@/components/shared/NigeriaData"
import type { AIJobDescription } from "@/types"
import Image from "next/image"

// ── Mock matched artisans ─────────────────────────────────────────────────────
interface MockArtisan {
  id: string
  full_name: string
  trade: string
  rating: number
  total_reviews: number
  state: string
  lga: string
  is_verified: boolean
  min_rate: number
  max_rate: number
  is_available: boolean
  photo_url: string | null
}

const MOCK_MATCHED: MockArtisan[] = [
  {
    id: "1",
    full_name: "Emeka Okafor",
    trade: "plumber",
    rating: 4.8,
    total_reviews: 127,
    state: "Lagos",
    lga: "Ikeja",
    is_verified: true,
    min_rate: 5000,
    max_rate: 25000,
    is_available: true,
    photo_url: null,
  },
  {
    id: "2",
    full_name: "Gbenga Adisa",
    trade: "plumber",
    rating: 4.5,
    total_reviews: 89,
    state: "Lagos",
    lga: "Surulere",
    is_verified: true,
    min_rate: 6000,
    max_rate: 22000,
    is_available: true,
    photo_url: null,
  },
  {
    id: "3",
    full_name: "Musa Plumber",
    trade: "plumber",
    rating: 4.3,
    total_reviews: 45,
    state: "Lagos",
    lga: "Alimosho",
    is_verified: false,
    min_rate: 4000,
    max_rate: 18000,
    is_available: false,
    photo_url: null,
  },
]

// ── Step indicator ─────────────────────────────────────────────────────────────
function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          Step {current} of {total}
        </span>
        <span className="text-sm text-gray-400">
          {current === 1 ? "Describe Problem" : current === 2 ? "Choose Artisan" : "Confirm Booking"}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function NewBookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  // Step 1 state
  const [rawDescription, setRawDescription] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [trade, setTrade] = useState("")
  const [address, setAddress] = useState("")
  const [state, setState] = useState("")
  const [scheduledDate, setScheduledDate] = useState("")
  const [aiEstimate, setAiEstimate] = useState<AIJobDescription | null>(null)

  // Step 2 state
  const [selectedArtisan, setSelectedArtisan] = useState<MockArtisan | null>(null)

  // Step 3 state
  const [submitting, setSubmitting] = useState(false)

  const today = new Date().toISOString().split("T")[0]

  // ── AI mock handler ──
  const handleAIHelp = async () => {
    await new Promise((r) => setTimeout(r, 1200))
    const result: AIJobDescription = {
      title: "Kitchen Pipe Leak Repair",
      description:
        "Experienced plumber needed to diagnose and fix a water leak under the kitchen sink. The pipe joint appears to be damaged and water is dripping onto the cabinet floor.",
      trade: "plumber",
      estimated_price_min: 8000,
      estimated_price_max: 20000,
    }
    setJobTitle(result.title)
    setJobDescription(result.description)
    setTrade(result.trade)
    setAiEstimate(result)
  }

  // ── Step 1 validation ──
  const step1Valid =
    (jobDescription.length >= 20 || rawDescription.length >= 20) &&
    trade.trim() !== "" &&
    address.trim() !== "" &&
    state.trim() !== "" &&
    scheduledDate.trim() !== ""

  // ── Submit ──
  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    toast.success("Booking sent! Artisan will respond within 2 hours.")
    router.push("/dashboard/bookings")
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-secondary mb-1">Post a Job</h1>
      <p className="text-gray-500 text-sm mb-6">Find the right artisan for your task</p>

      <StepProgress current={step} total={3} />

      {/* ─── STEP 1: Describe the Problem ────────────────────────────────── */}
      {step === 1 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-secondary">Describe Your Problem</h2>

          {/* Raw description textarea */}
          <div className="space-y-1.5">
            <Label htmlFor="rawDesc">Describe your problem</Label>
            <textarea
              id="rawDesc"
              rows={4}
              value={rawDescription}
              onChange={(e) => setRawDescription(e.target.value)}
              placeholder="e.g. My kitchen sink pipe is leaking and water is dripping..."
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring resize-none"
            />
            <p className="text-xs text-gray-400">Minimum 20 characters</p>
          </div>

          {/* AI Button */}
          <AIButton
            label="Let AI Help"
            loadingLabel="AI is analysing..."
            onClick={handleAIHelp}
            size="sm"
          />

          {/* AI-filled fields */}
          {jobTitle && (
            <div className="space-y-1.5">
              <Label htmlFor="jobTitle">Job Title (AI suggested)</Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="jobDesc">Detailed Description</Label>
            <textarea
              id="jobDesc"
              rows={3}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Provide more details about the job..."
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring resize-none"
            />
          </div>

          {/* Trade */}
          <div className="space-y-1.5">
            <Label>Trade / Skill Needed</Label>
            <Select value={trade} onValueChange={(val) => setTrade(val ?? "")}>
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="Select a trade" />
              </SelectTrigger>
              <SelectContent>
                {TRADES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.icon} {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 12 Adeyemi Street, Ikeja"
            />
          </div>

          {/* State */}
          <div className="space-y-1.5">
            <Label>State</Label>
            <Select value={state} onValueChange={(val) => setState(val ?? "")}>
              <SelectTrigger className="w-full h-9">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {NIGERIAN_STATES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <Label htmlFor="date">Preferred Date</Label>
            <Input
              id="date"
              type="date"
              min={today}
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
            />
          </div>

          {/* AI price preview */}
          {aiEstimate && (
            <PriceEstimate
              min={aiEstimate.estimated_price_min}
              max={aiEstimate.estimated_price_max}
              label="AI Price Estimate"
            />
          )}

          <div className="flex justify-end pt-2">
            <Button
              className="bg-primary hover:bg-primary/90"
              disabled={!step1Valid}
              onClick={() => setStep(2)}
            >
              Find Artisans
            </Button>
          </div>
        </div>
      )}

      {/* ─── STEP 2: View Matched Artisans ───────────────────────────────── */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-secondary mb-1">Matched Artisans</h2>
            <p className="text-sm text-gray-500 mb-5">
              Select an artisan to send your booking request to
            </p>

            <div className="space-y-3">
              {MOCK_MATCHED.map((artisan) => {
                const isSelected = selectedArtisan?.id === artisan.id
                return (
                  <button
                    key={artisan.id}
                    type="button"
                    onClick={() => setSelectedArtisan(artisan)}
                    className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-gray-100 bg-white hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        <Image
                          src={artisan.photo_url || PLACEHOLDER_AVATAR(artisan.full_name)}
                          alt={artisan.full_name}
                          width={48}
                          height={48}
                          className="rounded-full w-12 h-12 object-cover"
                        />
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900">{artisan.full_name}</span>
                          {artisan.is_verified && (
                            <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" />
                          )}
                          {!artisan.is_available && (
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                              Unavailable
                            </span>
                          )}
                          {artisan.is_available && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              Available
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            {artisan.rating} ({artisan.total_reviews} reviews)
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {artisan.lga}, {artisan.state}
                          </span>
                        </div>

                        <div className="mt-2">
                          <PriceEstimate
                            min={artisan.min_rate}
                            max={artisan.max_rate}
                            label="AI Price Estimate"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
                          isSelected
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {isSelected ? "Selected" : "Select Artisan"}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              disabled={!selectedArtisan}
              onClick={() => setStep(3)}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* ─── STEP 3: Confirm Booking ──────────────────────────────────────── */}
      {step === 3 && selectedArtisan && (
        <div className="space-y-4">
          {/* Job Summary */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-secondary mb-4">Job Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-gray-400 w-24 shrink-0">Title</span>
                <span className="font-medium text-gray-900">{jobTitle || "Untitled Job"}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 w-24 shrink-0">Description</span>
                <span className="text-gray-700">{jobDescription || rawDescription}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 w-24 shrink-0">Trade</span>
                <span className="font-medium capitalize text-gray-900">{trade}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-24 shrink-0 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Address
                </span>
                <span className="text-gray-700">
                  {address}, {state}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 w-24 shrink-0 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Date
                </span>
                <span className="text-gray-700">
                  {new Date(scheduledDate).toLocaleDateString("en-NG", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Selected Artisan */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-secondary mb-3">Selected Artisan</h2>
            <div className="flex items-center gap-3">
              <Image
                src={selectedArtisan.photo_url || PLACEHOLDER_AVATAR(selectedArtisan.full_name)}
                alt={selectedArtisan.full_name}
                width={48}
                height={48}
                className="rounded-full w-12 h-12 object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{selectedArtisan.full_name}</span>
                  {selectedArtisan.is_verified && (
                    <BadgeCheck className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                  <span className="capitalize">{selectedArtisan.trade}</span>
                  <span>·</span>
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span>{selectedArtisan.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Estimate */}
          {aiEstimate && (
            <PriceEstimate
              min={aiEstimate.estimated_price_min}
              max={aiEstimate.estimated_price_max}
              label="AI Price Estimate"
            />
          )}

          {/* Note */}
          <p className="text-xs text-gray-400 text-center">
            Final price will be set by the artisan after reviewing your job.
          </p>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting ? "Sending..." : "Send Booking Request"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
