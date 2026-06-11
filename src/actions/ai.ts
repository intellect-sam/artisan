"use server"

import { cookies } from "next/headers"

const API_URL = process.env.GO_API_URL || "http://localhost:8080/api/v1"

async function getAuthHeader(): Promise<Record<string, string>> {
  const cookieStore = await cookies()
  const token = cookieStore.get("artisan_token")?.value
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function describeJobAction(rawDescription: string) {
  try {
    const headers = await getAuthHeader()
    const res = await fetch(`${API_URL}/ai/describe-job`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ description: rawDescription }),
    })

    if (!res.ok) return { error: "AI could not process your description" }
    return { success: true, data: await res.json() }
  } catch {
    return { error: "AI service unavailable. Please try again." }
  }
}

export async function generateBioAction(data: {
  trade: string
  experience: number
  skills: string
}) {
  try {
    const headers = await getAuthHeader()
    const res = await fetch(`${API_URL}/ai/write-bio`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(data),
    })

    if (!res.ok) return { error: "Could not generate bio" }
    return { success: true, data: await res.json() }
  } catch {
    return { error: "AI service unavailable. Please try again." }
  }
}

export async function supportChatAction(
  messages: { role: string; content: string }[],
  userMessage: string
) {
  try {
    const headers = await getAuthHeader()
    const res = await fetch(`${API_URL}/ai/support`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ messages, message: userMessage }),
    })

    if (!res.ok) return { error: "AI assistant unavailable" }
    return { success: true, data: await res.json() }
  } catch {
    return { error: "AI service unavailable. Please try again." }
  }
}
