"use client"

import { useState } from "react"

const sampleEvents = [
  { id: 1, title: "Consultation - Ramesh", date: "2025-10-06", type: "Consultation" },
  { id: 2, title: "Surgery - Priya", date: "2025-10-07", type: "Surgery" },
  { id: 3, title: "Follow-up - Suresh", date: "2025-10-08", type: "Follow-up" },
]

export default function AppointmentsPage() {
  // Sample appointments data for table view
  const appointments: { patient: string; doctor: string; date: string; status: string }[] = [
    { patient: "Ramesh", doctor: "Dr. Priya", date: "2025-10-06", status: "Confirmed" },
    { patient: "Suresh", doctor: "Dr. Kumar", date: "2025-10-07", status: "Pending" },
    { patient: "Anita", doctor: "Dr. Priya", date: "2025-10-08", status: "Confirmed" },
    { patient: "Rahul", doctor: "Dr. Mehta", date: "2025-10-09", status: "Pending" },
  ];
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 font-sans">
      <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: '#2A7F8E' }}>Appointments</h1>
      <div className="card bg-[var(--color-bg)] rounded-2xl shadow-md p-6">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2 px-4 font-semibold text-lg" style={{ color: '#A3C9E2' }}>Patient</th>
              <th className="py-2 px-4 font-semibold text-lg" style={{ color: '#A3C9E2' }}>Doctor</th>
              <th className="py-2 px-4 font-semibold text-lg" style={{ color: '#A3C9E2' }}>Date</th>
              <th className="py-2 px-4 font-semibold text-lg" style={{ color: '#A3C9E2' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, idx) => (
              <tr key={idx} className="border-b last:border-none">
                <td className="py-2 px-4 text-[var(--color-accent)]">{appt.patient}</td>
                <td className="py-2 px-4 text-[var(--color-accent)]">{appt.doctor}</td>
                <td className="py-2 px-4 text-[var(--color-accent)]">{appt.date}</td>
                <td className="py-2 px-4">
                  <span className="inline-block rounded-full px-3 py-1 text-sm font-medium" style={{ background: appt.status === 'Confirmed' ? '#2A7F8E' : '#B8D8BA', color: '#fff' }}>{appt.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
