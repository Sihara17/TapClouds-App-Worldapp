"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Zap, Target } from "lucide-react"
import Link from "next/link"
import { useBoostStore } from "@/store/boostStore"
import { useGameStats } from "@/store/gameStats"
import { useEnergyStore } from "@/store/energyStore"
import { supabase } from "@/lib/supabase"
import { verify } from "@worldcoin/minikit-js"


export default function TapCloud() {
  const { points, gainPoints, setPoints } = useGameStats()
  const { energy, setEnergy, maxEnergy, refreshMaxEnergy, resetEnergyIfNewDay } = useEnergyStore()
  const { doublePointActive, levels } = useBoostStore()

  const [tapEffects, setTapEffects] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // ⏳ Fetch user data if already logged in
  useEffect(() => {
    const storedId = localStorage.getItem("user_id")
    if (storedId) {
      setUserId(storedId)
      fetchUserStats(storedId)
      setIsLoggedIn(true)
    }
  }, [])

  // 🔁 Fetch user stats from /api/me
  const fetchUserStats = async (id: string) => {
    const res = await fetch(`/api/me?user_id=${id}`)
    if (res.ok) {
      const data = await res.json()
      setPoints(data.points)
      setEnergy(data.energy)
    }
  }

  // 🔐 World ID Login
  const handleWorldIdLogin = async () => {
    try {
      const result = await verify({
        app_id: process.env.NEXT_PUBLIC_WLD_APP_ID!, // ✅ Gunakan key dari .env
        action_id: process.env.NEXT_PUBLIC_WLD_ACTION_NAME || "tapcloud",
        credential_types: ["orb", "phone"],
        signal: "",
      })

      if (!result.success) {
        alert("World ID verification failed!")
        return
      }

      const res = await fetch("/api/verify-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: process.env.NEXT_PUBLIC_WLD_ACTION_NAME || "tapcloud",
          signal: "",
          merkle_root: result.merkle_root,
          nullifier_hash: result.nullifier_hash,
          proof: result.proof,
          credential_type: result.credential_type,
        }),
      })

      const data = await res.json()
      if (data.userId) {
        setUserId(data.userId)
        localStorage.setItem("user_id", data.userId)
        fetchUserStats(data.userId)
        setIsLoggedIn(true)
      } else {
        alert("Failed to verify user.")
      }
    } catch (error) {
      console.error(error)
      alert("Login failed. Please try again.")
    }
  }

  // 🎯 Handle Tap
  const handleTap = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (!userId || energy <= 0) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const basePoints = Math.floor(Math.random() * 5) + 1
    const finalPoints = doublePointActive ? basePoints * 2 : basePoints

    gainPoints(finalPoints)
    setEnergy(Math.max(0, energy - 1))

    await supabase.from("game_stats").update({
      points: points + finalPoints,
      energy: energy - 1,
    }).eq("user_id", userId)

    await supabase.from("tap_logs").insert({
      user_id: userId,
      points: finalPoints,
    })

    const newEffect = { id: Date.now(), x, y }
    setTapEffects((prev) => [...prev, newEffect])
    setTimeout(() => setTapEffects((prev) => prev.filter((e) => e.id !== newEffect.id)), 1000)
  }

  // 🔋 Daily energy reset
  useEffect(() => {
    const checkReset = () => {
      const lastReset = localStorage.getItem("lastEnergyReset")
      const today = new Date().toDateString()
      if (lastReset !== today) {
        setEnergy(maxEnergy)
        localStorage.setItem("lastEnergyReset", today)
      }
    }
    checkReset()
    const interval = setInterval(checkReset, 60000)
    return () => clearInterval(interval)
  }, [maxEnergy])

  useEffect(() => {
    refreshMaxEnergy()
    resetEnergyIfNewDay()
  }, [levels.energyPerDay])

  // 🔁 Auto-point
  useEffect(() => {
    const interval = setInterval(() => {
      const autoPoints = levels.auto * 0.01
      if (autoPoints > 0) gainPoints(Number(autoPoints.toFixed(2)))
    }, 1000)
    return () => clearInterval(interval)
  }, [levels.auto])

  return (
    <div className="min-h-screen text-center p-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/l0go.png')" }}>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-cyan-300 animate-pulse drop-shadow-[0_0_12px_rgba(0,255,255,0.8)]">
          TapCloud
        </h1>
        <p className="text-2xl font-bold text-cyan-300 animate-pulse drop-shadow-[0_0_12px_rgba(0,255,255,0.8)]">
          Points: {points.toFixed(2)}
        </p>
        <p className="text-cyan-200 text-base drop-shadow-[0_0_6px_rgba(0,255,255,0.4)]">
          Energy: {energy} / {maxEnergy}
        </p>
      </div>

      <div
        onClick={handleTap}
        className="mx-auto mb-6 w-72 h-72 rounded-full flex items-center justify-center text-lg font-bold shadow-lg active:scale-95 transition-transform relative overflow-hidden"
        style={{ backgroundImage: "url('/logo1.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {tapEffects.map((effect) => (
          <div
            key={effect.id}
            className="absolute w-4 h-4 bg-yellow-300 rounded-full animate-ping pointer-events-none"
            style={{ left: effect.x - 8, top: effect.y - 8 }}
          />
        ))}
      </div>

      {!isLoggedIn && (
        <Button
          onClick={handleWorldIdLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full mb-6"
        >
          Login with World App
        </Button>
      )}

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around">
        <Link href="/">
          <Home className="w-6 h-6 text-blue-300" />
        </Link>
        <Link href="/boost">
          <Zap className="w-6 h-6 text-blue-300" />
        </Link>
        <Link href="/quest">
          <Target className="w-6 h-6 text-blue-300" />
        </Link>
      </footer>
    </div>
  )
}
