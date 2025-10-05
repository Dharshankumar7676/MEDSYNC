import type { Metadata } from "next"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "MedSync - Next-Gen Healthcare Platform",
  description: "Secure medical records, AI assistance, and role-based workflows for healthcare stakeholders",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" style={{
      "--color-primary": "#00E0C7",
      "--color-secondary": "#B79FFF",
      "--color-bg": "#0E1117",
      "--color-surface": "#1B1F29",
      "--color-text-primary": "#F5F5F7",
      "--color-text-secondary": "#A1A1AA",
    } as React.CSSProperties}>
      <body className="font-['Inter']">
        <ThemeProvider>
          <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-primary)] border-t-transparent" />
            </div>
          }>
            {children}
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
