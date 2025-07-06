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
        coming Soon ....
      </div>

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
