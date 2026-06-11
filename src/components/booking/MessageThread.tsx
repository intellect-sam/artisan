"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatBubble } from "@/components/shared/ChatBubble"
import type { Message } from "@/types"

interface MessageThreadProps {
  initialMessages: Message[]
  currentUserId: string
}

export function MessageThread({ initialMessages, currentUserId }: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      booking_id: initialMessages[0]?.booking_id ?? "",
      sender_id: currentUserId,
      sender_role: "customer",
      content: trimmed,
      created_at: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMsg])
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col gap-0">
      {/* Message list */}
      <div className="flex flex-col gap-3 p-4 min-h-[280px] max-h-[400px] overflow-y-auto bg-gray-50 rounded-t-lg">
        {messages.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-8">
            No messages yet. Start the conversation!
          </p>
        )}
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            role={msg.sender_id === currentUserId ? "user" : "assistant"}
            content={msg.content}
            timestamp={new Date(msg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 p-3 border border-t-0 border-gray-200 rounded-b-lg bg-white">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button
          onClick={handleSend}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white shrink-0"
          disabled={!input.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
