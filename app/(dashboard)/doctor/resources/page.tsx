"use client"

export const dynamic = "force-dynamic"

import { RoleGuard } from "@/components/auth/role-guard"
import ResourceMap from "@/components/maps/resource-map"

const resources = [
  { id: "r10", type: "hospital", name: "Sunrise Hospital", latitude: 12.96, longitude: 77.58 },
  { id: "r11", type: "clinic", name: "Wellness Clinic", latitude: 12.94, longitude: 77.61 },
]

export default function DoctorResourcesPage() {
  return (
    <RoleGuard allow={["doctor", "admin"]}>
      <div className="space-y-6">
        <div className="text-lg font-semibold">Nearby Resources</div>
        <ResourceMap resources={resources as any} center={[12.96, 77.59]} />
      </div>
    </RoleGuard>
  )
}
