import { create } from "zustand"

interface BoostState {
  activeBoost: "none" | "double" | "energy"
  activateBoost: (type: "double" | "energy", duration: number) => void
}

export const useBoostStore = create<BoostState>((set) => ({
  activeBoost: "none",
  activateBoost: (type, duration) => {
    set({ activeBoost: type })

    setTimeout(() => {
      set({ activeBoost: "none" })
    }, duration * 1000)
  },
}))
