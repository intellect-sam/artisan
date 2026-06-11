"use client"

import { create } from "zustand"
import type { ArtisanFilters } from "@/types"

interface SearchState {
  filters: ArtisanFilters
  setFilters: (filters: Partial<ArtisanFilters>) => void
  resetFilters: () => void
}

const defaultFilters: ArtisanFilters = {
  trade: "",
  state: "",
  lga: "",
  min_rating: undefined,
  available_now: false,
  sort: "rating",
  page: 1,
  limit: 12,
}

export const useSearchStore = create<SearchState>()((set) => ({
  filters: defaultFilters,
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: defaultFilters }),
}))
