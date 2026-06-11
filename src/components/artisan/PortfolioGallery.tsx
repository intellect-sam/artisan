"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { PortfolioItem } from "@/types"

interface PortfolioGalleryProps {
  items: PortfolioItem[]
}

export function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (items.length === 0) return null

  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + items.length) % items.length : null))
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % items.length : null))

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setLightbox(i)}
            className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity"
          >
            <Image
              src={item.image_url}
              alt={item.description || `Portfolio ${i + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 text-white bg-white/20 rounded-full p-2 hover:bg-white/30"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-2xl w-full max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[lightbox].image_url}
              alt={items[lightbox].description || "Portfolio"}
              width={800}
              height={600}
              className="rounded-lg object-contain w-full h-full max-h-[75vh]"
            />
            {items[lightbox].description && (
              <p className="text-white text-center mt-2 text-sm">
                {items[lightbox].description}
              </p>
            )}
            <p className="text-gray-400 text-center text-xs mt-1">
              {lightbox + 1} / {items.length}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 text-white bg-white/20 rounded-full p-2 hover:bg-white/30"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white bg-white/20 rounded-full p-2 hover:bg-white/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  )
}
