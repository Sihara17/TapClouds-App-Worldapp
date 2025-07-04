"use client"

import { Button } from "@/components/ui/button"
import { Home, Zap, Users, Target } from "lucide-react"
import Link from "next/link"
import BoostCard from "@/components/BoostCard"
import { useBoostStore } from "@/components/boostStore"
import { useGameStats } from "@/components/gameStats"

export default function BoostPage() {
  const { points, setPoints } = useGameStats()
  const { activateBoost } = useBoostStore()

  const handleBoost = (type: "double" | "regen") => {
    if (points < 5000) {
      alert("Kamu butuh minimal 5000 point untuk aktivasi boost ini.")
      return
    }

    setPoints(points - 5000)
    activateBoost(type, type === "double" ? 60 : 90)
    alert(`${type === "double" ? "Double Points" : "Regen x2"} diaktifkan!`)
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-blue-900 relative pb-20" style={{ backgroundImage: "url('/bg-Cloud.png')" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent z-0"></div>

      <div className="relative z-10 p-6 pt-20">
        <h1 className="text-3xl font-bold mb-6 text-center">Boost Center</h1>

        <div className="grid gap-4">
          <BoostCard
            title="Double Points"
            description="Dapatkan 2x poin selama 1 menit."
            onBoost={() => handleBoost("double")}
          />

          <BoostCard
            title="Energy Regen x2"
            description="Regenerasi energi dua kali lebih cepat selama 1.5 menit."
            onBoost={() => handleBoost("regen")}
          />

          <BoostCard
            title="Auto Tap"
            description="Otomatis tap cloud selama 1 menit."
            onBoost={() => alert("Auto Tap belum tersedia.")}
            disabled
          />
        </div>
      </div>

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
