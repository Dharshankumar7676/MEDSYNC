"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Pill, Stethoscope, Hospital, Droplets, Shield } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType
}

const roleNavigation: Record<string, NavItem[]> = {
  patient: [
    { href: "/dashboard/patient", label: "Dashboard", icon: Shield },
    { href: "/dashboard/patient/records", label: "Records", icon: Stethoscope },
    { href: "/dashboard/patient/prescriptions", label: "Prescriptions", icon: Pill },
    { href: "/dashboard/patient/find", label: "Find Resources", icon: Hospital },
  ],
  doctor: [
    { href: "/dashboard/doctor", label: "Dashboard", icon: Shield },
    { href: "/dashboard/doctor/patients", label: "Patients", icon: Stethoscope },
    { href: "/dashboard/doctor/prescriptions", label: "E-Prescriptions", icon: Pill },
    { href: "/dashboard/doctor/resources", label: "Resource Tracker", icon: Hospital },
  ],
  pharmacy: [
    { href: "/dashboard/pharmacy", label: "Dashboard", icon: Shield },
    { href: "/dashboard/pharmacy/inventory", label: "Inventory", icon: Pill },
    { href: "/dashboard/pharmacy/requests", label: "Requests", icon: Hospital },
  ],
  blood_bank: [
    { href: "/dashboard/blood-bank", label: "Dashboard", icon: Shield },
    { href: "/dashboard/blood-bank/units", label: "Blood Units", icon: Droplets },
    { href: "/dashboard/blood-bank/requests", label: "Requests", icon: Hospital },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: Shield },
    { href: "/dashboard/admin/users", label: "Users", icon: Stethoscope },
    { href: "/dashboard/admin/analytics", label: "Analytics", icon: Hospital },
  ],
}

export function Sidebar() {
  const pathname = usePathname()
  const [role, setRole] = useState<string | null>(null)
  const navigation = roleNavigation[role || "patient"] || []

  useEffect(() => {
    setRole(localStorage.getItem("ms_role"))
  }, [])

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[var(--color-primary)]/20 bg-[var(--color-surface)]/95 backdrop-blur-lg">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-[var(--color-primary)]/20 px-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-['Orbitron'] text-xl tracking-wide text-[var(--color-primary)]"
          >
            <span>MEDSYNC</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  pathname === item.href
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/5"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)]"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--color-primary)] to-transparent opacity-30" />
    </aside>
  )
}
