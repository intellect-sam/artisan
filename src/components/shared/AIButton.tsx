"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIButtonProps {
  label?: string
  loadingLabel?: string
  onClick: () => Promise<void>
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

export function AIButton({
  label = "Generate with AI",
  loadingLabel = "AI is thinking...",
  onClick,
  className,
  variant = "outline",
  size = "default",
}: AIButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      await onClick()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300",
        className
      )}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Sparkles className="w-4 h-4 mr-2" />
      )}
      {loading ? loadingLabel : label}
    </Button>
  )
}
