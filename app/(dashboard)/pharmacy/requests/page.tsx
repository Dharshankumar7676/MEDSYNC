"use client"

export const dynamic = "force-dynamic"

import { RoleGuard } from "@/components/auth/role-guard"
import { ResourceTable } from "@/components/widgets/resource-table"

const requests = [
  { id: "req_7001", medicine: "Paracetamol 650mg", qty: 20, status: "Pending" },
  { id: "req_7002", medicine: "Cetirizine 10mg", qty: 10, status: "Fulfilled" },
  { id: "req_7003", medicine: "Amoxicillin 500mg", qty: 12, status: "Pending" },
]

export default function PharmacyRequestsPage() {
  const cols = [
    { key: "id", label: "Request ID" },
    { key: "medicine", label: "Medicine" },
    { key: "qty", label: "Qty" },
    { key: "status", label: "Status" },
  ]
  return (
    <RoleGuard allow={["pharmacy", "admin"]}>
      <div className="space-y-8">
        <div>
          <div className="text-lg font-semibold mb-3">Requests</div>
          <ResourceTable rows={requests} columns={cols} />
        </div>
      </div>
    </RoleGuard>
  )
}
