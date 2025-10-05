"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { StatCard } from "@/components/widgets/stat-card"
import { Card } from "@/components/ui/card"
import { Activity, Users, Calendar, Pill, Droplet } from "lucide-react"
import dynamic from "next/dynamic"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const ResourceMap = dynamic(() => import("@/components/maps/resource-map"), { ssr: false })

export default function DashboardPage() {
  const router = useRouter()
  
  useEffect(() => {
    const role = localStorage.getItem("ms_user_role") || "patient"
    const roleToPath = {
      patient: "/patient",
      doctor: "/doctor",
      pharmacy: "/pharmacy",
      blood_bank: "/blood-bank",
      admin: "/admin",
    }
    
    const redirectPath = roleToPath[role as keyof typeof roleToPath] || "/patient"
    router.replace(redirectPath)
  }, [router])

  // Sample data for charts
  const activityData = [
    { name: "Mon", count: 32 },
    { name: "Tue", count: 18 },
    { name: "Wed", count: 22 },
    { name: "Thu", count: 14 },
    { name: "Fri", count: 10 },
  ]

  const pieData = [
    { name: "Critical", value: 12 },
    { name: "Stable", value: 33 },
    { name: "Review", value: 18 },
  ]
  const pieColors = ["#FF6B6B", "#00E0C7", "#B79FFF"]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value="2,834"
          hint="+12.5%"
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Appointments"
          value="48"
          hint="Today"
          icon={<Calendar className="h-5 w-5" />}
        />
        <StatCard
          title="Prescriptions"
          value="156"
          hint="This Week"
          icon={<Pill className="h-5 w-5" />}
        />
        <StatCard
          title="Blood Requests"
          value="8"
          hint="Urgent"
          icon={<Droplet className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={activityData}>
              <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
              <YAxis stroke="var(--color-text-secondary)" />
              <Tooltip 
                contentStyle={{ 
                  background: "var(--color-surface)", 
                  border: "1px solid var(--color-primary)" 
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="var(--color-primary)" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">Usage</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={activityData}>
              <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
              <YAxis stroke="var(--color-text-secondary)" />
              <Tooltip 
                contentStyle={{ 
                  background: "var(--color-surface)", 
                  border: "1px solid var(--color-primary)" 
                }} 
              />
              <Bar 
                dataKey="count" 
                fill="var(--color-primary)" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie 
                data={pieData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={70}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: "var(--color-surface)", 
                  border: "1px solid var(--color-primary)" 
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">Resource Map</h3>
        <div className="h-[400px] rounded-lg overflow-hidden">
          <ResourceMap />
        </div>
      </Card>
    </div>
  )
}
}
