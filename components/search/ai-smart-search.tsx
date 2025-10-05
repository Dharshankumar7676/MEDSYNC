"use client"

import { useState } from "react"

export function AISmartSearch({ onNearest }: { onNearest?: (keyword: string) => void }) {
  const [q, setQ] = useState("")
  const [result, setResult] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  async function run() {
    setLoading(true)
    const res = await fetch("/api/ai/search", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: q }),
    })
    const data = await res.json().catch(() => null)
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="border rounded-lg p-3 space-y-2">
      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Search hospitals, pharmacies, medicines, blood units..."
        />
        <button
          onClick={run}
          className="px-3 py-1 rounded bg-primary text-primary-foreground disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {result ? (
        <div className="text-sm">
          <div>
            <span className="font-medium">Intent:</span> {result.intent}
          </div>
          <div>
            <span className="font-medium">Categories:</span>{" "}
            {Array.isArray(result.categories) ? result.categories.join(", ") : ""}
          </div>
          <div>
            <span className="font-medium">Entities:</span>{" "}
            {Array.isArray(result.entities) ? result.entities.join(", ") : ""}
          </div>
          <div className="mt-2">
            <button onClick={() => onNearest?.(result.normalized || q)} className="px-2 py-1 border rounded">
              Find nearest
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
