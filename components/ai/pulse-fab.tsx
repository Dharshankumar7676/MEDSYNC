"use client"

import { useState } from "react"
import PulseChat from "@/components/ai/pulse-chat"

export default function PulseFab() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-3 w-[360px] max-w-[90vw] rounded-lg border bg-background shadow-lg">
          <div className="flex items-center justify-between border-b px-3 py-2">
            <div className="font-medium">Pulse Assistant</div>
            <button
              onClick={() => setOpen(false)}
              className="rounded px-2 py-1 text-sm border hover:bg-muted"
              aria-label="Close chatbot"
            >
              Close
            </button>
          </div>
          <div className="p-3">
            <PulseChat compact />
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
        aria-label="Toggle chatbot"
      >
        {open ? "–" : "AI"}
      </button>
    </div>
  )
}


