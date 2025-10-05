"use client"

import { ResourceTable } from "@/components/widgets/resource-table"
import { StatCard } from "@/components/widgets/stat-card"
import { RoleGuard } from "@/components/auth/role-guard"

const cols = [
  { key: "name", label: "Medicine" },
  { key: "batch", label: "Batch" },
  { key: "expiry", label: "Expiry" },
  { key: "qty", label: "Qty" },
]

const rows = [
  { name: "Amoxicillin 500mg", batch: "AMX-001", expiry: "2026-02-01", qty: 42 },
  { name: "Paracetamol 650mg", batch: "PAR-221", expiry: "2025-12-15", qty: 10 },
  { name: "Cetirizine 10mg", batch: "CET-033", expiry: "2025-08-01", qty: 5 },
]

export default function PharmacyDashboard() {
  return (
    <RoleGuard allow={["pharmacy", "admin"]}>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif', color: '#2A7F8E' }}>Pharmacy Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Pending Orders" value={7} />
            <StatCard title="Inventory Alerts" value={2} />
            <StatCard title="Fulfilled Prescriptions" value={12} />
            <StatCard title="Unread Reports" value={1} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            <div className="rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] bg-[var(--color-bg)]" style={{ borderColor: '#A3C9E2', boxShadow: '0 4px 32px #A3C9E233' }}>
              <div className="font-medium mb-2 text-xl" style={{ color: '#2A7F8E' }}>Inventory Overview</div>
              <ResourceTable rows={inventoryRows} columns={inventoryCols} />
            </div>
            <div className="rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] bg-[var(--color-bg)]" style={{ borderColor: '#A3C9E2', boxShadow: '0 4px 32px #A3C9E233' }}>
              <div className="font-medium mb-2 text-xl" style={{ color: '#2A7F8E' }}>Recent Orders</div>
              <ResourceTable rows={orderRows} columns={orderCols} />
            </div>
        </div>
      </div>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Pending Orders" value={7} />
            <StatCard title="Inventory Alerts" value={2} />
            <StatCard title="Fulfilled Prescriptions" value={12} />
            <StatCard title="Unread Reports" value={1} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            <div className="rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg,#181818 80%,#a259f7 100%)', borderColor: '#a259f7', boxShadow: '0 4px 32px #a259f733' }}>
              <div className="font-medium mb-2 text-xl" style={{ color: '#b80000' }}>Inventory Overview</div>
              <ResourceTable rows={inventoryRows} columns={inventoryCols} />
            </div>
            <div className="rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg,#181818 80%,#1db954 100%)', borderColor: '#1db954', boxShadow: '0 4px 32px #1db95433' }}>
              <div className="font-medium mb-2 text-xl" style={{ color: '#a259f7' }}>Recent Orders</div>
              <ResourceTable rows={orderRows} columns={orderCols} />
            </div>
          </div>
        </div>
    </RoleGuard>
  )
}
