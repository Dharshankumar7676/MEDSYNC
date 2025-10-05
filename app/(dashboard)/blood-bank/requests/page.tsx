"use client"

export const dynamic = "force-dynamic"

import { RoleGuard } from "@/components/auth/role-guard"
import { ResourceTable } from "@/components/widgets/resource-table"

const requests = [
  { id: "br_9001", group: "O+", units: 2, requester: "CityCare", status: "Pending" },
  { id: "br_9002", group: "AB-", units: 1, requester: "Sunrise", status: "Fulfilled" },
]

export default function BloodBankRequestsPage() {
  const cols = [
    { key: "id", label: "Request ID" },
    { key: "group", label: "Group" },
    { key: "units", label: "Units" },
    { key: "requester", label: "Requester" },
    { key: "status", label: "Status" },
  ]
  return (
    <RoleGuard allow={["blood_bank", "admin"]}>
      <div className="space-y-8">
        <div>
          <div className="text-lg font-semibold mb-3">Requests</div>
          <ResourceTable rows={requests} columns={cols} />
        </div>
      </div>
    </RoleGuard>
  )
}
