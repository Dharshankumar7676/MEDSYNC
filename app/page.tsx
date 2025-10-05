"use client"

import Link from "next/link"
import SiteHeader from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg)]">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{background: "radial-gradient(600px circle at 20% 20%, #FF00A8 0, transparent 40%), radial-gradient(600px circle at 80% 30%, #00FF88 0, transparent 40%)"}} />
          <div className="mx-auto max-w-screen-xl px-4 md:px-6 py-20 lg:py-28 text-center">
            <span className="inline-flex items-center rounded-full border border-[var(--color-divider)] bg-[var(--color-surface)]/60 px-3 py-1 text-sm text-[var(--color-text-secondary)]">
              Next-Gen Healthcare Platform
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-white">
              Future of Healthcare is <span className="neon-text">Here</span>
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-[var(--color-text-secondary)] text-lg">
              Secure records, AI assistance, and role-based workflows for patients, doctors, pharmacies, and blood banks.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button asChild variant="primary" size="lg">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="w-full py-16">
          <div className="mx-auto max-w-screen-xl px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-white">Built for Healthcare Excellence</h2>
              <p className="mt-3 text-[var(--color-text-secondary)]">Tailored solutions for every healthcare stakeholder</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 card-hover">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl mb-4">🏥</div>
                <h3 className="text-xl font-semibold mb-2 text-white">Patients</h3>
                <p className="text-[var(--color-text-secondary)]">View medical history, manage prescriptions, and track requests in one platform.</p>
              </Card>

              <Card className="p-6 card-hover">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl mb-4">👨‍⚕️</div>
                <h3 className="text-xl font-semibold mb-2 text-white">Doctors</h3>
                <p className="text-[var(--color-text-secondary)]">Create e‑prescriptions, manage timelines, and streamline workflows.</p>
              </Card>

              <Card className="p-6 card-hover">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl mb-4">💊</div>
                <h3 className="text-xl font-semibold mb-2 text-white">Pharmacies</h3>
                <p className="text-[var(--color-text-secondary)]">Fulfill prescriptions efficiently and manage inventory with automation.</p>
              </Card>

              <Card className="p-6 card-hover">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl mb-4">🩸</div>
                <h3 className="text-xl font-semibold mb-2 text-white">Blood Banks</h3>
                <p className="text-[var(--color-text-secondary)]">Track availability and fulfill urgent requests in real‑time.</p>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}