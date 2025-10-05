"use client"

export const dynamic = "force-dynamic"

import { RoleGuard } from "@/components/auth/role-guard"
import { StatCard } from "@/components/widgets/stat-card"
import { ResourceTable } from "@/components/widgets/resource-table"
import { LineMetric } from "@/components/widgets/charts"

const vitalsHistory = Array.from({ length: 8 }, (_, i) => ({ visit: i + 1, bp: 110 + Math.round(Math.random() * 20) }))

const labs = [
  { test: "CBC", result: "Normal", date: "2025-09-01" },
  { test: "HbA1c", result: "6.8%", date: "2025-08-20" },
  { test: "Lipid Profile", result: "Borderline", date: "2025-07-11" },
]

export default function PatientRecordsPage() {
  const cols = [
    { key: "test", label: "Test" },
    { key: "result", label: "Result" },
    { key: "date", label: "Date" },
  ]
  return (
    <RoleGuard allow={["patient", "admin"]}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Last BP" value="120/80" />
          <StatCard title="Resting HR" value={76} />
          <StatCard title="BMI" value={22.8} />
        </div>
        <div className="rounded-2xl border p-6 bg-[var(--color-surface)]/40">
          <div className="text-lg font-semibold mb-3">BP Trend</div>
          <LineMetric data={vitalsHistory} x="visit" y="bp" />
        </div>
        <div>
          <div className="text-lg font-semibold mb-3">Lab Results</div>
          <ResourceTable rows={labs} columns={cols} />
        </div>
      </div>
    </RoleGuard>
  )
}
