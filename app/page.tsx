"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, Zap, Target } from "lucide-react"
import Link from "next/link"
import { useBoostStore } from "@/store/boostStore"
import { useGameStats } from "@/store/gameStats"
import { useEnergyStore } from "@/store/energyStore"

export default function TapCloud() {
  const liffId = "2007685380-qx5MEZd9"
  const { points, gainPoints } = useGameStats()
  const { energy, setEnergy, maxEnergy, refreshMaxEnergy, resetEnergyIfNewDay } = useEnergyStore()
  const { doublePointActive, levels } = useBoostStore()

  const [tapEffects, setTapEffects] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    import("@line/liff").then((liff) => {
      liff.default.init({ liffId }).then(() => {
        if (liff.default.isLoggedIn()) {
          setIsLoggedIn(true)
          liff.default.getProfile().then((profile) => {
            setUserName(profile.displayName)
          })
        }
      })
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const autoPoints = levels.auto * 0.1
      if (autoPoints > 0) gainPoints(autoPoints)
    }, 1000)
    return () => clearInterval(interval)
  }, [levels.auto])

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    if (energy <= 0) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const basePoints = Math.floor(Math.random() * 5) + 1
    const finalPoints = doublePointActive ? basePoints * 2 : basePoints

    gainPoints(finalPoints)
    setEnergy(Math.max(0, energy - 1))

    const newEffect = { id: Date.now(), x, y }
    setTapEffects((prev) => [...prev, newEffect])
    setTimeout(() => setTapEffects((prev) => prev.filter((e) => e.id !== newEffect.id)), 1000)
  }

  useEffect(() => {
    const checkReset = () => {
      const lastReset = localStorage.getItem("lastEnergyReset")
      const today = new Date().toDateString()
      if (lastReset !== today) {
        setEnergy(maxEnergy)
        localStorage.setItem("lastEnergyReset", today)
      }
    }
    checkReset()
    const interval = setInterval(checkReset, 60000)
    return () => clearInterval(interval)
  }, [maxEnergy])

  useEffect(() => {
    refreshMaxEnergy()
    resetEnergyIfNewDay()
  }, [levels.energyPerDay])

  return (
    <div className="min-h-screen bg-blue-100 text-center p-4">
      <h1 className="text-3xl font-bold mb-2">TapCloud</h1>
      <p className="text-xl font-semibold">Points: {Math.floor(points)}</p>
      <p className="mb-4">Energy: {energy} / {maxEnergy}</p>

      <div
        onClick={handleTap}
        className="mx-auto mb-6 w-40 h-40 rounded-full flex items-center justify-center text-lg font-bold shadow-lg active:scale-95 transition-transform relative overflow-hidden"
        style={{ backgroundImage: "url('/logo.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {tapEffects.map(effect => (
          <div
            key={effect.id}
            className="absolute w-4 h-4 bg-yellow-300 rounded-full animate-ping pointer-events-none"
            style={{ left: effect.x - 8, top: effect.y - 8 }}
          />
        ))}
      </div>

      {isLoggedIn ? (
        <p className="text-cyan-600 mb-6">@{userName}</p>
      ) : (
        <Button
          onClick={() => {
            import("@line/liff").then((liff) => liff.default.login())
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full mb-6"
        >
          Login with LINE
        </Button>
      )}

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around">
        <Link href="/">
          <Home className="w-6 h-6 text-black" />
        </Link>
        <Link href="/boost">
          <Zap className="w-6 h-6 text-black" />
        </Link>
        <Link href="/quest">
          <Target className="w-6 h-6 text-black" />
        </Link>
      </footer>
    </div>
  )
}
