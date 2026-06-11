"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { JobRequestCard } from "@/components/artisan/JobRequestCard"
import { MapPin, Calendar, User, Star, CheckCircle2 } from "lucide-react"

const MOCK_NEW_REQUESTS = [
  {
    id: "r1",
    job_title: "Fix Burst Pipe in Bathroom",
    customer: { full_name: "Kemi Adebayo" },
    address: "45 Bode Thomas St",
    state: "Lagos",
    scheduled_date: "2024-12-22",
    status: "pending",
    trade: "plumber",
    description:
      "Water pipe burst in main bathroom, flooding the floor. Need urgent repair.",
  },
  {
    id: "r2",
    job_title: "Install New Kitchen Taps",
    customer: { full_name: "Tunde Fashola" },
    address: "8 Awolowo Road",
    state: "Lagos",
    scheduled_date: "2024-12-23",
    status: "pending",
    trade: "plumber",
    description:
      "Replace old kitchen taps with new ones provided by customer.",
  },
  {
    id: "r3",
    job_title: "Repair Guest Toilet Cistern",
    customer: { full_name: "Amaka Eze" },
    address: "22 Lekki Phase 1",
    state: "Lagos",
    scheduled_date: "2024-12-24",
    status: "pending",
    trade: "plumber",
    description: "Cistern not filling properly, water keeps running.",
  },
]

const MOCK_ACTIVE_JOBS = [
  {
    id: "a1",
    job_title: "Repair Kitchen Sink Drain",
    customer: { full_name: "Blessing Okoro" },
    address: "5 Marina Street",
    state: "Lagos",
    scheduled_date: "2024-12-19",
    status: "active",
    price: 15000,
    description: "Drain is completely blocked, water not going down.",
  },
]

const MOCK_COMPLETED_JOBS = [
  {
    id: "c1",
    job_title: "Install Bathroom Shower",
    customer: { full_name: "David Okafor" },
    address: "12 Victoria Island",
    state: "Lagos",
    scheduled_date: "2024-12-10",
    status: "completed",
    price: 35000,
    rating_received: 5,
    description: "Full shower unit installation in master bathroom.",
  },
  {
    id: "c2",
    job_title: "Fix Leaking Ceiling Pipe",
    customer: { full_name: "Sarah Adekunle" },
    address: "3 Surulere Close",
    state: "Lagos",
    scheduled_date: "2024-12-08",
    status: "completed",
    price: 22000,
    rating_received: 4,
    description: "Ceiling pipe leaking into living room. Urgent fix needed.",
  },
]

const MOCK_CANCELLED_JOBS = [
  {
    id: "x1",
    job_title: "Replace Water Tank",
    customer: { full_name: "Chidi Nwosu" },
    address: "7 Allen Avenue",
    state: "Lagos",
    scheduled_date: "2024-12-05",
    status: "cancelled",
    price: 28000,
    description: "Old overhead tank needs full replacement.",
  },
]

function ActiveJobCard({
  job,
}: {
  job: {
    id: string
    job_title: string
    customer: { full_name: string }
    address: string
    state: string
    scheduled_date: string
    price: number
    description: string
  }
}) {
  const [completed, setCompleted] = useState(false)

  const handleComplete = () => {
    toast.success("Job marked as complete")
    setCompleted(true)
  }

  if (completed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-600" />
        <p className="text-green-700 font-medium text-sm">
          &quot;{job.job_title}&quot; marked as complete
        </p>
      </div>
    )
  }

  const formattedDate = new Date(job.scheduled_date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{job.job_title}</h3>
          <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
            {job.description}
          </p>
        </div>
        <Badge className="bg-blue-100 text-blue-700 border-blue-200 shrink-0">
          Active
        </Badge>
      </div>

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="w-3.5 h-3.5 text-gray-400" />
          <span>{job.customer.full_name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-3.5 h-3.5 text-gray-400" />
          <span>
            {job.address}, {job.state}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-900">
          ₦{job.price.toLocaleString()}
        </p>
        <Button
          onClick={handleComplete}
          className="bg-green-600 hover:bg-green-700 text-white h-9 text-sm"
        >
          <CheckCircle2 className="w-4 h-4 mr-1.5" />
          Mark as Complete
        </Button>
      </div>
    </div>
  )
}

function CompletedJobCard({
  job,
}: {
  job: {
    id: string
    job_title: string
    customer: { full_name: string }
    address: string
    state: string
    scheduled_date: string
    price: number
    rating_received: number
    description: string
  }
}) {
  const formattedDate = new Date(job.scheduled_date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{job.job_title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{job.description}</p>
        </div>
        <Badge className="bg-green-100 text-green-700 border-green-200 shrink-0">
          Completed
        </Badge>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-gray-400" />
          {job.customer.full_name}
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          {formattedDate}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Amount earned</p>
          <p className="text-lg font-bold text-gray-900">
            ₦{job.price.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Customer rating</p>
          <div className="flex gap-0.5 justify-end">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-4 h-4 ${
                  s <= job.rating_received
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-200 fill-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CancelledJobCard({
  job,
}: {
  job: {
    id: string
    job_title: string
    customer: { full_name: string }
    scheduled_date: string
    price: number
    description: string
  }
}) {
  const formattedDate = new Date(job.scheduled_date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm opacity-75">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-gray-700 line-through">
            {job.job_title}
          </h3>
          <p className="text-sm text-gray-400 mt-0.5 line-clamp-2">
            {job.description}
          </p>
        </div>
        <Badge className="bg-red-100 text-red-600 border-red-200 shrink-0">
          Cancelled
        </Badge>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-gray-400">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          {job.customer.full_name}
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {formattedDate}
        </div>
        <span>₦{job.price.toLocaleString()}</span>
      </div>
    </div>
  )
}

export default function ArtisanJobsPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Job Requests</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage all your job requests in one place
        </p>
      </div>

      <Tabs defaultValue="new">
        <TabsList className="mb-6 bg-gray-100">
          <TabsTrigger value="new" className="relative">
            New
            <span className="ml-1.5 bg-primary text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
              {MOCK_NEW_REQUESTS.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
            <span className="ml-1.5 bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
              {MOCK_ACTIVE_JOBS.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <div className="space-y-4">
            {MOCK_NEW_REQUESTS.map((job) => (
              <JobRequestCard key={job.id} job={job} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="space-y-4">
            {MOCK_ACTIVE_JOBS.map((job) => (
              <ActiveJobCard key={job.id} job={job} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-4">
            {MOCK_COMPLETED_JOBS.map((job) => (
              <CompletedJobCard key={job.id} job={job} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cancelled">
          <div className="space-y-4">
            {MOCK_CANCELLED_JOBS.map((job) => (
              <CancelledJobCard key={job.id} job={job} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
