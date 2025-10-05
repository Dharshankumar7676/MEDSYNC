"use client"

import type * as React from "react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiFetch, authHeader } from "@/lib/api"
import { useRouter } from "next/navigation"

export function RegisterForm() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState<"patient" | "doctor" | "pharmacy" | "blood_bank">("patient")
  const [aadhaar, setAadhaar] = useState("")
  const [medicalId, setMedicalId] = useState("")
  const [hospitalRegId, setHospitalRegId] = useState("")
  const [pharmacyName, setPharmacyName] = useState("")
  const [licenseId, setLicenseId] = useState("")
  const [bloodBankName, setBloodBankName] = useState("")
  const [bloodBankRegId, setBloodBankRegId] = useState("")
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password || !confirm) {
      toast({ title: "Missing fields", description: "Please complete all fields.", variant: "destructive" })
      return
    }
    if (password !== confirm) {
      toast({ title: "Passwords do not match", description: "Please re-enter your password.", variant: "destructive" })
      return
    }
    if (role === "doctor" && (!medicalId || !hospitalRegId)) {
      toast({
        title: "Doctor details required",
        description: "Provide medical ID and hospital registration ID.",
        variant: "destructive",
      })
      return
    }
    try {
      setLoading(true)
      const payload: any = {
        email,
        password,
        role,
        full_name: fullName || undefined,
        phone: phone || undefined,
        aadhaar_id: role === "patient" ? (aadhaar || undefined) : undefined,
      }
      if (role === "doctor") {
        payload.medical_id = medicalId
        payload.hospital_registration_id = hospitalRegId
      } else if (role === "pharmacy") {
        payload.pharmacy_name = pharmacyName || undefined
        payload.license_id = licenseId
      } else if (role === "blood_bank") {
        payload.blood_bank_name = bloodBankName || undefined
        payload.blood_bank_registration_id = bloodBankRegId || undefined
      }
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      })
      toast({ title: "Account created", description: "Please log in to continue." })
      router.push("/login")
    } catch (err: any) {
      toast({ title: "Registration failed", description: err.message ?? "Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="glass-card w-full max-w-2xl rounded-2xl">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl font-bold text-gradient-primary">Join MedSync</CardTitle>
        <p className="text-muted-foreground mt-2">Create your account to get started</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="role">I am a</Label>
            <select
              id="role"
              className="rounded-md border bg-background px-3 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="blood_bank">Blood Bank</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91XXXXXXXXXX" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          {role === "patient" && (
            <div className="grid gap-2">
              <Label htmlFor="aadhaar">Aadhaar (optional)</Label>
              <Input id="aadhaar" value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} placeholder="XXXX-XXXX-XXXX" />
            </div>
          )}
          {role === "doctor" && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="medicalId">Medical ID</Label>
                <Input id="medicalId" value={medicalId} onChange={(e) => setMedicalId(e.target.value)} placeholder="MCI/STATE-XXXXX" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hospitalReg">Hospital Registration ID</Label>
                <Input id="hospitalReg" value={hospitalRegId} onChange={(e) => setHospitalRegId(e.target.value)} placeholder="HOSP-REG-XXXXX" />
              </div>
            </>
          )}
          {role === "pharmacy" && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="pharmacyName">Pharmacy name</Label>
                <Input id="pharmacyName" value={pharmacyName} onChange={(e) => setPharmacyName(e.target.value)} placeholder="Your Pharmacy" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="licenseId">License number</Label>
                <Input id="licenseId" value={licenseId} onChange={(e) => setLicenseId(e.target.value)} placeholder="LIC-XXXXX" />
              </div>
            </>
          )}
          {role === "blood_bank" && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="bloodBankName">Blood bank name</Label>
                <Input id="bloodBankName" value={bloodBankName} onChange={(e) => setBloodBankName(e.target.value)} placeholder="Your Blood Bank" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bloodBankReg">Registration number</Label>
                <Input id="bloodBankReg" value={bloodBankRegId} onChange={(e) => setBloodBankRegId(e.target.value)} placeholder="BB-REG-XXXXX" />
              </div>
            </>
          )}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={8}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input
              id="confirm"
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              minLength={8}
            />
          </div>
          <Button type="submit" disabled={loading} className="btn-gradient w-full col-span-full py-6 text-white font-semibold text-lg">
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
