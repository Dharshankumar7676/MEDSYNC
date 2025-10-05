"use client"

export const dynamic = "force-dynamic"

import useSWR from "swr"
import ResourceMap from "@/components/maps/resource-map"
import { API_BASE } from "@/lib/api"
import { useState } from "react"

export default function ResourcesPage() {
  const [type, setType] = useState<string>("")
  const [q, setQ] = useState("")
const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((r) => r.json())
  const { data, isLoading, mutate } = useSWR(
    `${API_BASE}/resources?type=${encodeURIComponent(type)}&q=${encodeURIComponent(q)}`,
    fetcher,
  )

  const resources = data || []
  return (
    <main className="p-4 space-y-4">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="text-sm">Search</label>
          <input
            className="w-full rounded-md border bg-background px-3 py-2"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm">Type</label>
          <select
            className="w-48 rounded-md border bg-background px-3 py-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Any</option>
            <option value="hospital">Hospital</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="blood_bank">Blood Bank</option>
            <option value="clinic">Clinic</option>
          </select>
        </div>
        <button className="rounded-md bg-primary text-primary-foreground px-3 py-2" onClick={() => mutate()}>
          Apply
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-md border bg-card p-3">
          <div className="text-sm font-medium mb-2">Results</div>
          <div className="max-h-[420px] overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-background">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Tags</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((r: any) => (
                  <tr key={r.id} className="hover:bg-muted">
                    <td className="p-2">{r.name}</td>
                    <td className="p-2 uppercase">{r.type}</td>
                    <td className="p-2">{(r.tags || []).join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <ResourceMap resources={resources} center={[20.5937, 78.9629]} />
        </div>
      </div>
    </main>
  )
}
