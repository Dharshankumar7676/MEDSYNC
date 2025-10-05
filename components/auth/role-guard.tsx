"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export function RoleGuard({
  allow,
  children,
}: {
  allow: Array<"patient" | "doctor" | "pharmacy" | "blood_bank" | "admin">
  children: React.ReactNode
}) {
  const router = useRouter()
  const [ok, setOk] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        // First check localStorage
        const storedRole = localStorage.getItem("ms_user_role")
        const token = localStorage.getItem("ms_token")
        
        if (!token) {
          router.replace("/login")
          return
        }

        // If we have a stored role and it's allowed, we can show content immediately
        if (storedRole && allow.includes(storedRole as any)) {
          setOk(true)
          setLoading(false)
          return
        }

        // Double-check with Supabase
        const { data } = await supabase.auth.getSession()
        const role = (data?.session?.user?.user_metadata as any)?.role || storedRole || "patient"
        
        if (allow.includes(role)) {
          setOk(true)
          localStorage.setItem("ms_user_role", role)
        } else {
          router.replace("/login")
        }
      } catch (error) {
        console.error("RoleGuard error:", error)
        router.replace("/login")
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [allow, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    )
  }

  if (!ok) return null
  return <>{children}</>
}
