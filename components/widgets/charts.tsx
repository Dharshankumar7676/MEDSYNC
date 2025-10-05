"use client"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

export function LineMetric({
  data,
  x,
  y,
  color = "hsl(var(--chart-1))",
}: { data: any[]; x: string; y: string; color?: string }) {
  return (
    <div className="chart rounded-xl shadow-minimal bg-transparent p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
          <XAxis dataKey={x} stroke="#B5B5B5" />
          <YAxis stroke="#B5B5B5" />
          <Tooltip contentStyle={{ background: '#1A1A1A', color: '#EAEAEA', borderRadius: '1rem', border: '1px solid #2E2E2E' }} />
          <Line type="monotone" dataKey={y} stroke="#FF00A8" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function BarMetric({
  data,
  x,
  y,
  color = "hsl(var(--chart-2))",
}: { data: any[]; x: string; y: string; color?: string }) {
  return (
    <div className="chart rounded-xl shadow-minimal bg-transparent p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2E2E2E" />
          <XAxis dataKey={x} stroke="#B5B5B5" />
          <YAxis stroke="#B5B5B5" />
          <Tooltip contentStyle={{ background: '#1A1A1A', color: '#EAEAEA', borderRadius: '1rem', border: '1px solid #2E2E2E' }} />
          <Bar dataKey={y} fill="#00FF88" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const PIE_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function PieMetric({ data, nameKey, valueKey }: { data: any[]; nameKey: string; valueKey: string }) {
  return (
    <div className="chart rounded-xl shadow-minimal bg-transparent p-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey={valueKey} nameKey={nameKey} outerRadius={100} label>
            {data.map((_: any, idx: number) => (
              <Cell key={idx} fill={["#FF00A8", "#00FF88", "#C800FF"][idx % 3]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip contentStyle={{ background: '#1A1A1A', color: '#EAEAEA', borderRadius: '1rem', border: '1px solid #2E2E2E' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
