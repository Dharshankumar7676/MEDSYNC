"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/api"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, Droplet, Pill } from "lucide-react"
import { StatsCard } from "@/components/widgets/stats-card"
import { AnalyticsChart } from "@/components/widgets/analytics-chart"
import { ActivityFeed } from "@/components/widgets/activity-feed"

interface AnalyticsData {
  overview: {
    totalPatients: number
    totalDoctors: number
    totalPharmacies: number
    totalBloodBanks: number
    appointmentsToday: number
    prescriptionsToday: number
    bloodRequestsPending: number
    medicineRequestsPending: number
  }
  appointmentTrends: Array<{
    date: string
    count: number
  }>
  bloodInventory: Array<{
    bloodGroup: string
    unitsAvailable: number
  }>
  resourceDistribution: {
    hospitals: number
    pharmacies: number
    bloodBanks: number
  }
  recentActivity: Array<{
    id: string
    type: string
    description: string
    timestamp: string
  }>
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week")
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await apiFetch<AnalyticsData>("/api/analytics", {
          method: "GET",
          headers: { "content-type": "application/json" },
        })
        setData(response)
      } catch (error) {
        console.error("Failed to fetch analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [timeRange])

  if (!data) return null

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
          <TabsList>
            <TabsTrigger value="day">24h</TabsTrigger>
            <TabsTrigger value="week">7d</TabsTrigger>
            <TabsTrigger value="month">30d</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Patients"
          value={data.overview.totalPatients}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Appointments Today"
          value={data.overview.appointmentsToday}
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Blood Requests"
          value={data.overview.bloodRequestsPending}
          description="Pending requests"
          icon={<Droplet className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Medicine Requests"
          value={data.overview.medicineRequestsPending}
          description="Awaiting fulfillment"
          icon={<Pill className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Appointment Trends"
          type="line"
          data={data.appointmentTrends}
          dataKey="count"
        />
        <AnalyticsChart
          title="Blood Inventory"
          type="pie"
          data={data.bloodInventory}
          dataKey="unitsAvailable"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsChart
            title="Resource Distribution"
            type="bar"
            data={[
              { name: "Hospitals", value: data.resourceDistribution.hospitals },
              { name: "Pharmacies", value: data.resourceDistribution.pharmacies },
              { name: "Blood Banks", value: data.resourceDistribution.bloodBanks },
            ]}
            dataKey="value"
          />
        </div>
        <ActivityFeed items={data.recentActivity} />
      </div>
    </div>
  )
}