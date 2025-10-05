"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function AnalyticsLoading() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-4 w-[100px] mb-2" />
            <Skeleton className="h-8 w-[60px]" />
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <Skeleton className="h-4 w-[140px] mb-4" />
          <Skeleton className="h-[300px] w-full" />
        </Card>
        <Card className="p-6">
          <Skeleton className="h-4 w-[140px] mb-4" />
          <Skeleton className="h-[300px] w-full" />
        </Card>
      </div>
      <Card className="p-6">
        <Skeleton className="h-4 w-[140px] mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </Card>
    </div>
  )
}