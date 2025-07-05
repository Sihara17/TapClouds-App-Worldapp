import { create } from "zustand"

interface GameStatsState {
  points: number
  energy: number
  setPoints: (value: number) => void
  addPoints: (value: number) => void
  setEnergy: (value: number) => void
}

export const useGameStats = create<GameStatsState>((set) => ({
  points: 0,
  energy: 900,
  setPoints: (value) => set({ points: value }),
  addPoints: (value) => set((state) => ({ points: state.points + value })),
  setEnergy: (value) => set({ energy: value }),
}))
