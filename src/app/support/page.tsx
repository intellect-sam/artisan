"use client"

import { useState, useRef, useEffect } from "react"
import { Headphones, Send, Bot } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { ChatBubble } from "@/components/shared/ChatBubble"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { SupportMessage } from "@/types"

// ---------------------------------------------------------------------------
// Suggested questions
// ---------------------------------------------------------------------------
const SUGGESTED_QUESTIONS = [
  "How do I find a plumber in Lagos?",
  "How does payment work?",
  "How do I verify an artisan?",
  "My artisan didn't show up, what do I do?",
]

// ---------------------------------------------------------------------------
// Mock AI responses
// ---------------------------------------------------------------------------
function getMockResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase()

  if (msg.includes("plumber") || msg.includes("find")) {
    return "To find a plumber near you, go to our Artisan Search page, select 'Plumber' as the trade, enter your state, and click Search. You can filter by rating and availability."
  }
  if (msg.includes("payment") || msg.includes("pay")) {
    return "ArtisanConnect uses secure escrow payments via Paystack. You pay after booking is confirmed, and the funds are held safely until you confirm the job is done."
  }
  if (msg.includes("verify")) {
    return "All artisans on our platform go through identity verification. Look for the blue verified badge on their profile. Only artisans with verified NIN get this badge."
  }
  if (msg.includes("didn't show") || msg.includes("no show") || msg.includes("didnt show")) {
    return "We're sorry to hear that! Please raise a dispute through your booking page. Our team will investigate and either reschedule or provide a refund within 48 hours."
  }
  return "I understand your concern. Our support team can help you with that. Please describe your issue in more detail and I'll assist you or connect you to a human agent if needed."
}

// ---------------------------------------------------------------------------
// Initial welcome message
// ---------------------------------------------------------------------------
const WELCOME_MESSAGE: SupportMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm ArtisanConnect Support. I'm here to help you find artisans, manage bookings, and resolve any issues. How can I help you today? 😊",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function SupportPage() {
  const [messages, setMessages] = useState<SupportMessage[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    setHasInteracted(true)
    setInput("")

    const userMsg: SupportMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const aiMsg: SupportMessage = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: getMockResponse(trimmed),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, aiMsg])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />

      {/* ── Chat area ── */}
      <div className="flex flex-col flex-1 min-h-0 max-w-3xl w-full mx-auto px-4 sm:px-6 pb-4">
        {/* Chat header */}
        <div className="flex items-center gap-3 py-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-base">ArtisanConnect Support</h1>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
              Online · Typically replies instantly
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 min-h-0">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              role={msg.role}
              content={msg.content}
              timestamp={msg.timestamp}
            />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-400">ArtisanConnect AI is typing...</span>
                  <span className="flex gap-0.5">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Suggested questions (shown before first interaction) */}
          {!hasInteracted && !isTyping && (
            <div className="pt-2 space-y-2">
              <p className="text-xs text-gray-400 text-center">Suggested questions</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs bg-white border border-gray-200 text-gray-600 rounded-full px-3 py-2 hover:border-primary hover:text-primary transition-colors shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── Input bar ── */}
        <div className="border-t border-gray-200 bg-gray-50 pt-3 pb-2">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/30 transition">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="border-0 shadow-none focus-visible:ring-0 p-0 h-auto text-sm bg-transparent"
              disabled={isTyping}
            />
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white rounded-full w-8 h-8 p-0 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            AI responses are for guidance only · For urgent help call{" "}
            <a href="tel:+2348001234567" className="text-primary hover:underline">
              +234 800 ARTISAN
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
