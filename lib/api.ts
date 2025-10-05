export const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000"

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  })
  if (!res.ok) {
    const msg = await res.text()
    throw new Error(msg || "Request failed")
  }
  return res.json()
}

export function authHeader() {
  if (typeof window === "undefined") return {}
  const token = localStorage.getItem("ms_token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}
