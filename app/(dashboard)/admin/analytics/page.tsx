"use client"

export const dynamic = "force-dynamic"

import { StatCard } from "@/components/widgets/stat-card"
import { ResourceTable } from "@/components/widgets/resource-table"
import { PieMetric, LineMetric, BarMetric } from "@/components/widgets/charts"
import { RoleGuard } from "@/components/auth/role-guard"

// Shaped after scripts/sql/010_analytics.sql idea: counts over time and by category
const traffic = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, events: Math.round(100 + Math.random() * 200) }))
const statusBreakdown = [
  { name: "Appointments", value: 320 },
  { name: "Prescriptions", value: 210 },
  { name: "Resources", value: 140 },
]

const recentAlerts = [
  { type: "Info", message: "New patient registration", time: "2 min ago" },
  { type: "Warning", message: "Stock low: Amoxicillin", time: "15 min ago" },
  { type: "Critical", message: "System maintenance upcoming", time: "1 hr ago" },
]

export default function AdminAnalyticsPage() {
  const cols = [
    { key: "type", label: "Type" },
    { key: "message", label: "Message" },
    { key: "time", label: "Time" },
  ]

  const kpis = [
    { title: "Daily Active", value: 432 },
    { title: "New Users", value: 27 },
    { title: "Errors (24h)", value: 3 },
    { title: "Avg. Latency", value: "142ms" },
  ]

  return (
    <RoleGuard allow={["admin"]}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {kpis.map((k) => (
            <StatCard key={k.title} title={k.title} value={k.value} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border p-6 bg-[var(--color-surface)]/40">
            <div className="text-lg font-semibold mb-3">Events (last 12 mo)</div>
            <LineMetric data={traffic} x="month" y="events" />
          </div>
          <div className="rounded-2xl border p-6 bg-[var(--color-surface)]/40">
            <div className="text-lg font-semibold mb-3">Categories</div>
            <PieMetric data={statusBreakdown} nameKey="name" valueKey="value" />
          </div>
        </div>

        <div>
          <div className="text-lg font-semibold mb-3">Recent Alerts</div>
          <ResourceTable rows={recentAlerts} columns={cols} pageSize={6} />
        </div>
      </div>
    </RoleGuard>
  )
}
