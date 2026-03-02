"use client"

import { useState, useRef } from "react"

const SOPHIE = {
  slug: "sophie-chen",
  name: "Sophie Chen",
  age: 28,
  location: "San Diego, CA",
  occupation: "Pharmacist",
  avatar: null,
  facts: [
    "UCSD grad, grew up in the Bay Area",
    "Half-Chinese, half-white",
    "Runs on the beach every morning",
    "On Hinge on and off for 8 months",
    "Wants kids eventually, done with guys who aren't sure",
    "Finds ambition attractive — not wealth, direction",
    "Low-drama, takes time to open up",
    "Slightly insufferable about cooking",
  ],
}

type Message = {
  role: "user" | "assistant"
  content: string
  images?: string[] // base64 data URLs
}

export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [images, setImages] = useState<{ base64: string; dataUrl: string }[]>(
    []
  )
  const [loading, setLoading] = useState(false)
  const [showPersona, setShowPersona] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function compressImage(
    file: File,
    maxPx = 1200,
    quality = 0.82
  ): Promise<{ base64: string; dataUrl: string }> {
    return new Promise((resolve) => {
      const img = new window.Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        let { width, height } = img
        if (width > maxPx || height > maxPx) {
          if (width > height) {
            height = Math.round((height * maxPx) / width)
            width = maxPx
          } else {
            width = Math.round((width * maxPx) / height)
            height = maxPx
          }
        }
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        canvas.getContext("2d")!.drawImage(img, 0, 0, width, height)
        const dataUrl = canvas.toDataURL("image/jpeg", quality)
        URL.revokeObjectURL(url)
        resolve({ base64: dataUrl.split(",")[1], dataUrl })
      }
      img.src = url
    })
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const loaded = await Promise.all(files.map((file) => compressImage(file)))
    setImages((prev) => [...prev, ...loaded])
    e.target.value = ""
  }

  async function handleSend() {
    if (!input.trim() && images.length === 0) return

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      images: images.map((i) => i.dataUrl),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setImages([])
    setLoading(true)

    // Build API messages (all prior + this one)
    const apiMessages = updatedMessages.map((m) => {
      if (m.role === "user" && m.images?.length) {
        const blocks: unknown[] = []
        for (const dataUrl of m.images) {
          blocks.push({
            type: "image",
            source: {
              type: "base64",
              media_type: "image/jpeg",
              data: dataUrl.split(",")[1],
            },
          })
        }
        if (m.content) blocks.push({ type: "text", text: m.content })
        return { role: "user" as const, content: blocks }
      }
      return { role: m.role as "user" | "assistant", content: m.content }
    })

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ persona: SOPHIE.slug, messages: apiMessages }),
    })
    const data = await res.json()

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.response.text },
    ])
    setLoading(false)
  }

  return (
    <div className="flex flex-col sm:flex-row h-[100dvh] bg-zinc-950 text-white font-sans">
      {/* Left: Persona card — hidden on mobile, visible on sm+ */}
      <aside className="hidden sm:flex w-72 shrink-0 border-r border-zinc-800 flex-col p-6 gap-6">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">
            Persona
          </p>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-xl font-semibold text-zinc-300">
              {SOPHIE.name[0]}
            </div>
            <div>
              <p className="font-semibold text-white">{SOPHIE.name}</p>
              <p className="text-sm text-zinc-400">
                {SOPHIE.age} · {SOPHIE.location}
              </p>
            </div>
          </div>
          <p className="text-sm text-zinc-400">{SOPHIE.occupation}</p>
        </div>

        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">
            About her
          </p>
          <ul className="space-y-2">
            {SOPHIE.facts.map((fact, i) => (
              <li key={i} className="flex gap-2 text-sm text-zinc-300">
                <span className="text-zinc-600 mt-0.5">—</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <p className="text-xs text-zinc-600">
            Powered by <span className="text-zinc-400">Refolk</span>
          </p>
        </div>
      </aside>

      {/* Right: Chat */}
      <main className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="border-b border-zinc-800 px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-300 shrink-0">
            {SOPHIE.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-medium">{SOPHIE.name}</span>
            <p className="text-xs text-zinc-500 sm:hidden">
              {SOPHIE.age} · {SOPHIE.occupation}
            </p>
          </div>
          {/* Mobile persona toggle */}
          <button
            onClick={() => setShowPersona((v) => !v)}
            className="sm:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label="Toggle persona info"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </button>
        </div>

        {/* Mobile persona drawer */}
        {showPersona && (
          <div className="sm:hidden border-b border-zinc-800 bg-zinc-900 px-4 py-4">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">
              About her
            </p>
            <ul className="space-y-2">
              {SOPHIE.facts.map((fact, i) => (
                <li key={i} className="flex gap-2 text-sm text-zinc-300">
                  <span className="text-zinc-600 mt-0.5">—</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col gap-3 sm:gap-4 min-h-0">
          {messages.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-zinc-600 text-sm px-4 text-center">
              Send a message to start the conversation
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col gap-2 max-w-[88%] sm:max-w-[75%] ${
                msg.role === "user"
                  ? "self-end items-end"
                  : "self-start items-start"
              }`}
            >
              {/* Images */}
              {msg.images && msg.images.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-end">
                  {msg.images.map((src, j) => (
                    <img
                      key={j}
                      src={src}
                      alt=""
                      className="rounded-2xl max-w-[180px] max-h-[180px] object-cover"
                    />
                  ))}
                </div>
              )}
              {/* Text bubble */}
              {msg.content && (
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-zinc-800 text-zinc-100 rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="self-start">
              <div className="bg-zinc-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>

        {/* Image previews */}
        {images.length > 0 && (
          <div className="px-3 sm:px-6 pt-3 flex gap-2 flex-wrap border-t border-zinc-800">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img.dataUrl}
                  alt=""
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <button
                  onClick={() =>
                    setImages((prev) => prev.filter((_, j) => j !== i))
                  }
                  className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-600 hover:bg-zinc-500 rounded-full text-xs flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-zinc-800 px-3 sm:px-4 py-3 sm:py-4 flex gap-2 sm:gap-3 items-end">
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
            title="Add image"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Message Sophie..."
            rows={1}
            className="flex-1 bg-zinc-800 rounded-2xl px-4 py-2.5 text-base sm:text-sm text-white placeholder-zinc-500 resize-none outline-none focus:ring-1 focus:ring-zinc-600 max-h-32"
          />
          <button
            onClick={handleSend}
            disabled={loading || (!input.trim() && images.length === 0)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-blue-500 hover:text-blue-400 disabled:text-zinc-700 transition-colors shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 21L23 12 2 3v7l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  )
}
