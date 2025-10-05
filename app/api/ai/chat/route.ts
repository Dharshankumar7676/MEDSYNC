
import OpenAI from "openai"
import type { NextRequest } from "next/server"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://medsync.in", // Replace with your site URL
    "X-Title": "MedSync", // Replace with your site name
  },
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const messages = (body.messages || []).map((m: any) => ({ role: m.role, content: m.content }))
    if (!process.env.OPENROUTER_API_KEY) {
      return Response.json({ error: "OpenRouter API key missing. Set OPENROUTER_API_KEY in .env.local." }, { status: 500 })
    }
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages,
    })
    const reply = completion.choices?.[0]?.message?.content || "No response from AI."
    return Response.json({ reply })
  } catch (e: any) {
    console.error("AI Chat Error:", e)
    const msg = typeof e?.message === "string" ? e.message : "Chat error"
    return Response.json({ error: msg }, { status: 500 })
  }
}
