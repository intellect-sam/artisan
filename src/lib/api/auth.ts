import apiClient from "@/lib/axios"
import type { User } from "@/types"

export interface LoginPayload {
  email: string
  password: string
  role: "customer" | "artisan"
}

export interface RegisterCustomerPayload {
  full_name: string
  email: string
  phone: string
  password: string
  state: string
}

export interface RegisterArtisanPayload {
  full_name: string
  email: string
  phone: string
  password: string
  state: string
  lga: string
  trade: string
  bio: string
  nin: string
  years_experience: number
}

export interface AuthResponse {
  user: User
  token: string
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>("/auth/login", payload).then((r) => r.data),

  registerCustomer: (payload: RegisterCustomerPayload) =>
    apiClient.post<AuthResponse>("/auth/register/customer", payload).then((r) => r.data),

  registerArtisan: (payload: RegisterArtisanPayload) =>
    apiClient.post<AuthResponse>("/auth/register/artisan", payload).then((r) => r.data),

  logout: () => apiClient.post("/auth/logout").then((r) => r.data),

  getProfile: () => apiClient.get<User>("/auth/me").then((r) => r.data),
}
