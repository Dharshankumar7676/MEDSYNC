"use client"

import type * as React from "react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { apiFetch, authHeader } from "@/lib/api"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginForm() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      toast({ title: "Missing fields", description: "Please enter email and password.", variant: "destructive" })
      return
    }
    try {
      setLoading(true)
      const data = await apiFetch<{ access_token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
      // Persist token for subsequent requests
      if (typeof window !== "undefined") {
        localStorage.setItem("ms_token", data.access_token)
      }
      // Fetch user profile to determine role
      const me = await apiFetch<{ id: string; role: string }>("/auth/me", {
        method: "GET",
  headers: { ...(authHeader() as Record<string, string>) },
      })
      const role = me.role || "patient"
      if (typeof window !== "undefined") {
        localStorage.setItem("ms_user_role", role)
      }
      toast({ title: "Welcome back", description: "You are now logged in." })
      // Role-based redirect
      // Role-based redirect with properly formatted Next.js routes
      const roleToPath = {
        patient: "/patient",
        doctor: "/doctor",
        pharmacy: "/pharmacy",
        blood_bank: "/blood-bank",
        admin: "/admin",
      }
      
      // Use the role to determine the redirect path, defaulting to patient
      const redirectPath = roleToPath[role as keyof typeof roleToPath] || "/patient"
      router.push(redirectPath)
    } catch (err: any) {
      let errorMsg = err?.message || "Please try again."
      if (errorMsg.includes("Invalid credentials")) {
        errorMsg = "Invalid credentials. Please check your email and password."
      }
      toast({ title: "Login failed", description: errorMsg, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="glass-card w-full max-w-md rounded-2xl">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl font-bold text-gradient-primary">Welcome Back</CardTitle>
        <p className="text-muted-foreground mt-2">Sign in to your MedSync account</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-describedby="email-help"
            />
            <p id="email-help" className="text-muted-foreground text-xs">
              Use your work or personal email
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" disabled={loading} className="btn-gradient w-full py-6 text-white font-semibold text-lg">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
