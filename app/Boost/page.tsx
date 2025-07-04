"use client"

import { useState } from "react"
import BoostCard from "@/components/BoostCard"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BoostPage() {
  const router = useRouter()

  const [activeBoost, setActiveBoost] = useState<string | null>(null)
  const [boostTimer, setBoostTimer] = useState<number>(0)

  const activateBoost = (type: string, duration: number) => {
    if (activeBoost) return // prevent multiple boost
    setActiveBoost(type)
    setBoostTimer(duration)

    const interval = setInterval(() => {
      setBoostTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setActiveBoost(null)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4 pt-4 pb-24">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </Button>
        <h1 className="text-xl font-bold text-blue-300">Boost Menu</h1>
      </div>

      <div className="space-y-4">
        <BoostCard
          title="2x Tap Power"
          description="Double your points per tap for 60 seconds."
          cost={1000}
          duration={60}
          onActivate={() => activateBoost("tapPower", 60)}
          disabled={activeBoost !== null}
        />

        <BoostCard
          title="Energy Regen"
          description="Regenerate energy faster for 2 minutes."
          cost={1500}
          duration={120}
          onActivate={() => activateBoost("energyRegen", 120)}
          disabled={activeBoost !== null}
        />

        <BoostCard
          title="Free Tap Mode"
          description="Tap without using energy for 30 seconds."
          cost={2000}
          duration={30}
          onActivate={() => activateBoost("freeTap", 30)}
          disabled={activeBoost !== null}
        />
      </div>

      {activeBoost && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-800 text-white px-4 py-2 rounded-full shadow-md">
          {activeBoost} Boost Active: {boostTimer}s remaining
        </div>
      )}
    </div>
  )
}
