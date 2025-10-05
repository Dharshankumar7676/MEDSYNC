"use client"

export const dynamic = "force-dynamic"

import { RoleGuard } from "@/components/auth/role-guard"
import { ResourceTable } from "@/components/widgets/resource-table"
import { LineMetric } from "@/components/widgets/charts"

const prescriptions = [
  { rx_id: "RX-1001", drug: "Metformin 500mg", dose: "1-0-1", status: "Active" },
  { rx_id: "RX-1022", drug: "Atorvastatin 10mg", dose: "0-1-0", status: "Active" },
  { rx_id: "RX-1029", drug: "Aspirin 75mg", dose: "1-0-0", status: "Paused" },
]

const adherence = Array.from({ length: 6 }, (_, i) => ({ week: i + 1, adherence: Math.round(80 + Math.random() * 20) }))

export default function PatientPrescriptionsPage() {
  const cols = [
    { key: "rx_id", label: "Rx ID" },
    { key: "drug", label: "Drug" },
    { key: "dose", label: "Dose" },
    { key: "status", label: "Status" },
  ]
  return (
    <RoleGuard allow={["patient", "admin"]}>
      <div className="space-y-8">
        <div className="rounded-2xl border p-6 bg-[var(--color-surface)]/40">
          <div className="text-lg font-semibold mb-3">Medication Adherence</div>
          <LineMetric data={adherence} x="week" y="adherence" />
        </div>
        <div>
          <div className="text-lg font-semibold mb-3">Prescriptions</div>
          <ResourceTable rows={prescriptions} columns={cols} />
        </div>
      </div>
    </RoleGuard>
  )
}
