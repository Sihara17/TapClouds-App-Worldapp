import { create } from "zustand"
import { persist } from "zustand/middleware"

export type BoostType = "auto" | "click" | "energyPerDay"

interface BoostState {
  levels: Record<BoostType, number>
  upgradeBoost: (type: BoostType) => void
}

export const useBoostStore = create<BoostState>()(
  persist(
    (set, get) => ({
      levels: {
        auto: 1,
        click: 1,
        energyPerDay: 1,
      },
      upgradeBoost: (type) => {
        const { levels } = get()
        const currentLevel = levels[type]
        if (currentLevel >= 50) return

        set((state) => ({
          levels: {
            ...state.levels,
            [type]: currentLevel + 1,
          },
        }))
      },
    }),
    { name: "boost-level-store" }
  )
)
