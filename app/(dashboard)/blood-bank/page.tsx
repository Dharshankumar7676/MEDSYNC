"use client"

export const dynamic = "force-dynamic"

import { ResourceTable } from "@/components/widgets/resource-table"
import { StatCard } from "@/components/widgets/stat-card"
import { RoleGuard } from "@/components/auth/role-guard"

const cols = [
  { key: "group", label: "Blood Group" },
  { key: "units", label: "Units Available" },
]
const rows = [
  { group: "A+", units: 12 },
  { group: "O+", units: 18 },
  { group: "AB-", units: 3 },
]

export default function BloodBankDashboard() {
  return (
    <RoleGuard allow={["blood_bank", "admin"]}>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif', color: '#2A7F8E' }}>Blood Bank Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Available Units" value={24} />
            <StatCard title="Urgent Requests" value={2} />
            <StatCard title="Donors Today" value={5} />
            <StatCard title="Alerts" value={1} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            <div className="rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] bg-[var(--color-bg)]" style={{ borderColor: '#A3C9E2', boxShadow: '0 4px 32px #A3C9E233' }}>
              <div className="font-medium mb-2 text-xl" style={{ color: '#2A7F8E' }}>Blood Inventory</div>
              <ResourceTable rows={rows} columns={cols} />
            </div>
            <div className="rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] bg-[var(--color-bg)]" style={{ borderColor: '#A3C9E2', boxShadow: '0 4px 32px #A3C9E233' }}>
              <div className="font-medium mb-2 text-xl" style={{ color: '#2A7F8E' }}>Urgent Requests</div>
              <ResourceTable rows={rows} columns={cols} />
            </div>
        </div>
      </div>
    </RoleGuard>
  )
}
