"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-primary)]/20 bg-[var(--color-surface)]/95 backdrop-blur-lg">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-xl bg-[var(--color-primary)]/10 p-2">
              <img src="/placeholder-logo.png" alt="MedSync" className="h-8 w-8" />
            </div>
            <span className="text-xl font-bold font-['Orbitron'] text-[var(--color-primary)]">MEDSYNC</span>
          </Link>
        </div>

        <nav className="flex items-center space-x-4">
          <Link 
            href="/login" 
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Sign In
          </Link>
          <Button asChild variant="primary">
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-30" />
    </header>
  )
}
