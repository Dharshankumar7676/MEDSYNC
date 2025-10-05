"use client"

export const dynamic = "force-dynamic"

import { RoleGuard } from "@/components/auth/role-guard"
import { ResourceTable } from "@/components/widgets/resource-table"
import { BarMetric } from "@/components/widgets/charts"

const patients = [
  { id: "p_001", name: "Ramesh", condition: "Diabetes", last_visit: "2025-09-25" },
  { id: "p_002", name: "Anita", condition: "Hypertension", last_visit: "2025-09-20" },
  { id: "p_003", name: "Kiran", condition: "Asthma", last_visit: "2025-08-30" },
]

const workload = Array.from({ length: 7 }, (_, i) => ({ day: i + 1, patients: Math.round(5 + Math.random() * 10) }))

export default function DoctorPatientsPage() {
  const cols = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "condition", label: "Condition" },
    { key: "last_visit", label: "Last Visit" },
  ]
  return (
    <RoleGuard allow={["doctor", "admin"]}>
      <div className="space-y-8">
        <div className="rounded-2xl border p-6 bg-[var(--color-surface)]/40">
          <div className="text-lg font-semibold mb-3">This Week's Workload</div>
          <BarMetric data={workload} x="day" y="patients" />
        </div>
        <div>
          <div className="text-lg font-semibold mb-3">My Patients</div>
          <ResourceTable rows={patients} columns={cols} />
        </div>
      </div>
    </RoleGuard>
  )
}
