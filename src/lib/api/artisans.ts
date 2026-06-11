import apiClient from "@/lib/axios"
import type { Artisan, ArtisanFilters, PaginatedResponse, PortfolioItem } from "@/types"

export const artisansApi = {
  search: (filters: ArtisanFilters) =>
    apiClient
      .get<PaginatedResponse<Artisan>>("/artisans", { params: filters })
      .then((r) => r.data),

  getProfile: (id: string) =>
    apiClient.get<Artisan>(`/artisans/${id}`).then((r) => r.data),

  getMyProfile: () =>
    apiClient.get<Artisan>("/artisans/me").then((r) => r.data),

  updateProfile: (data: Partial<Artisan>) =>
    apiClient.put<Artisan>("/artisans/me", data).then((r) => r.data),

  addPortfolioItem: (formData: FormData) =>
    apiClient
      .post<PortfolioItem>("/artisans/me/portfolio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),

  deletePortfolioItem: (itemId: string) =>
    apiClient.delete(`/artisans/me/portfolio/${itemId}`).then((r) => r.data),

  toggleAvailability: () =>
    apiClient.post<{ is_available: boolean }>("/artisans/me/availability").then((r) => r.data),
}
