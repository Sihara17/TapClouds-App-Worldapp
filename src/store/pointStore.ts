import { create } from "zustand"
import { persist } from "zustand/middleware"

interface PointState {
  points: number
  setPoints: (value: number) => void
  addPoints: (amount: number) => void
}

export const usePointStore = create<PointState>()(
  persist(
    (set) => ({
      points: 0,
      setPoints: (value) => set({ points: value }),
      addPoints: (amount) =>
        set((state) => ({ points: state.points + amount })),
    }),
    {
      name: "point-storage",
    }
  )
)
