"use client"

import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { TopNav } from "@/components/layout/top-nav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[var(--color-bg)]">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-64">
        <TopNav />
        <main className="flex-1 p-8">
          <div className="h-full rounded-xl border border-[var(--color-primary)]/10 bg-[var(--color-surface)]/50 p-6 backdrop-blur-xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
