"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Home, Zap, Users, Target, X, MoreVertical, Sparkles, Gift, Settings } from "lucide-react"

declare global {
  interface Window {
    liff: any
  }
}

export default function HumanTapApp() {
  const [points, setPoints] = useState(108713386)
  const [seasonPoints, setSeasonPoints] = useState(2610)
  const [energy, setEnergy] = useState(900)
  const [maxEnergy] = useState(900)
  const [isAnimating, setIsAnimating] = useState(false)
  const [tapEffects, setTapEffects] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [liffInitialized, setLiffInitialized] = useState(false)

  useEffect(() => {
    // Initialize LIFF
    const initializeLiff = async () => {
      try {
        await window.liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || "your-liff-id" })
        setLiffInitialized(true)

        if (!window.liff.isLoggedIn()) {
          window.liff.login()
        }
      } catch (error) {
        console.error("LIFF initialization failed", error)
      }
    }

    if (typeof window !== "undefined" && window.liff) {
      initializeLiff()
    }
  }, [])

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    if (energy <= 0) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Add points and reduce energy
    const pointsToAdd = Math.floor(Math.random() * 10) + 1
    setPoints((prev) => prev + pointsToAdd)
    setSeasonPoints((prev) => prev + pointsToAdd)
    setEnergy((prev) => Math.max(0, prev - 1))

    // Animation effects
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)

    // Add tap effect
    const newEffect = { id: Date.now(), x, y }
    setTapEffects((prev) => [...prev, newEffect])
    setTimeout(() => {
      setTapEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id))
    }, 1000)
  }

  // Energy regeneration
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => Math.min(maxEnergy, prev + 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [maxEnergy])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 relative z-10">
        <Button variant="ghost" size="icon" className="text-white">
          <X className="h-6 w-6" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="font-semibold">Human Tap</span>
        </div>

        <Button variant="ghost" size="icon" className="text-white">
          <MoreVertical className="h-6 w-6" />
        </Button>
      </div>

      {/* User Info */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-cyan-400 text-lg">@sihara.8537</span>
          <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-sm">521</span>
          </div>
        </div>

        {/* Main Points Display */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full"></div>
          </div>
          <span className="text-4xl md:text-5xl font-bold">{points.toLocaleString()}</span>
        </div>

        {/* Season Points */}
        <div className="mb-6">
          <p className="text-gray-300 mb-1">Season 1 Final Point</p>
          <p className="text-2xl font-bold">{seasonPoints.toLocaleString()}</p>
        </div>

        {/* Action Buttons */}
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

      {/* Main Tap Area */}
      <div className="flex justify-center mb-8 relative">
        <div
          className={`relative cursor-pointer transition-transform duration-200 ${
            isAnimating ? "scale-95" : "scale-100"
          }`}
          onClick={handleTap}
        >
          <div className="w-64 h-64 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50 relative overflow-hidden">
            {/* Bubble effects */}
            <div className="absolute top-8 left-12 w-6 h-6 bg-white/30 rounded-full"></div>
            <div className="absolute top-16 right-8 w-4 h-4 bg-white/20 rounded-full"></div>
            <div className="absolute bottom-12 left-8 w-8 h-8 bg-white/25 rounded-full"></div>
            <div className="absolute bottom-8 right-12 w-3 h-3 bg-white/30 rounded-full"></div>
            <div className="absolute bottom-16 right-16 w-2 h-2 bg-white/40 rounded-full"></div>

            {/* Face */}
            <div className="relative z-10">
              <div className="flex gap-8 mb-4">
                <div className="w-4 h-4 bg-black rounded-full"></div>
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>
              <div className="w-12 h-6 border-b-4 border-black rounded-full"></div>
            </div>
          </div>

          {/* Tap Effects */}
          {tapEffects.map((effect) => (
            <div
              key={effect.id}
              className="absolute pointer-events-none animate-ping"
              style={{
                left: effect.x - 10,
                top: effect.y - 10,
              }}
            >
              <div className="w-5 h-5 bg-yellow-400 rounded-full opacity-75"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Energy Bar */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">Energy</span>
          <span className="text-sm font-semibold">
            {energy} / {maxEnergy}
          </span>
        </div>
        <Progress value={(energy / maxEnergy) * 100} className="h-2" />
      </div>

      {/* Drop Wallet Banner */}
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

      {/* Bottom Navigation */}
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

      {/* LIFF Status */}
      {!liffInitialized && (
        <div className="fixed top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm">
          Initializing LIFF...
        </div>
      )}
    </div>
  )
}
