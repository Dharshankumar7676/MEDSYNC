"use client"

export const dynamic = "force-dynamic"

import { StatCard } from "@/components/widgets/stat-card"
import { BarMetric } from "@/components/widgets/charts"
import PulseChat from "@/components/ai/pulse-chat"
import { RoleGuard } from "@/components/auth/role-guard"

export default function DoctorDashboard() {
  const workload = Array.from({ length: 7 }, (_, i) => ({ day: i + 1, patients: Math.round(5 + Math.random() * 10) }))
  return (
    <RoleGuard allow={["doctor", "admin"]}>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif', color: '#2A7F8E' }}>Doctor Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Today's Patients" value={18} />
          <StatCard title="Pending Lab Reports" value={5} />
          <StatCard title="Prescriptions Issued" value={12} />
          <StatCard title="Alerts" value={2} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          <div className="rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] bg-[var(--color-bg)]" style={{ borderColor: '#A3C9E2', boxShadow: '0 4px 32px #A3C9E233' }}>
            <div className="font-medium mb-2 text-xl" style={{ color: '#2A7F8E' }}>Weekly Workload</div>
            <BarMetric data={workload} x="day" y="patients" />
          </div>
          <div className="rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center bg-[var(--color-bg)]" style={{ borderColor: '#A3C9E2', boxShadow: '0 4px 32px #A3C9E233' }}>
            <PulseChat />
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
