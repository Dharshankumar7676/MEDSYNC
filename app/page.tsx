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
        <section className="w-full py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <span className="inline-flex items-center rounded-2xl bg-[var(--color-primary)]/10 px-3 py-1 text-sm font-medium text-[var(--color-primary)]">
                � Next-Gen Healthcare Platform
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide font-['Orbitron'] bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
                Future of Healthcare is Here
              </h1>
              <p className="mx-auto max-w-[800px] text-[var(--color-text-secondary)] text-xl md:text-2xl font-['Inter']">
                Secure records, AI assistance, and role-based workflows for patients, doctors, pharmacies, and blood banks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
                <Button asChild variant="primary" size="lg">
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-['Orbitron'] text-[var(--color-primary)]">
                Built for Healthcare Excellence
              </h2>
              <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                Tailored solutions for every healthcare stakeholder
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-6 hover:border-[var(--color-primary)] transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl mb-4">
                  🏥
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">Patients</h3>
                <p className="text-[var(--color-text-secondary)]">
                  View medical history, manage prescriptions, and track requests in one secure platform.
                </p>
              </Card>

              <Card className="p-6 hover:border-[var(--color-primary)] transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl mb-4">
                  👨‍⚕️
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">Doctors</h3>
                <p className="text-[var(--color-text-secondary)]">
                  Create e-prescriptions, manage patient timelines, and streamline clinical workflows.
                </p>
              </Card>

              <Card className="p-6 hover:border-[var(--color-primary)] transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl mb-4">
                  💊
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">Pharmacies</h3>
                <p className="text-[var(--color-text-secondary)]">
                  Fulfill prescriptions efficiently and manage inventory with smart automation.
                </p>
              </Card>

              <Card className="p-6 hover:border-[var(--color-primary)] transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl mb-4">
                  🩸
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">Blood Banks</h3>
                <p className="text-[var(--color-text-secondary)]">
                  Track blood availability and fulfill urgent requests with real-time monitoring.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}