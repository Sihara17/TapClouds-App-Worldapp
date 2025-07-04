import { create } from "zustand"

interface BoostState {
  doublePointActive: boolean
  energyRegenActive: boolean
  doublePointDuration: number
  energyRegenDuration: number
  activateBoost: (type: "double" | "regen", durationInSeconds: number) => void
}

export const useBoostStore = create<BoostState>((set) => ({
  doublePointActive: false,
  energyRegenActive: false,
  doublePointDuration: 0,
  energyRegenDuration: 0,

  activateBoost: (type, duration) => {
    if (type === "double") {
      set({ doublePointActive: true, doublePointDuration: duration })
      setTimeout(() => {
        set({ doublePointActive: false, doublePointDuration: 0 })
      }, duration * 1000)
    } else if (type === "regen") {
      set({ energyRegenActive: true, energyRegenDuration: duration })
      setTimeout(() => {
        set({ energyRegenActive: false, energyRegenDuration: 0 })
      }, duration * 1000)
    }
  }
}))
