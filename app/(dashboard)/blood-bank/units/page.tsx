"use client"

export const dynamic = "force-dynamic"

import { RoleGuard } from "@/components/auth/role-guard"
import { ResourceTable } from "@/components/widgets/resource-table"
import { StatCard } from "@/components/widgets/stat-card"

const units = [
  { group: "A+", units: 12, updated_at: "2025-09-30" },
  { group: "O+", units: 18, updated_at: "2025-09-30" },
  { group: "AB-", units: 3, updated_at: "2025-09-30" },
]

export default function BloodBankUnitsPage() {
  const cols = [
    { key: "group", label: "Blood Group" },
    { key: "units", label: "Units Available" },
    { key: "updated_at", label: "Updated" },
  ]
  const total = units.reduce((a, b) => a + b.units, 0)
  const low = units.filter(u => u.units < 5).length

  return (
    <RoleGuard allow={["blood_bank", "admin"]}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Units" value={total} />
          <StatCard title="Low Groups" value={low} />
          <StatCard title="Groups Tracked" value={units.length} />
        </div>
        <div>
          <div className="text-lg font-semibold mb-3">Blood Units</div>
          <ResourceTable rows={units} columns={cols} />
        </div>
      </div>
    </RoleGuard>
  )
}
