"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Trash2, Upload, ImagePlus, AlertCircle } from "lucide-react"
import type { PortfolioItem } from "@/types"

const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: "p1",
    image_url:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    description: "Bathroom pipe installation",
    created_at: "2024-11-01",
  },
  {
    id: "p2",
    image_url:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400",
    description: "Kitchen plumbing repair",
    created_at: "2024-10-15",
  },
  {
    id: "p3",
    image_url:
      "https://images.unsplash.com/photo-1593347575746-2d8e32aa8af2?w=400",
    description: "Toilet cistern replacement",
    created_at: "2024-09-20",
  },
  {
    id: "p4",
    image_url:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
    description: "Complete bathroom refit",
    created_at: "2024-08-10",
  },
]

const MAX_PHOTOS = 20

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO)
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [uploadDescription, setUploadDescription] = useState("")
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadPreview, setUploadPreview] = useState<string>("")

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    setPortfolio((prev) => prev.filter((p) => p.id !== deleteTarget.id))
    toast.success("Photo removed from portfolio")
    setDeleteTarget(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setUploadPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleUpload = () => {
    if (!uploadFile && !uploadPreview) {
      toast.error("Please select a photo to upload")
      return
    }
    if (!uploadDescription.trim()) {
      toast.error("Please add a description")
      return
    }
    const newItem: PortfolioItem = {
      id: `p${Date.now()}`,
      image_url:
        uploadPreview ||
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      description: uploadDescription,
      created_at: new Date().toISOString().split("T")[0],
    }
    setPortfolio((prev) => [newItem, ...prev])
    toast.success("Photo added to portfolio!")
    setUploadOpen(false)
    setUploadDescription("")
    setUploadFile(null)
    setUploadPreview("")
  }

  const atLimit = portfolio.length >= MAX_PHOTOS

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Portfolio</h1>
          <p className="text-gray-500 text-sm mt-1">
            Showcase your best work to attract more customers
          </p>
        </div>
        <Button
          onClick={() => {
            if (atLimit) {
              toast.error(`You've reached the maximum of ${MAX_PHOTOS} photos`)
              return
            }
            setUploadOpen(true)
          }}
          className="bg-primary hover:bg-primary/90 text-white gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Photo
        </Button>
      </div>

      {/* Count */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-500">
          {portfolio.length} / {MAX_PHOTOS} photos
        </span>
        {atLimit && (
          <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
            <AlertCircle className="w-3 h-3" />
            Limit reached
          </span>
        )}
      </div>

      {/* Portfolio Grid */}
      {portfolio.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ImagePlus className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">No photos yet</h3>
          <p className="text-sm text-gray-500 mb-4">
            Upload photos of your completed work to build trust with customers
          </p>
          <Button
            onClick={() => setUploadOpen(true)}
            variant="outline"
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload your first photo
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {portfolio.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100 aspect-square shadow-sm hover:shadow-md transition-shadow"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image_url}
                alt={item.description}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <p className="text-white text-xs font-medium line-clamp-2 mb-2">
                  {item.description}
                </p>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="self-end bg-red-500 hover:bg-red-600 text-white rounded-lg p-1.5 transition-colors"
                  title="Delete photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              {/* Date tag */}
              <div className="absolute top-2 left-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full">
                {new Date(item.created_at).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Remove Photo</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove &quot;{deleteTarget?.description}&quot; from
              your portfolio? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-2">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Remove Photo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Portfolio Photo</DialogTitle>
            <DialogDescription>
              Add a photo of your completed work to showcase your skills
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {/* File input */}
            <div>
              <Label htmlFor="photo-upload" className="text-sm font-medium mb-1.5 block">
                Select Photo
              </Label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary/40 transition-colors">
                {uploadPreview ? (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={uploadPreview}
                      alt="Preview"
                      className="max-h-40 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-xs text-gray-500 mt-2">{uploadFile?.name}</p>
                  </div>
                ) : (
                  <div>
                    <ImagePlus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-1">
                      Click to select a photo
                    </p>
                    <p className="text-xs text-gray-400">JPG, PNG up to 5MB</p>
                  </div>
                )}
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-3 text-sm"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="photo-description" className="text-sm font-medium mb-1.5 block">
                Description
              </Label>
              <textarea
                id="photo-description"
                rows={3}
                placeholder="Describe the work done (e.g. Installed new bathroom pipes and fixtures)"
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 mt-4">
            <Button variant="outline" onClick={() => setUploadOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              className="bg-primary hover:bg-primary/90 text-white gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Photo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
