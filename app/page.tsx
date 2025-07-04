"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Home, Zap, Users, Target, X, MoreVertical, Sparkles, Gift, Settings } from "lucide-react"

export default function TapCloud() {
  const liffId = "2007685380-qx5MEZd9" // <- your LIFF ID here

  const [points, setPoints] = useState(108713386)
  const [seasonPoints, setSeasonPoints] = useState(2610)
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
          if (!liff.default.isLoggedIn()) {
            liff.default.login()
          } else {
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
    const pointsToAdd = Math.floor(Math.random() * 10) + 1
    setPoints((prev) => prev + pointsToAdd)
    setSeasonPoints((prev) => prev + pointsToAdd)
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

      <div className="flex items-center justify-between p-4 relative z-10">
        <Button variant="ghost" size="icon" className="text-white">
          <X className="h-6 w-6" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="font-semibold">TapCloud</span>
        </div>

        <Button variant="ghost" size="icon" className="text-white">
          <MoreVertical className="h-6 w-6" />
        </Button>
      </div>

      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-cyan-400 text-lg">@{userName || "..."}</span>
          <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-sm">521</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full"></div>
          </div>
          <span className="text-4xl md:text-5xl font-bold">{points.toLocaleString()}</span>
        </div>

        <div className="mb-6">
          <p className="text-gray-300 mb-1">Season 1 Final Point</p>
          <p className="text-2xl font-bold">{seasonPoints.toLocaleString()}</p>
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

      <div className="flex justify-center mb-8 relative">
  <div
    className={`relative cursor-pointer transition-transform duration-200 ${
      isAnimating ? "scale-95" : "scale-100"
    }`}
    onClick={handleTap}
  >
    {/* Gambar logo.png sebagai tombol tap */}
    <div className="w-64 h-64 relative overflow-hidden rounded-full shadow-2xl shadow-cyan-500/50">
      <img
        src="/logo.png"
        alt="TapCloud Logo"
        className="w-full h-full object-contain rounded-full"
      />
    </div>

    {/* Tap Effects */}
    {tapEffects.map((effect) => (
      <div
        key={effect.id}
        className="absolute pointer-events-none animate-ping"
        style={{ left: effect.x - 10, top: effect.y - 10 }}
      >
        <div className="w-5 h-5 bg-yellow-400 rounded-full opacity-75"></div>
      </div>
    ))}
  </div>
</div>


      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">Energy</span>
          <span className="text-sm font-semibold">{energy} / {maxEnergy}</span>
        </div>
        <Progress value={(energy / maxEnergy) * 100} className="h-2" />
      </div>

      <div className="mx-4 mb-6">
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-none p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-yellow-500 rounded transform rotate-45"></div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">Drop Wallet : Get up to 10 HUB</h3>
              <p className="text-sm text-gray-200">Check in daily, swap tokens, earn HUB</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-cyan-400">
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-400">
            <Zap className="h-6 w-6" />
            <span className="text-xs">Boost</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-400">
            <Users className="h-6 w-6" />
            <span className="text-xs">Social</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-gray-400">
            <Target className="h-6 w-6" />
            <span className="text-xs">Quest</span>
          </Button>
        </div>
      </div>

      {!isLoggedIn && (
        <div className="fixed top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm">
          Logging in...
        </div>
      )}
    </div>
  )
}
