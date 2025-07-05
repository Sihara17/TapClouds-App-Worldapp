// src/store/energyStore.ts
import { create } from "zustand"

type EnergyState = {
  energy: number
  maxEnergy: number
  setEnergy: (value: number) => void
  refreshMaxEnergy: () => void
}

export const useEnergyStore = create<EnergyState>((set, get) => ({
  energy: 200,
  maxEnergy: 200,
  setEnergy: (value) => set({ energy: value }),
  refreshMaxEnergy: () => {
    const level = /* ambil level dari boostStore, misalnya dari localStorage atau props */
      typeof window !== "undefined"
        ? parseInt(localStorage.getItem("boostLevel-energyPerDay") || "1")
        : 1
    const newMax = 200 + (level - 1) * 100
    set({ maxEnergy: newMax })
  },
}))
