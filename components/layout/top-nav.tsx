"use client"

import Link from "next/link"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TopNav() {
  const toggleTheme = () => {
    const el = document.documentElement
    el.classList.toggle("dark")
  }
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-divider)] bg-[var(--color-surface)]/95 backdrop-blur-xl">
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="mr-6 flex items-center gap-2 neon-underline">
          <span className="text-white font-semibold tracking-wide">MedCore</span>
        </Link>
        <div className="relative w-full max-w-xl slide-fade">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-secondary)]" />
          <Input
            type="search"
            placeholder="Search anything..."
            className="w-full pl-10 bg-[#0F0F0F]"
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:text-[#00FF88]">
            <Bell className="h-5 w-5 text-[var(--color-text-primary)]" />
          </Button>
          <Button variant="secondary" size="sm" onClick={toggleTheme}>Theme</Button>
          <div className="ml-2 h-8 w-8 rounded-full bg-[var(--color-primary)]/10 p-0.5">
            <img
              src="/placeholder-user.jpg"
              alt="User"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#FF00A8] to-transparent opacity-50" />
    </header>
  )
}
