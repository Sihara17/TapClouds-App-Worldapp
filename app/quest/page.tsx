"use client"

import { useState } from "react"
import QuestCard from "@/components/QuestCard"
import { Button } from "@/components/ui/button"
import { Home, Zap, Users, Target } from "lucide-react"
import Link from "next/link"

const dailyQuests = [
  { day: 1, reward: 5 },
  { day: 2, reward: 10 },
  { day: 3, reward: 15 },
  { day: 4, reward: 10 },
  { day: 5, reward: 20 },
  { day: 6, reward: 15 },
  { day: 7, reward: 30 },
]

export default function QuestPage() {
  const [claimedDays, setClaimedDays] = useState<number[]>([])

  const handleClaim = (day: number) => {
    if (!claimedDays.includes(day)) {
      setClaimedDays([...claimedDays, day])
      alert(`Hadiah untuk hari ke-${day} telah diklaim!`)
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-blue-900 p-6 relative" style={{ backgroundImage: "url('/bg-Cloud.png')" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

      <h1 className="text-3xl font-bold mb-6 text-center z-10 relative">Daily Login Quest</h1>

      <div className="grid gap-4 z-10 relative">
        {dailyQuests.map((quest) => (
          <QuestCard
            key={quest.day}
            day={quest.day}
            reward={quest.reward}
            isClaimed={claimedDays.includes(quest.day)}
            onClaim={() => handleClaim(quest.day)}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
        <div className="flex items-center justify-around py-3">
          <Link href="/page">
            <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-400">
              <Home className="h-6 w-6" />
              <span className="text-xs">Home</span>
            </Button>
          </Link>
          <Link href="/boost">
            <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-400">
              <Zap className="h-6 w-6" />
              <span className="text-xs">Boost</span>
            </Button>
          </Link>
          
          <Link href="/quest">
            <Button variant="ghost" className="flex flex-col items-center gap-1 text-cyan-400">
              <Target className="h-6 w-6" />
              <span className="text-xs">Quest</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
