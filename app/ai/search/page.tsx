"use client"

export const dynamic = "force-dynamic"

import AISearch from "@/components/ai/ai-search"

export default function AISearchPage() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold mb-3">AI Search</h1>
      <AISearch />
    </main>
  )
}
