// app/api/liff-login/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { lineUserId, name, avatar } = await req.json()

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('line_user_id', lineUserId)
    .single()

  if (!user) {
    const { data: newUser } = await supabase
      .from('users')
      .insert([{ line_user_id: lineUserId, name, avatar }])
      .select()
      .single()

    await supabase.from('game_stats').insert([{ user_id: newUser.id }])
  }

  return NextResponse.json({ success: true })
}
