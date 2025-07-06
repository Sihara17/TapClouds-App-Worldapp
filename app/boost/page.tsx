"use client"

 import { useBoostStore } from "@/store/boostStore"
import { useGameStats } from "@/store/gameStats"
import { Button } from "@/components/ui/button"
import { Home, Zap, Target } from "lucide-react"
import Link from "next/link"

const boostItems = [
  {
    id: "auto",
    title: "Auto Points",
    unit: "per sec",
    valuePerLevel: 0.01
  },
  {
    id: "energyPerDay",
    title: "Energy Per Day",
    unit: "max/day",
    valuePerLevel: 100
  },
  {
    id: "click",
    title: "Points Per Click",
    unit: "per click",
    valuePerLevel: 0.1
  }
]

export default function BoostPage() {
  const { points, setPoints } = useGameStats()
  const { levels, upgradeBoost } = useBoostStore()

  const handleUpgrade = (type: string) => {
    const cost = 5000
    if (points < cost) return
    setPoints(points - cost)
    upgradeBoost(type as any)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-cyan-300">Boost Center</h1>

      {boostItems.map((item) => {
        const level = levels[item.id as keyof typeof levels]
        const current = (level - 1) * item.valuePerLevel
        const next = level * item.valuePerLevel
        const cost = 5000
        const canUpgrade = points >= cost

        return (
          <div key={item.id} className="bg-gray-800 rounded-xl p-4 shadow-md border border-cyan-600">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-cyan-200">{item.title}</h2>
                <p className="text-sm text-gray-300">
                  Level {level} → {current.toFixed(2)} → {next.toFixed(2)} {item.unit}
                </p>
              </div>
              <div>
                <Button
                  onClick={() => handleUpgrade(item.id)}
                  className="bg-cyan-600 hover:bg-cyan-500"
                  disabled={!canUpgrade}
                >
                  Upgrade (5000 pts)
                </Button>
              </div>
            </div>
          </div>
        )
      })}

 
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
