"use client"

const samplePatient = {
  name: "Ramesh",
  age: 32,
  condition: "Diabetes",
  doctor: "Dr. Priya",
  vitals: { bp: "120/80", hr: 78, temp: "98.6F" },
  notes: ["Stable", "Needs follow-up"],
}

export default function PatientProfilePage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 font-sans">
      <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: '#2A7F8E' }}>Patient Profile</h1>
      <div className="card grid grid-cols-1 md:grid-cols-2 gap-6 bg-[var(--color-bg)] rounded-2xl shadow-md">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar w-16 h-16 bg-[var(--color-bg)] border-2 border-[var(--color-primary)] shadow-md" />
            <div>
              <div className="font-semibold text-xl" style={{ fontFamily: 'Poppins, sans-serif', color: '#A3C9E2' }}>{samplePatient.name}</div>
              <div className="text-[var(--color-accent)]">Age: {samplePatient.age}</div>
              <div className="pill mt-2" style={{ background: '#2A7F8E', color: '#fff' }}>{samplePatient.condition}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-medium mb-2" style={{ color: '#5E7482' }}>Doctor</div>
            <div style={{ color: '#2A7F8E' }}>{samplePatient.doctor}</div>
          </div>
        </div>
        <div>
          <div className="font-medium mb-2" style={{ color: '#5E7482' }}>Vitals</div>
          <div>BP: <span style={{ color: '#B8D8BA' }}>{samplePatient.vitals.bp}</span></div>
          <div>HR: <span style={{ color: '#A3C9E2' }}>{samplePatient.vitals.hr}</span></div>
          <div>Temp: <span style={{ color: '#2A7F8E' }}>{samplePatient.vitals.temp}</span></div>
          <div className="divider my-3" />
          <div className="font-medium mb-2" style={{ color: '#5E7482' }}>Notes</div>
          <ul className="list-disc pl-4">
            {samplePatient.notes.map((note, idx) => (
              <li key={idx} style={{ color: '#5E7482' }}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
