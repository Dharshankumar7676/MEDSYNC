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
  const [collapsed, setCollapsed] = useState(false)
  const navigation = roleNavigation[role || "patient"] || []

  useEffect(() => {
    setRole(localStorage.getItem("ms_role"))
    const c = localStorage.getItem("ms_sidebar_collapsed")
    setCollapsed(c === "1")
  }, [])

  useEffect(() => {
    localStorage.setItem("ms_sidebar_collapsed", collapsed ? "1" : "0")
  }, [collapsed])

  return (
    <aside className={cn(
      "sidebar fixed left-0 top-0 z-40 h-screen border-r border-[var(--color-divider)] bg-black shadow-[var(--shadow-neon)] transition-[width] duration-200",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between border-b border-[var(--color-divider)] px-3">
          <Link href="/" className="flex items-center gap-2 font-heading text-xl tracking-wide text-white neon-underline">
            <span className={cn("truncate", collapsed && "hidden")}>MEDSYNC</span>
          </Link>
          <button
            aria-label="Toggle sidebar"
            className="rounded-lg p-2 text-[var(--color-text-secondary)] hover:text-[#00FF88]"
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "sidebar-item flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200",
                  active
                    ? "active bg-[var(--color-neutral-gray)] text-white glow-pulse"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-neutral-gray)] hover:text-[#00FF88]"
                )}
              >
                <Icon className={cn("h-5 w-5", active ? "text-[#00FF88]" : "text-[#B5B5B5]")} />
                <span className={cn(collapsed && "hidden")}>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#FF00A8] to-transparent opacity-30" />
    </aside>
  )
}
