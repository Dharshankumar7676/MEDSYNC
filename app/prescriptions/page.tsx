"use client"

import { useState } from "react"

const samplePrescriptions = [
  { id: 1, patient: "Ramesh", doctor: "Dr. Priya", drug: "Metformin", dosage: "500mg", date: "2025-10-05" },
  { id: 2, patient: "Suresh", doctor: "Dr. Priya", drug: "Atorvastatin", dosage: "20mg", date: "2025-10-04" },
]

export default function PrescriptionsPage() {
  const [prescriptions] = useState(samplePrescriptions)
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-wide mb-2" style={{ fontFamily: 'Orbitron, sans-serif', color: '#B79FFF' }}>Prescriptions</h1>
          <p className="text-lg" style={{ color: '#8A97A7', fontFamily: 'Inter, sans-serif' }}>View and manage your prescriptions</p>
        </div>
        <div className="glass-card rounded-xl p-6 border border-white/20 mt-8">
          <h3 className="text-xl font-semibold text-gradient-medical mb-6">Recent Prescriptions</h3>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 font-semibold text-lg" style={{ color: '#00E0C7' }}>Patient</th>
                <th className="py-2 px-4 font-semibold text-lg" style={{ color: '#00E0C7' }}>Doctor</th>
                <th className="py-2 px-4 font-semibold text-lg" style={{ color: '#00E0C7' }}>Drug</th>
                <th className="py-2 px-4 font-semibold text-lg" style={{ color: '#00E0C7' }}>Dosage</th>
                <th className="py-2 px-4 font-semibold text-lg" style={{ color: '#00E0C7' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((rx) => (
                <tr key={rx.id} className="border-b last:border-none">
                  <td className="py-2 px-4 text-[var(--color-secondary)]">{rx.patient}</td>
                  <td className="py-2 px-4 text-[var(--color-secondary)]">{rx.doctor}</td>
                  <td className="py-2 px-4 text-[var(--color-secondary)]">{rx.drug}</td>
                  <td className="py-2 px-4 text-[var(--color-secondary)]">{rx.dosage}</td>
                  <td className="py-2 px-4 text-[var(--color-secondary)]">{rx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
