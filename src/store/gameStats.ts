// src/store/gameStats.ts
import { create } from 'zustand'

type GameStats = {
  points: number
  energy: number
  maxEnergy: number
  setPoints: (pts: number) => void
  setEnergy: (energy: number) => void
}

export const useGameStats = create<GameStats>((set) => ({
  points: 0,
  energy: 900, // ✅ pastikan default 900
  maxEnergy: 900,
  setPoints: (pts) => set({ points: pts }),
  setEnergy: (energy) => set({ energy }),
}))
