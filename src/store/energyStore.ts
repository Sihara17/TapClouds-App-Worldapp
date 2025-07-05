import { create } from "zustand"
import { persist } from "zustand/middleware"
import { usePointStore } from "./pointStore"

// Tabel kapasitas dan biaya upgrade Energy Store Level 1–30
const energyLevels = Array.from({ length: 30 }, (_, i) => ({
  level: i + 1,
  maxEnergy: 200 + i * 50,
  cost: i === 0 ? 0 : 500 * i, // Level 1 = default, sisanya kelipatan 500
}))

interface EnergyState {
  energyLevel: number
  maxEnergy: number
  upgradeEnergyLevel: () => void
}

export const useEnergyStore = create<EnergyState>()(
  persist(
    (set, get) => ({
      energyLevel: 1,
      maxEnergy: energyLevels[0].maxEnergy,
      upgradeEnergyLevel: () => {
        const { energyLevel } = get()
        const nextLevel = energyLevel + 1
        if (nextLevel > 30) return

        const next = energyLevels[nextLevel - 1]
        const { points, decreasePoints } = usePointStore.getState()

        if (points >= next.cost) {
          decreasePoints(next.cost)
          set({
            energyLevel: next.level,
            maxEnergy: next.maxEnergy,
          })
        } else {
          console.log("Not enough points")
        }
      },
    }),
    {
      name: "energy-store",
    }
  )
)
