"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PulseChat({ compact = false }: { compact?: boolean }) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!input.trim() || loading) return
    
    const userMsg = { role: "user" as const, content: input }
    const sampleMessages = [
      { role: "system", content: "Sample Data: Patient: Ramesh, Bangalore, Age 32, Diabetes. Doctor: Dr. Priya, Bangalore, Cardiologist. Pharmacy: GreenMed, MG Road, Bangalore. Blood Bank: RedCross, Indiranagar, Bangalore. Admin: Suresh, Bangalore Hospital Admin." }
    ]
    const allMessages = [...messages, userMsg, ...sampleMessages]
    
    setMessages((m) => [...m, userMsg])
    setInput("")
    setLoading(true)
    
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: allMessages }),
      })
      const data = await res.json()
      if (!res.ok || data.error) {
        throw new Error(data.error || "Unknown error")
      }
      setMessages((m) => [...m, { role: "assistant", content: data.reply }])
    } catch (e: any) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `Sorry, I couldn't process that. ${e.message || "Please try again."}` },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn(
      "rounded-xl border shadow-lg flex flex-col bg-gradient-to-br from-background to-muted/20 backdrop-blur-xl",
      compact ? "h-[480px]" : "h-[calc(100vh-12rem)]"
    )}>
      <div className="p-4 border-b bg-muted/50">
        <h2 className="font-semibold text-lg bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Pulse Assistant</h2>
        <p className="text-sm text-muted-foreground">Your healthcare AI companion</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            Ask me anything about healthcare, appointments, or medical resources.
          </div>
        )}
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={cn(
              "max-w-[85%] px-4 py-3 rounded-xl text-sm",
              m.role === "user" 
                ? "bg-primary text-primary-foreground self-end ml-auto rounded-br-sm" 
                : "bg-muted self-start rounded-bl-sm"
            )}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="self-start bg-muted rounded-xl rounded-bl-sm px-4 py-3 text-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" />
          </div>
        )}
      </div>
      
      <div className="p-4 border-t bg-background/50">
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            send()
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Pulse anything..."
            className="flex-1"
            disabled={loading}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={loading || !input.trim()}
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
