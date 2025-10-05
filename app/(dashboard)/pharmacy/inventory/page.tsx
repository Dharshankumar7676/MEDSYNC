"use client"

export const dynamic = "force-dynamic"

import { RoleGuard } from "@/components/auth/role-guard"
import { ResourceTable } from "@/components/widgets/resource-table"
import { StatCard } from "@/components/widgets/stat-card"

const inventory = [
  { name: "Amoxicillin 500mg", batch: "AMX-001", expiry: "2026-02-01", qty: 42 },
  { name: "Paracetamol 650mg", batch: "PAR-221", expiry: "2025-12-15", qty: 10 },
  { name: "Cetirizine 10mg", batch: "CET-033", expiry: "2025-08-01", qty: 5 },
]

export default function PharmacyInventoryPage() {
  const cols = [
    { key: "name", label: "Medicine" },
    { key: "batch", label: "Batch" },
    { key: "expiry", label: "Expiry" },
    { key: "qty", label: "Qty" },
  ]
  const low = inventory.filter(i => i.qty < 10).length

  return (
    <RoleGuard allow={["pharmacy", "admin"]}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Items" value={inventory.length} />
          <StatCard title="Low Stock" value={low} />
          <StatCard title="Expiring Soon" value={1} />
        </div>
        <div>
          <div className="text-lg font-semibold mb-3">Inventory</div>
          <ResourceTable rows={inventory} columns={cols} />
        </div>
      </div>
    </RoleGuard>
  )
}
