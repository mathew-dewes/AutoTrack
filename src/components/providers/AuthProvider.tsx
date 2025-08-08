// app/providers/AuthProvider.tsx  (client component)
"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Database } from "@/utlis/supabase/types"


const SupabaseClient = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const AuthContext = createContext<{ user_id: string | null; supabase: typeof SupabaseClient | null }>({
  user_id: null,
  supabase: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user_id, setUserId] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data: { user }, error } = await SupabaseClient.auth.getUser()
      if (!mounted || error ) return
      if (user) setUserId(user.id)
      // Optionally subscribe to auth changes
      const { data: sub } = SupabaseClient.auth.onAuthStateChange((_event, session) => {
        setUserId(session?.user?.id ?? null)
      })
      // cleanup on unmount
      return () => {
        mounted = false
        sub?.subscription.unsubscribe()
      }
    })()
  }, [])

  return (
    <AuthContext.Provider value={{ user_id, supabase: SupabaseClient }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
      const context = useContext(AuthContext);

    if (context === undefined){
        throw new Error ("useAuth must be used within the auth Provider")
    }

    return context;
}