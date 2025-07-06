// src/store/energyStore.ts
import { create } from "zustand"

// Mapping level ke energi per hari
const energyPerDayLevels: Record<number, number> = {
  1: 200,
  2: 500,
  3: 1000,
  4: 2000,
  5: 3000,
  6: 4000,
  // Tambah sesuai kebutuhan
}

type EnergyState = {
  energy: number
  maxEnergy: number
  setEnergy: (value: number) => void
  refreshMaxEnergy: () => void
  resetEnergyIfNewDay: () => void
  loadEnergyFromStorage: () => void
}

export const useEnergyStore = create<EnergyState>((set, get) => ({
  energy: 200,
  maxEnergy: 200,

  setEnergy: (value: number) => {
    set({ energy: value })
    if (typeof window !== "undefined") {
      localStorage.setItem("currentEnergy", value.toString())
    }
  },

  refreshMaxEnergy: () => {
    const level = typeof window !== "undefined"
      ? parseInt(localStorage.getItem("boostLevel-energyPerDay") || "1")
      : 1
    const newMax = energyPerDayLevels[level] || 200
    set({ maxEnergy: newMax })
  },

  resetEnergyIfNewDay: () => {
    if (typeof window === "undefined") return

    const today = new Date().toDateString()
    const lastReset = localStorage.getItem("lastEnergyReset")

    if (lastReset !== today) {
      const { maxEnergy, setEnergy } = get()
      setEnergy(maxEnergy)
      localStorage.setItem("lastEnergyReset", today)
    }
  },

  loadEnergyFromStorage: () => {
    if (typeof window === "undefined") return

    const stored = localStorage.getItem("currentEnergy")
    if (stored) {
      set({ energy: parseInt(stored) })
    }
  },
}))
