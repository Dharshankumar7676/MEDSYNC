"use client"

export const dynamic = "force-dynamic"
import { StatCard } from "@/components/widgets/stat-card"
import { LeafletMap } from "@/components/maps/leaflet-map"
import { LineMetric } from "@/components/widgets/charts"
import { AISmartSearch } from "@/components/search/ai-smart-search"
import { apiFetch } from "@/lib/api"
import { RoleGuard } from "@/components/auth/role-guard"

export default function PatientDashboard() {
  // Mock data for charts
  const visits = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, count: Math.round(2 + Math.random() * 4) }))

  async function handleNearest(keyword: string) {
    // naive: try pharmacy first for medicine keywords
    const pos = { lat: 12.9716, lng: 77.5946 } // TODO: get geolocation
    const type = /blood|A\+|O-|AB/.test(keyword)
      ? "blood_bank"
      : /tablet|cap|mg|ml|medicine|pharma/i.test(keyword)
        ? "pharmacy"
        : "hospital"
    const data = await apiFetch<{ results: any[] }>(
      `/geo/nearest?type=${type}&lat=${pos.lat}&lng=${pos.lng}&radius_km=10&need=${encodeURIComponent(keyword)}`,
    )
    alert(`Found ${data.results.length} nearby ${type}(s)`)
  }

  const markers = [
    {
      id: "h1",
      name: "CityCare Hospital",
      position: [12.9716, 77.5946] as [number, number],
      type: "hospital" as const,
    },
  ]

  return (
    <RoleGuard allow={["patient", "admin"]}>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif', color: '#2A7F8E' }}>Patient Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Upcoming Appointments" value={2} />
          <StatCard title="Prescriptions" value={6} />
          <StatCard title="Alerts" value={1} />
          <StatCard title="Unread Reports" value={3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          <div className="rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] bg-[var(--color-bg)]" style={{ borderColor: '#A3C9E2', boxShadow: '0 4px 32px #A3C9E233' }}>
            <div className="font-medium mb-2 text-xl" style={{ color: '#2A7F8E' }}>Visits Over Time</div>
            <LineMetric data={visits} x="month" y="count" />
          </div>
          <div className="rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg,#181818 80%,#1db954 100%)', borderColor: '#1db954', boxShadow: '0 4px 32px #1db95433' }}>
            <div className="font-medium mb-2 text-xl" style={{ color: '#b80000' }}>Find Nearby Resources</div>
            <AISmartSearch onNearest={handleNearest} />
            <div className="mt-3">
              <LeafletMap markers={markers} />
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
