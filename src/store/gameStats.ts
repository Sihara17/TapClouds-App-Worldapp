// src/store/gameStats.ts
import { create } from 'zustand'

type GameStats = {
  points: number
  energy: number
  maxEnergy: number
  setPoints: (value: number | ((prev: number) => number)) => void
  setEnergy: (value: number | ((prev: number) => number)) => void
}

export const useGameStats = create<GameStats>((set) => ({
  points: 0,
  energy: 900,
  maxEnergy: 900,
  setPoints: (value) =>
    set((state) => ({
      points: typeof value === "function" ? value(state.points) : value,
    })),
  setEnergy: (value) =>
    set((state) => ({
      energy: typeof value === "function" ? value(state.energy) : value,
    })),
}))
