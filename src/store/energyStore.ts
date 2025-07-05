// src/store/energyStore.ts
import { create } from "zustand"

// Level ke-maxEnergy mapping
const energyPerDayLevels: Record<number, number> = {
  1: 200,
  2: 500,
  3: 1000,
  4: 2000,
  5: 3000,
  6: 4000,
}

type EnergyState = {
  energy: number
  maxEnergy: number
  setEnergy: (value: number) => void
  refreshMaxEnergy: () => void
}

export const useEnergyStore = create<EnergyState>((set) => ({
  energy: 200,
  maxEnergy: 200,
  setEnergy: (value) => set({ energy: value }),
  refreshMaxEnergy: () => {
    const level = typeof window !== "undefined"
      ? parseInt(localStorage.getItem("boostLevel-energyPerDay") || "1")
      : 1

    const newMax = energyPerDayLevels[level] || 200
    set({ maxEnergy: newMax })
  },
}))
