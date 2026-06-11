import apiClient from "@/lib/axios"
import type { AIJobDescription, AIPriceEstimate, AIPerformanceReport, Artisan, SupportMessage } from "@/types"

export const aiApi = {
  describeJob: (rawDescription: string) =>
    apiClient
      .post<AIJobDescription>("/ai/describe-job", { description: rawDescription })
      .then((r) => r.data),

  estimatePrice: (trade: string, description: string) =>
    apiClient
      .post<AIPriceEstimate>("/ai/estimate-price", { trade, description })
      .then((r) => r.data),

  matchArtisans: (jobDescription: AIJobDescription, state: string) =>
    apiClient
      .post<Artisan[]>("/ai/match-artisans", { job: jobDescription, state })
      .then((r) => r.data),

  writeBio: (data: { trade: string; experience: number; skills: string }) =>
    apiClient.post<{ bio: string }>("/ai/write-bio", data).then((r) => r.data),

  resolveDispute: (bookingId: string, details: string) =>
    apiClient
      .post<{ resolution: string }>("/ai/resolve-dispute", { booking_id: bookingId, details })
      .then((r) => r.data),

  performanceReport: (artisanId: string) =>
    apiClient
      .get<AIPerformanceReport>(`/ai/performance-report/${artisanId}`)
      .then((r) => r.data),

  supportChat: (messages: SupportMessage[], userMessage: string) =>
    apiClient
      .post<{ response: string }>("/ai/support", { messages, message: userMessage })
      .then((r) => r.data),
}
