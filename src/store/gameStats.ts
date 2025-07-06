import { create } from "zustand"

type GameStats = {
  points: number
  level: number
  gainPoints: (amount: number) => void
  setPoints: (amount: number) => void
  tryLevelUp: () => void
}

export const useGameStats = create<GameStats>((set, get) => ({
  points: 0,
  level: 1,

  gainPoints: (amount) => {
    const newPoints = get().points + amount
    set({ points: newPoints })
    localStorage.setItem("points", newPoints.toString())
    get().tryLevelUp()
  },

  setPoints: (amount) => {
    set({ points: amount })
    localStorage.setItem("points", amount.toString())
  },

  tryLevelUp: () => {
    const { points, level } = get()

    // Contoh threshold naik level
    const levelThresholds: Record<number, number> = {
      1: 1000,
      2: 3000,
      3: 6000,
      4: 10000,
      5: 15000,
      6: 21000,
      7: 28000,
      8: 36000,
      9: 45000,
      10: 55000,
      // bisa dilanjutkan...
    }

    const nextLevel = level + 1
    const nextThreshold = levelThresholds[nextLevel]

    if (nextThreshold && points >= nextThreshold) {
      set({ level: nextLevel })
      console.log(`Naik ke level ${nextLevel}!`)
    }
  },
}))

// Load points dan level dari localStorage saat store dibuat
if (typeof window !== "undefined") {
  const storedPoints = parseFloat(localStorage.getItem("points") || "0")
  const storedLevel = parseInt(localStorage.getItem("level") || "1")

  if (!isNaN(storedPoints)) {
    useGameStats.setState({ points: storedPoints })
  }

  if (!isNaN(storedLevel)) {
    useGameStats.setState({ level: storedLevel })
  }

  // Simpan level ke localStorage saat berubah
  useGameStats.subscribe((state) => {
    localStorage.setItem("level", state.level.toString())
  })
}
