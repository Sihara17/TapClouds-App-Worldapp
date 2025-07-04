// src/store/boostStore.ts
import { create } from "zustand"

export type BoostType = "doublePoints" | "energyRegen" | null

interface BoostStore {
  boost: BoostType
  setBoost: (type: BoostType) => void
  resetBoost: () => void
}

export const useBoostStore = create<BoostStore>((set) => ({
  boost: null,
  setBoost: (type) => set({ boost: type }),
  resetBoost: () => set({ boost: null }),
}))
