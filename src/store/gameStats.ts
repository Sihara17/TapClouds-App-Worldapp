// src/store/gameStats.ts
import { create } from 'zustand'

const pointsRequiredPerLevel = [
  0,      // Level 1
  1000,   // Level 2
  3000,   // Level 3
  5000,   // Level 4
  10000,  // Level 5
  20000,  // Level 6
  30000,  // Level 7
  45000,  // Level 8
  60000,  // Level 9
  90000,  // Level 10
  110000, // Level 11
  130000, // Level 12
  150000, // Level 13
  170000, // Level 14
  190000, // Level 15
  210000, // Level 16
  230000, // Level 17
  250000, // Level 18
  270000, // Level 19
  290000, // Level 20
  310000, // Level 21
  330000, // Level 22
  350000, // Level 23
  370000, // Level 24
  390000, // Level 25
  410000, // Level 26
  430000, // Level 27
  450000, // Level 28
  470000, // Level 29
  500000  // Level 30
  // Up to level 50 bisa dilanjut
]

type GameStats = {
  points: number
  level: number
  setPoints: (pts: number) => void
  gainPoints: (pts: number) => void
  tryLevelUp: () => void
}

export const useGameStats = create<GameStats>((set, get) => ({
  points: 0,
  level: 1,
  setPoints: (pts) => set({ points: pts }),
  gainPoints: (pts) => {
    const newPoints = get().points + pts
    set({ points: newPoints })
  },
  tryLevelUp: () => {
    const { level, points } = get()
    const nextLevel = level + 1
    const required = pointsRequiredPerLevel[nextLevel]
    if (!required) return // max level

    if (points >= required) {
      set({ level: nextLevel, points: points - required })
    }
  },
}))

// src/store/energyStore.ts
import { create } from 'zustand'

type EnergyStore = {
  energyLevel: number
  maxEnergy: number
  upgradeCost: number
  upgradeEnergyLevel: () => void
}

const energyPerLevel = Array.from({ length: 31 }, (_, i) => {
  if (i === 0) return 0
  if (i === 1) return 200
  return energyPerLevel[i - 1] + 100 + (i > 5 ? Math.floor(i * 10) : 0) // Bisa disesuaikan
})

const upgradeCostPerLevel = Array.from({ length: 31 }, (_, i) => {
  if (i === 0) return 0
  return i * 2000 + i * i * 100 // Contoh perhitungan, bisa diganti
})

export const useEnergyStore = create<EnergyStore>((set, get) => ({
  energyLevel: 1,
  maxEnergy: energyPerLevel[1],
  upgradeCost: upgradeCostPerLevel[1],
  upgradeEnergyLevel: () => {
    const { energyLevel } = get()
    const nextLevel = energyLevel + 1

    if (nextLevel >= energyPerLevel.length) return

    set({
      energyLevel: nextLevel,
      maxEnergy: energyPerLevel[nextLevel],
      upgradeCost: upgradeCostPerLevel[nextLevel] ?? 0,
    })
  },
}))
