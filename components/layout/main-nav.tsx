"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Patients",
    href: "/patients",
  },
  {
    name: "Appointments",
    href: "/appointments",
  },
  {
    name: "Resources",
    href: "/resources",
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-medium transition-colors hover:text-[var(--color-primary)] ${
            pathname?.startsWith(item.href)
              ? "text-[var(--color-primary)]"
              : "text-[var(--color-text-secondary)]"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}