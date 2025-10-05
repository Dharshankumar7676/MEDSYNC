"use client"

import { PieMetric } from "@/components/widgets/charts"
import { StatCard } from "@/components/widgets/stat-card"
import { RoleGuard } from "@/components/auth/role-guard"
import { Users, AlertTriangle, FileText, Clock } from "lucide-react"

import { ResourceTable } from "@/components/widgets/resource-table"
const pieData = [
  { name: "Patients", value: 1200 },
  { name: "Hospitals", value: 45 },
  { name: "Pharmacies", value: 87 },
  { name: "Blood Banks", value: 22 },
];

// Sample data for tables
const userCols = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "email", label: "Email" },
];
const userRows = [
  { name: "Suresh", role: "Admin", email: "suresh@acme.com" },
  { name: "Priya", role: "Doctor", email: "priya@acme.com" },
  { name: "Ramesh", role: "Patient", email: "ramesh@acme.com" },
];
const alertCols = [
  { key: "type", label: "Type" },
  { key: "message", label: "Message" },
  { key: "time", label: "Time" },
];
const alertRows = [
  { type: "Critical", message: "System maintenance required", time: "1 hour ago" },
  { type: "Info", message: "New patient registration", time: "2 min ago" },
  { type: "Warning", message: "Prescription issued", time: "5 min ago" },
];

export default function AdminDashboard() {
  return (
    <RoleGuard allow={["admin"]}>
      <div className="min-h-screen bg-[var(--color-bg)]">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif', color: '#2A7F8E' }}>Admin Dashboard</h1>
            <p className="text-lg" style={{ color: '#5E7482', fontFamily: 'Inter, sans-serif' }}>Monitor and manage your MedSync platform</p>
          </div>
          
          {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard 
              title="Active Users" 
              value="2,104" 
              hint="+12% from last month"
              icon={<Users className="w-6 h-6" />}
            />
            <StatCard 
              title="Open Alerts" 
              value="12" 
              hint="3 critical"
              icon={<AlertTriangle className="w-6 h-6" />}
            />
            <StatCard 
              title="Prescriptions Today" 
              value="340" 
              hint="↑ 8% from yesterday"
              icon={<FileText className="w-6 h-6" />}
            />
            <StatCard 
              title="Requests Pending" 
              value="28" 
              hint="↓ 15% from last week"
              icon={<Clock className="w-6 h-6" />}
            />
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gradient-medical">User Distribution</h3>
                <div className="text-sm text-muted-foreground/80">Total: 2,354</div>
              </div>
              <PieMetric data={pieData} nameKey="name" valueKey="value" />
            </div>
            
            <div className="glass-card rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-gradient-medical mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">New patient registration</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">Prescription issued</span>
                  </div>
                  <span className="text-xs text-muted-foreground">5 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium">System maintenance</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={120} />
                <StatCard title="Active Sessions" value={18} />
                <StatCard title="Alerts" value={3} />
                <StatCard title="Pending Requests" value={4} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                <div className="rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg,#181818 80%,#1db954 100%)', borderColor: '#1db954', boxShadow: '0 4px 32px #1db95433' }}>
                  <div className="font-medium mb-2 text-xl" style={{ color: '#b80000' }}>User Overview</div>
                  <ResourceTable rows={userRows} columns={userCols} />
                </div>
                <div className="rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg,#181818 80%,#a259f7 100%)', borderColor: '#a259f7', boxShadow: '0 4px 32px #a259f733' }}>
                  <div className="font-medium mb-2 text-xl" style={{ color: '#1db954' }}>System Alerts</div>
                  <ResourceTable rows={alertRows} columns={alertCols} />
                </div>
              </div>
            </div>
        </div>
      </div>
    </RoleGuard>
  )
}