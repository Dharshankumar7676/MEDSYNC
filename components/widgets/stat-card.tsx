"use client"

import * as React from "react"

export interface StatCardProps {
  title: string
  value: number | string
  hint?: string
  icon?: React.ReactNode
}

export function StatCard({ title, value, hint, icon }: StatCardProps) {
  return (
    <div className="dashboard-card card shadow-neon glow-hover transition-all duration-300">
      <div className="flex items-center gap-4">
        {icon && (
          <div className="p-3 rounded-xl bg-[var(--color-accent-pink)]/20 text-[var(--color-accent-pink)] neon-underline">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="label text-sm tracking-wider uppercase mb-1 text-[var(--color-text-secondary)] font-heading">
            {title}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <div className="text-3xl font-semibold text-white font-heading tracking-wide">
              {value}
            </div>
            {hint && (
              <div className="text-xs text-[var(--color-accent-green)] bg-[var(--color-accent-green)]/10 px-2 py-1 rounded-full">
                {hint}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
