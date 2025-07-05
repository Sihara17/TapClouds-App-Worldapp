import { create } from "zustand"
import { useBoostStore } from "./boostStore"

type EnergyStore = {
  maxEnergy: number
  refreshMaxEnergy: () => void
}

export const useEnergyStore = create<EnergyStore>((set) => ({
  maxEnergy: getEnergyFromBoost(),

  refreshMaxEnergy: () => {
    set({ maxEnergy: getEnergyFromBoost() })
  },
}))

function getEnergyFromBoost() {
  const level = useBoostStore.getState().levels.energyPerDay
  return 200 + (level - 1) * 100
}
