"use server"

import { cookies } from "next/headers"

const API_URL = process.env.GO_API_URL || "http://localhost:8080/api/v1"

async function getAuthHeader(): Promise<Record<string, string>> {
  const cookieStore = await cookies()
  const token = cookieStore.get("artisan_token")?.value
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function createBookingAction(payload: {
  artisan_id: string
  job_title: string
  description: string
  trade: string
  address: string
  state: string
  scheduled_date: string
}) {
  try {
    const headers = await getAuthHeader()
    const res = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json()
      return { error: err.message || "Failed to create booking" }
    }

    return { success: true, data: await res.json() }
  } catch {
    return { error: "Something went wrong. Please try again." }
  }
}

export async function updateBookingStatusAction(
  bookingId: string,
  status: string,
  price?: number
) {
  try {
    const headers = await getAuthHeader()
    const res = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ status, price }),
    })

    if (!res.ok) {
      const err = await res.json()
      return { error: err.message || "Failed to update booking" }
    }

    return { success: true, data: await res.json() }
  } catch {
    return { error: "Something went wrong. Please try again." }
  }
}
