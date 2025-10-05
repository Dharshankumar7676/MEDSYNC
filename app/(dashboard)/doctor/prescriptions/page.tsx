"use client"

export const dynamic = "force-dynamic"

import { RoleGuard } from "@/components/auth/role-guard"
import { ResourceTable } from "@/components/widgets/resource-table"

const eps = [
  { rx_id: "RX-4001", patient: "Ramesh", drug: "Metformin 500mg", dose: "1-0-1", status: "Signed" },
  { rx_id: "RX-4002", patient: "Anita", drug: "Atenolol 25mg", dose: "0-1-0", status: "Pending" },
  { rx_id: "RX-4003", patient: "Kiran", drug: "Levalbuterol", dose: "PRN", status: "Signed" },
]

export default function DoctorPrescriptionsPage() {
  const cols = [
    { key: "rx_id", label: "Rx ID" },
    { key: "patient", label: "Patient" },
    { key: "drug", label: "Drug" },
    { key: "dose", label: "Dose" },
    { key: "status", label: "Status" },
  ]
  return (
    <RoleGuard allow={["doctor", "admin"]}>
      <div className="space-y-8">
        <div>
          <div className="text-lg font-semibold mb-3">E-Prescriptions</div>
          <ResourceTable rows={eps} columns={cols} />
        </div>
      </div>
    </RoleGuard>
  )
}
