"use client"

import Link from "next/link"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-primary)]/20 bg-[var(--color-surface)]/95 backdrop-blur-lg">
      <div className="flex h-16 items-center px-8">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-secondary)]" />
          <Input
            type="search"
            placeholder="Search anything..."
            className="w-full pl-10 bg-[var(--color-bg)]/50"
          />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:bg-[var(--color-primary)]/10">
            <Bell className="h-5 w-5 text-[var(--color-text-primary)]" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-[var(--color-primary)]/10 p-0.5">
            <img
              src="/placeholder-user.jpg"
              alt="User"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-30" />
    </header>
  )
}
