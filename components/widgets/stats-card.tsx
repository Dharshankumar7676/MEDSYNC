import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  change?: number
  icon?: React.ReactNode
}

export function StatsCard({ title, value, description, change, icon }: StatsCardProps) {
  const showTrend = typeof change === "number"

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {showTrend && (
          <p
            className={`mt-2 text-xs ${
              change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-muted-foreground"
            }`}
          >
            <span className="flex items-center gap-1">
              {change > 0 ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />}
              {Math.abs(change)}% from last period
            </span>
          </p>
        )}
        {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
      </CardContent>
    </Card>
  )
}