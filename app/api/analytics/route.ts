import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { apiFetch } from "@/lib/api"

export async function GET(request: NextRequest) {
  try {
    // Get analytics data from our FastAPI backend
    const analyticsData = await apiFetch("/analytics", {
      method: "GET",
      cache: "no-store",
    })

    return NextResponse.json(analyticsData)
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch analytics data",
      },
      { status: 500 }
    )
  }
}