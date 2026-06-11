export type UserRole = "customer" | "artisan"
export type BookingStatus = "pending" | "active" | "completed" | "cancelled" | "disputed"
export type PaymentStatus = "unpaid" | "paid" | "released"

export interface User {
  id: string
  email: string
  full_name: string
  phone: string
  role: UserRole
  state: string
  avatar_url?: string
  created_at: string
}

export interface Artisan {
  id: string
  user_id: string
  full_name: string
  trade: string
  bio: string
  state: string
  lga: string
  rating: number
  total_reviews: number
  total_jobs: number
  min_rate?: number
  max_rate?: number
  is_available: boolean
  is_verified: boolean
  photo_url?: string
  portfolio: PortfolioItem[]
  reviews?: Review[]
  created_at: string
}

export interface PortfolioItem {
  id: string
  image_url: string
  description: string
  created_at: string
}

export interface Booking {
  id: string
  customer_id: string
  artisan_id: string
  artisan?: Artisan
  customer?: User
  job_title: string
  description: string
  trade: string
  address: string
  state: string
  scheduled_date: string
  status: BookingStatus
  price?: number
  payment_status: PaymentStatus
  has_review: boolean
  messages?: Message[]
  created_at: string
}

export interface Review {
  id: string
  booking_id: string
  customer_id: string
  artisan_id: string
  rating: number
  comment: string
  customer_name: string
  customer_avatar?: string
  created_at: string
}

export interface Message {
  id: string
  booking_id: string
  sender_id: string
  sender_role: UserRole
  content: string
  created_at: string
}

export interface Earnings {
  total_month: number
  total_all_time: number
  weekly: { day: string; amount: number }[]
  transactions: Transaction[]
}

export interface Transaction {
  id: string
  job_id: string
  job_title: string
  customer_name: string
  amount: number
  status: "pending" | "completed" | "withdrawn"
  date: string
}

export interface ArtisanFilters {
  trade?: string
  state?: string
  lga?: string
  min_rating?: number
  available_now?: boolean
  sort?: "rating" | "newest" | "most_jobs"
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface AIJobDescription {
  title: string
  description: string
  trade: string
  estimated_price_min: number
  estimated_price_max: number
}

export interface AIPriceEstimate {
  min: number
  max: number
  typical: number
  currency: string
}

export interface AIPerformanceReport {
  strengths: string[]
  improvements: string[]
  booking_tips: string[]
  best_times: string[]
}

export interface SupportMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}
