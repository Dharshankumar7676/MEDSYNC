"use client"

export const dynamic = "force-dynamic"

import { StatCard } from "@/components/widgets/stat-card"
import { ResourceTable } from "@/components/widgets/resource-table"
import { PieMetric, LineMetric, BarMetric } from "@/components/widgets/charts"
import { RoleGuard } from "@/components/auth/role-guard"

const users = [
  { id: "u_001", email: "admin@example.com", role: "admin", is_verified: true },
  { id: "u_010", email: "priya@clinic.com", role: "doctor", is_verified: true },
  { id: "u_020", email: "greenmed@pharma.com", role: "pharmacy", is_verified: true },
  { id: "u_030", email: "ramesh@user.com", role: "patient", is_verified: true },
  { id: "u_040", email: "redbank@blood.org", role: "blood_bank", is_verified: false },
]

const roleCounts = [
  { name: "Admin", value: users.filter(u => u.role === "admin").length },
  { name: "Doctors", value: users.filter(u => u.role === "doctor").length },
  { name: "Pharmacies", value: users.filter(u => u.role === "pharmacy").length },
  { name: "Blood Banks", value: users.filter(u => u.role === "blood_bank").length },
  { name: "Patients", value: users.filter(u => u.role === "patient").length },
]

export default function AdminUsersPage() {
  const cols = [
    { key: "id", label: "ID" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "is_verified", label: "Verified" },
  ]

  const activity = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, registrations: Math.round(5 + Math.random() * 12) }))

  return (
    <RoleGuard allow={["admin"]}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Users" value={users.length} />
          <StatCard title="Verified" value={users.filter(u => u.is_verified).length} />
          <StatCard title="Unverified" value={users.filter(u => !u.is_verified).length} />
          <StatCard title="Roles" value={5} hint="admin, doctor, pharmacy, blood_bank, patient" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border p-6 bg-[var(--color-surface)]/40">
            <div className="text-lg font-semibold mb-3">Registrations (last 12 mo)</div>
            <LineMetric data={activity} x="month" y="registrations" />
          </div>
          <div className="rounded-2xl border p-6 bg-[var(--color-surface)]/40">
            <div className="text-lg font-semibold mb-3">Users by Role</div>
            <PieMetric data={roleCounts} nameKey="name" valueKey="value" />
          </div>
        </div>

        <div>
          <div className="text-lg font-semibold mb-3">All Users</div>
          <ResourceTable rows={users} columns={cols} pageSize={8} />
        </div>
      </div>
    </RoleGuard>
  )
}
