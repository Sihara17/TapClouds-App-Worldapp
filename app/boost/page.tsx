"use client"
"use client"

import { useBoostStore } from "@/store/boostStore"
import { useGameStats } from "@/store/gameStats"
import { Button } from "@/components/ui/button"

export default function BoostPage() {
  const { activateBoost, doublePointActive, energyRegenActive } = useBoostStore()
  const { points, setPoints } = useGameStats()

  const handleActivateBoost = (type: "double" | "regen") => {
    if (points < 5000) {
      alert("You need at least 5000 points to activate this boost.")
      return
    }

    // Kurangi 5000 poin tanpa reset
    setPoints(points - 5000)

    // Aktifkan boost 60 detik
    activateBoost(type, 60)
  }

  return (
    <div className="min-h-screen bg-white text-center p-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Activate Boost</h1>

      <div className="space-y-6">
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-blue-700">Double Points</h2>
          <p className="mb-2 text-gray-600">Doubles points for 60 seconds</p>
          {doublePointActive ? (
            <p className="text-green-600 font-bold">Active</p>
          ) : (
            <Button onClick={() => handleActivateBoost("double")}>Activate (5000 pts)</Button>
          )}
        </div>

        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-blue-700">Energy Regen</h2>
          <p className="mb-2 text-gray-600">Faster energy regen for 60 seconds</p>
          {energyRegenActive ? (
            <p className="text-green-600 font-bold">Active</p>
          ) : (
            <Button onClick={() => handleActivateBoost("regen")}>Activate (5000 pts)</Button>
          )}
        </div>
      </div>
    </div>
  )
}

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 z-20">
        <div className="flex items-center justify-around py-3">
          <Link href="/">
            <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-400">
              <Home className="h-6 w-6" />
              <span className="text-xs">Home</span>
            </Button>
          </Link>
          <Link href="/boost">
            <Button variant="ghost" className="flex flex-col items-center gap-1 text-cyan-400">
              <Zap className="h-6 w-6" />
              <span className="text-xs">Boost</span>
            </Button>
          </Link>
    
          <Link href="/quest">
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-400">
            <Target className="h-6 w-6" />
            <span className="text-xs">Quest</span>
          </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
