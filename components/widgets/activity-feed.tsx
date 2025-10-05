import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ActivityItem {
  id: string
  type: string
  description: string
  timestamp: string
}

interface ActivityFeedProps {
  items: ActivityItem[]
  className?: string
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  function getActivityTypeColor(type: string): string {
    const colors: Record<string, string> = {
      appointment: "bg-blue-100 text-blue-800",
      prescription: "bg-green-100 text-green-800",
      blood_request: "bg-red-100 text-red-800",
      medicine_request: "bg-purple-100 text-purple-800",
    }
    return colors[type.toLowerCase()] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[450px] pr-4">
          <div className="space-y-4">
            {items.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-col space-y-2 border-l-2 border-muted-foreground/20 pl-4 pb-4 relative"
              >
                <div
                  className={cn(
                    "absolute -left-1.5 h-3 w-3 rounded-full border-2 border-background",
                    getActivityTypeColor(activity.type)
                  )}
                />
                <div className="space-y-1">
                  <p className="font-medium leading-none">{activity.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleDateString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}