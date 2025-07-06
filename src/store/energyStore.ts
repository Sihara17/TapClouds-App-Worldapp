// src/store/energyStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

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
  lastResetDate: string | null
  setEnergy: (value: number) => void
  refreshMaxEnergy: () => void
  resetEnergyIfNewDay: () => void
}

export const useEnergyStore = create(
  persist<EnergyState>(
    (set, get) => ({
      energy: 200,
      maxEnergy: 200,
      lastResetDate: null,

      setEnergy: (value) => set({ energy: value }),

      refreshMaxEnergy: () => {
        const level = typeof window !== "undefined"
          ? parseInt(localStorage.getItem("boostLevel-energyPerDay") || "1")
          : 1

        const newMax = energyPerDayLevels[level] || 200
        set({ maxEnergy: newMax })
      },

      resetEnergyIfNewDay: () => {
        const today = new Date().toDateString()
        const { lastResetDate, maxEnergy } = get()

        if (lastResetDate !== today) {
          set({ energy: maxEnergy, lastResetDate: today })
        }
      },
    }),
    {
      name: "tapcloud-energy",
      partialize: (state) => ({
        energy: state.energy,
        maxEnergy: state.maxEnergy,
        lastResetDate: state.lastResetDate,
      }),
    }
  )
)
