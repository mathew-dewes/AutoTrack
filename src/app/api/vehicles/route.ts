// app/api/vehicles/route.ts
import { createClientForServer } from '@/utlis/supabase/server'
import { NextResponse } from 'next/server'
 // server-side Supabase client

export async function GET() {
  const supabase = await createClientForServer()

  // Get user session (server-side)
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) return NextResponse.json({ error: userError.message }, { status: 401 })
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  // Fetch vehicles for this user
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const supabase = await createClientForServer()
    const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) return NextResponse.json({ error: userError.message }, { status: 401 })
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  const body = await req.json();


  const { data, error } = await supabase
    .from("vehicles")
    .insert(  {
        ...body,
        user_id: user.id 
      })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data[0]);
}
