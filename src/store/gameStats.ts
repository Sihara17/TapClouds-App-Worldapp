import { create } from "zustand"

interface GameStats {
  points: number
  energy: number
  maxEnergy: number
  setPoints: (points: number) => void
  addPoints: (amount: number) => void
  setEnergy: (energy: number) => void
  useEnergy: (amount: number) => void
  regenEnergy: (amount: number) => void
  resetStats: () => void
}

export const useGameStats = create<GameStats>((set) => ({
  points: 0,
  energy: 900,
  maxEnergy: 900,

  setPoints: (points) => set({ points }),
  addPoints: (amount) => set((state) => ({ points: state.points + amount })),

  setEnergy: (energy) => set((state) => ({
    energy: Math.min(state.maxEnergy, Math.max(0, energy))
  })),

  useEnergy: (amount) => set((state) => ({
    energy: Math.max(0, state.energy - amount)
  })),

  regenEnergy: (amount) => set((state) => ({
    energy: Math.min(state.maxEnergy, state.energy + amount)
  })),

  resetStats: () => set({ points: 0, energy: 900 }),
}))
