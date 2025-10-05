"use client"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Lazy, browser-only Supabase client to avoid SSR build errors when env vars are missing.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined

let _supabase: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient | null {
  if (typeof window === "undefined") return null
  if (!_supabase) {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.")
      return null
    }
    _supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storageKey: "medsync_supabase_auth",
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  }
  return _supabase
}

// Backwards-compat default export for modules that expect a value. This will be null on the server.
const supabase = typeof window === "undefined" ? (null as any) : getSupabaseClient()!
export default supabase

