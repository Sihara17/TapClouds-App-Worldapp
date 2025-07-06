// src/store/gameStats.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

type GameStats = {
  points: number
  level: number
  gainPoints: (val: number) => void
  setPoints: (val: number) => void
}

export const useGameStats = create<GameStats>()(
  persist(
    (set) => ({
      points: 0,
      level: 1,

      gainPoints: (val) => {
        set((state) => ({ points: state.points + val }))
      },

      setPoints: (val) => {
        set({ points: val })
      },
    }),
    {
      name: "game-points-storage", // key localStorage
    }
  )
)
