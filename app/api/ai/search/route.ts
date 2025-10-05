import type { NextRequest } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { query, context } = body as { query: string; context?: any }

  const { text } = await generateText({
    model: google("gemini-1.5-flash"),
    prompt: `
You are an assistant that classifies and expands a healthcare search query.
Return JSON with: { "categories": string[], "entities": string[], "intent": string, "normalized": string }.
Query: "${query}"
Optional Context (JSON): ${JSON.stringify(context || {})}
Respond with JSON only.`,
  })

  // pass-through text; client will parse JSON
  return new Response(text, { headers: { "content-type": "application/json" } })
}
