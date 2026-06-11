"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const API_URL = process.env.GO_API_URL || "http://localhost:8080/api/v1"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    })

    if (!res.ok) {
      const err = await res.json()
      return { error: err.message || "Invalid credentials" }
    }

    const data = await res.json()
    const cookieStore = await cookies()
    cookieStore.set("artisan_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })

    return { success: true, user: data.user }
  } catch {
    return { error: "Something went wrong. Please try again." }
  }
}

export async function registerCustomerAction(formData: FormData) {
  const payload = {
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    state: formData.get("state"),
  }

  try {
    const res = await fetch(`${API_URL}/auth/register/customer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json()
      return { error: err.message || "Registration failed" }
    }

    const data = await res.json()
    const cookieStore = await cookies()
    cookieStore.set("artisan_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })

    return { success: true, user: data.user }
  } catch {
    return { error: "Something went wrong. Please try again." }
  }
}

export async function registerArtisanAction(payload: Record<string, unknown>) {
  try {
    const res = await fetch(`${API_URL}/auth/register/artisan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json()
      return { error: err.message || "Registration failed" }
    }

    const data = await res.json()
    const cookieStore = await cookies()
    cookieStore.set("artisan_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })

    return { success: true, user: data.user }
  } catch {
    return { error: "Something went wrong. Please try again." }
  }
}

export async function googleAuthAction(
  credential: string,
  role: "customer" | "artisan"
) {
  try {
    const res = await fetch(`${API_URL}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential, role }),
    })

    if (!res.ok) {
      const err = await res.json()
      return { error: err.message || "Google sign-in failed" }
    }

    const data = await res.json()
    const cookieStore = await cookies()
    cookieStore.set("artisan_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })

    return { success: true, user: data.user }
  } catch {
    return { error: "Something went wrong. Please try again." }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("artisan_token")
  redirect("/")
}
