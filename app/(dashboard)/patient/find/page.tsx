"use client"

export const dynamic = "force-dynamic"

import { RoleGuard } from "@/components/auth/role-guard"
import ResourceMap from "@/components/maps/resource-map"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const sample = [
  { id: "r1", type: "hospital", name: "CityCare", address: "MG Road", latitude: 12.97, longitude: 77.59 },
  { id: "r2", type: "pharmacy", name: "GreenMed", address: "Brigade", latitude: 12.98, longitude: 77.6 },
]

export default function PatientFindResourcesPage() {
  const [q, setQ] = useState("")
  const [type, setType] = useState<string>("")

  return (
    <RoleGuard allow={["patient", "admin"]}>
      <div className="space-y-6">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="text-sm">Search</label>
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, tags, address" />
          </div>
          <div>
            <label className="text-sm">Type</label>
            <select className="w-48 rounded-xl border bg-[var(--color-bg)] px-3 py-2" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Any</option>
              <option value="hospital">Hospital</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="blood_bank">Blood Bank</option>
              <option value="clinic">Clinic</option>
            </select>
          </div>
          <Button>Apply</Button>
        </div>
        <ResourceMap resources={sample} center={[12.97, 77.59]} />
      </div>
    </RoleGuard>
  )
}
