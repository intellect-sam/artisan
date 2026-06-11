import apiClient from "@/lib/axios"

export interface InitiatePaymentPayload {
  booking_id: string
  amount: number
}

export interface WithdrawPayload {
  amount: number
  bank_name: string
  account_number: string
  account_name: string
}

export const paymentsApi = {
  initiate: (payload: InitiatePaymentPayload) =>
    apiClient.post<{ authorization_url: string; reference: string }>("/payments/initiate", payload).then((r) => r.data),

  verify: (reference: string) =>
    apiClient.get(`/payments/verify/${reference}`).then((r) => r.data),

  release: (bookingId: string) =>
    apiClient.post(`/payments/release/${bookingId}`).then((r) => r.data),

  withdraw: (payload: WithdrawPayload) =>
    apiClient.post("/payments/withdraw", payload).then((r) => r.data),

  getEarnings: () =>
    apiClient.get("/payments/earnings").then((r) => r.data),
}
