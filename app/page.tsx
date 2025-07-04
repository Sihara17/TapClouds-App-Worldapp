"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Home, Zap, Users, Target, MoreVertical, Sparkles, Gift, Settings } from "lucide-react"
import Link from "next/link"

export default function TapCloud() {
  const liffId = "2007685380-qx5MEZd9"

  const [points, setPoints] = useState(0) // mulai dari 0
  const [energy, setEnergy] = useState(900)
  const [maxEnergy] = useState(900)
  const [isAnimating, setIsAnimating] = useState(false)
  const [tapEffects, setTapEffects] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [userName, setUserName] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    import("@line/liff").then((liff) => {
      liff.default
        .init({ liffId })
        .then(() => {
          if (liff.default.isLoggedIn()) {
            setIsLoggedIn(true)
            liff.default.getProfile().then((profile: any) => {
              setUserName(profile.displayName)
            })
          }
        })
        .catch((err: any) => {
          console.error("LIFF init error:", err)
        })
    })
  }, [])

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    if (energy <= 0) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const pointsToAdd = Math.floor(Math.random() * 5) + 1
    setPoints((prev) => prev + pointsToAdd)
    setEnergy((prev) => Math.max(0, prev - 1))
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)
    const newEffect = { id: Date.now(), x, y }
    setTapEffects((prev) => [...prev, newEffect])
    setTimeout(() => {
      setTapEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id))
    }, 1000)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => Math.min(maxEnergy, prev + 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [maxEnergy])

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-blue-900 relative overflow-hidden" style={{ backgroundImage: "url('/bg-Cloud.png')" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 relative z-10">
        <div className="w-8 h-8" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-semibold">TapCloud</span>
        </div>
        <Button variant="ghost" size="icon" className="text-blue-900">
          <MoreVertical className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-cyan-400 text-lg">@{userName || "..."}</span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full"></div>
          </div>
          <span className="text-4xl md:text-5xl font-bold text-blue-900">{points.toLocaleString()}</span>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <Button size="icon" className="w-12 h-12 bg-cyan-500 hover:bg-cyan-600 rounded-full">
            <Sparkles className="h-6 w-6" />
          </Button>
          <Button size="icon" className="w-12 h-12 bg-cyan-500 hover:bg-cyan-600 rounded-full">
            <Gift className="h-6 w-6" />
          </Button>
          <Button size="icon" className="w-12 h-12 bg-cyan-500 hover:bg-cyan-600 rounded-full">
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Tap Area */}
      <div className="flex justify-center mb-8 relative">
        <div
          className={`relative cursor-pointer transition-transform duration-200 ${isAnimating ? "scale-95" : "scale-100"}`}
          onClick={handleTap}
        >
          <div className="w-64 h-64 relative overflow-hidden rounded-full shadow-2xl shadow-cyan-500/50">
            <img src="/logo.png" alt="TapCloud Logo" className="w-full h-full object-contain rounded-full" />
          </div>

          {tapEffects.map((effect) => (
            <div
              key={effect.id}
              className="absolute pointer-events-none animate-bounce"
              style={{ left: effect.x - 10, top: effect.y - 10 }}
            >
              <div className="w-5 h-5 bg-yellow-400 rounded-full opacity-75"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Energy */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-900">Energy</span>
          <span className="text-sm font-semibold text-blue-900">{energy} / {maxEnergy}</span>
        </div>
        <Progress value={(energy / maxEnergy) * 100} className="h-2" />
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-cyan-400">
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Button>
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

      {!isLoggedIn && (
        <div className="fixed bottom-16 left-0 right-0 flex justify-center">
          <Button
            onClick={() => {
              import("@line/liff").then((liff) => {
                liff.default.login()
              })
            }}
            className="bg-green-400 text-black hover:bg-yellow-500 rounded-full px-6 py-2"
          >
            Login with LINE
          </Button>
        </div>
      )}
    </div>
  )
}
