"use client"
import { useState } from "react"
import { API_BASE, authHeader } from "@/lib/api"
import ResourceMap from "@/components/maps/resource-map"

type Resource = {
  id: string
  type: "hospital" | "pharmacy" | "blood_bank" | "clinic"
  name: string
  address?: string
  latitude: number
  longitude: number
  distance_km?: number
  tags?: string[]
}

export default function AISearch() {
  const [query, setQuery] = useState("")
  const [type, setType] = useState<string | undefined>(undefined)
  const [loc, setLoc] = useState<[number, number] | null>(null)
  const [results, setResults] = useState<Resource[]>([])
  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getLocation = () =>
    new Promise<[number, number]>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve([pos.coords.latitude, pos.coords.longitude]),
        (err) => reject(err),
        { enableHighAccuracy: true },
      ),
    )

  const run = async () => {
    setLoading(true)
    let lat: number | undefined
    let lng: number | undefined
    try {
      const [a, b] = await getLocation()
      setLoc([a, b])
      lat = a
      lng = b
    } catch {}
    const res = await fetch(`${API_BASE}/ai/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({ query, type, lat, lng }),
    })
    const data = await res.json()
    setResults(data.results || [])
    setSummary(data.ai_summary || null)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-2">
        <div className="flex-1">
          <label className="text-sm">Query</label>
          <input
            className="w-full rounded-md border bg-background px-3 py-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm">Type</label>
          <select
            className="w-48 rounded-md border bg-background px-3 py-2"
            value={type || ""}
            onChange={(e) => setType(e.target.value || undefined)}
          >
            <option value="">Any</option>
            <option value="hospital">Hospital</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="blood_bank">Blood Bank</option>
            <option value="clinic">Clinic</option>
          </select>
        </div>
        <button className="rounded-md bg-primary text-primary-foreground px-4 py-2" onClick={run} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {summary && <div className="rounded-md border bg-card p-3 text-sm">{summary}</div>}

      {results.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-md border bg-card p-3">
            <div className="text-sm font-medium mb-2">Results</div>
            <div className="max-h-[420px] overflow-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-background">
                  <tr>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.id} className="hover:bg-muted">
                      <td className="p-2">{r.name}</td>
                      <td className="p-2 uppercase">{r.type}</td>
                      <td className="p-2">{r.distance_km ? `${r.distance_km.toFixed(1)} km` : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <ResourceMap resources={results} center={loc || [20.5937, 78.9629]} />
          </div>
        </div>
      )}
    </div>
  )
}
