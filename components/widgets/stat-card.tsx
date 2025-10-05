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
    <div className="rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-surface)]/50 p-6 backdrop-blur-lg hover:shadow-lg hover:shadow-[var(--color-primary)]/10 transition-all duration-300">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-[var(--color-text-secondary)] font-['Inter'] text-sm tracking-wide uppercase">
            {title}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <div className="text-2xl font-bold text-[var(--color-text-primary)] font-['Orbitron']">
              {value}
            </div>
            {hint && (
              <div className="text-sm text-[var(--color-text-secondary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded-full">
                {hint}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
