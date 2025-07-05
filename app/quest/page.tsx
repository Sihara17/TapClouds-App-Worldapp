"use client"

import { Button } from "@/components/ui/button"
import { Home, Zap, Target } from "lucide-react"
import Link from "next/link"

export default function QuestPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-blue-900 p-6 relative"
      style={{ backgroundImage: "url('/bg-Cloud.png')" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

      <h1 className="text-3xl font-bold mb-6 text-center z-10 relative">
        Daily Login Quest
      </h1>

      <div className="z-10 relative text-center text-gray-500 italic">
        Belum ada quest hari ini.
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
        <div className="flex items-center justify-around py-3">
          <Link href="/">
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
