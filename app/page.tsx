// app/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Home, Zap, Target } from "lucide-react"
import Link from "next/link"

import { useEnergyStore } from "@/store/energyStore"
import { useGameStats } from "@/store/gameStats"

export default function TapCloud() {
  const { energy, maxEnergy, setEnergy, refreshMaxEnergy, resetEnergyIfNewDay } = useEnergyStore()
  const { points, gainPoints } = useGameStats()

  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    refreshMaxEnergy()
    resetEnergyIfNewDay()
  }, [])

  const handleTap = () => {
    if (energy <= 0) return

    const basePoints = Math.floor(Math.random() * 5) + 1
    gainPoints(basePoints)
    setEnergy(Math.max(0, energy - 1))
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)
  }

  return (
    <div className="min-h-screen bg-blue-100 text-center px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">TapCloud</h1>

      <div className="mb-4">
        <p className="text-xl font-semibold">Points: {points}</p>
      </div>

      <div className="mb-4">
        <p>Energy: {energy} / {maxEnergy}</p>
        <Progress value={(energy / maxEnergy) * 100} className="h-2" />
      </div>

      <button
        onClick={handleTap}
        className={`w-32 h-32 rounded-full bg-yellow-400 shadow-lg active:scale-95 transition-all ${isAnimating ? "animate-ping" : ""}`}
      >
        TAP!
      </button>

      <div className="fixed bottom-0 left-0 right-0 flex justify-around p-4 bg-white border-t">
        <Button variant="ghost"><Home className="w-5 h-5" /></Button>
        <Link href="/boost"><Button variant="ghost"><Zap className="w-5 h-5" /></Button></Link>
        <Link href="/quest"><Button variant="ghost"><Target className="w-5 h-5" /></Button></Link>
      </div>
    </div>
  )
}
