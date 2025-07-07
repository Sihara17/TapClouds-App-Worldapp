import { NextResponse } from "next/server"
import { verifyProof } from "@worldcoin/minikit-js"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { merkle_root, nullifier_hash, proof, credential_type, action } = body

    const result = await verifyProof({
      app_id: process.env.WORLD_ID_APP_ID!,
      action,
      credential_type,
      nullifier_hash,
      merkle_root,
      proof,
    })

    if (!result.success) {
      return NextResponse.json({ error: "World ID verification failed" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("game_stats")
      .select("*")
      .eq("user_id", nullifier_hash)
      .single()

    if (!data) {
      await supabase.from("game_stats").insert({
        user_id: nullifier_hash,
        points: 0,
        energy: 200,
      })
    }

    return NextResponse.json({ userId: nullifier_hash })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
