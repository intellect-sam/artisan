import apiClient from "@/lib/axios"
import type { Booking, BookingStatus, Message, PaginatedResponse } from "@/types"

export interface CreateBookingPayload {
  artisan_id: string
  job_title: string
  description: string
  trade: string
  address: string
  state: string
  scheduled_date: string
}

export const bookingsApi = {
  create: (payload: CreateBookingPayload) =>
    apiClient.post<Booking>("/bookings", payload).then((r) => r.data),

  getMyBookings: (status?: BookingStatus) =>
    apiClient
      .get<PaginatedResponse<Booking>>("/bookings/mine", { params: { status } })
      .then((r) => r.data),

  getArtisanRequests: (status?: BookingStatus) =>
    apiClient
      .get<PaginatedResponse<Booking>>("/bookings/artisan", { params: { status } })
      .then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<Booking>(`/bookings/${id}`).then((r) => r.data),

  updateStatus: (id: string, status: BookingStatus, price?: number) =>
    apiClient.put<Booking>(`/bookings/${id}/status`, { status, price }).then((r) => r.data),

  acceptWithPrice: (id: string, price: number) =>
    apiClient.post<Booking>(`/bookings/${id}/accept`, { price }).then((r) => r.data),

  cancel: (id: string) =>
    apiClient.post<Booking>(`/bookings/${id}/cancel`).then((r) => r.data),

  complete: (id: string) =>
    apiClient.post<Booking>(`/bookings/${id}/complete`).then((r) => r.data),

  raiseDispute: (id: string, reason: string) =>
    apiClient.post(`/bookings/${id}/dispute`, { reason }).then((r) => r.data),

  getMessages: (id: string) =>
    apiClient.get<Message[]>(`/bookings/${id}/messages`).then((r) => r.data),

  sendMessage: (id: string, content: string) =>
    apiClient.post<Message>(`/bookings/${id}/messages`, { content }).then((r) => r.data),
}
