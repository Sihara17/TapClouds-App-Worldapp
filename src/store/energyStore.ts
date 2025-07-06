// src/store/energyStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

// Energy per level mapping
const energyPerDayLevels: Record<number, number> = {
  1: 200,
  2: 500,
  3: 1000,
  4: 2000,
  5: 3000,
  6: 4000,
  7: 5000,
  8: 6000,
  9: 7000,
  10: 8000,
  // lanjutkan hingga level 30 jika perlu
}

type EnergyState = {
  energy: number
  maxEnergy: number
  setEnergy: (val: number) => void
  refreshMaxEnergy: () => void
  resetEnergyIfNewDay: () => void
}

export const useEnergyStore = create<EnergyState>()(
  persist(
    (set, get) => ({
      energy: 200,
      maxEnergy: 200,

      setEnergy: (val) => set({ energy: val }),

      refreshMaxEnergy: () => {
        const level = parseInt(localStorage.getItem("boostLevel-energyPerDay") || "1")
        const newMax = energyPerDayLevels[level] || 200
        set({ maxEnergy: newMax })
      },

      resetEnergyIfNewDay: () => {
        const today = new Date().toDateString()
        const lastReset = localStorage.getItem("lastEnergyReset")
        if (lastReset !== today) {
          set({ energy: get().maxEnergy })
          localStorage.setItem("lastEnergyReset", today)
        }
      },
    }),
    {
      name: "energy-storage", // key untuk localStorage
    }
  )
)
