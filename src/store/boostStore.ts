import { create } from "zustand"

interface BoostState {
  activeBoost: "none" | "double" | "regen"
  boostEndTime: number | null
  activateBoost: (type: "double" | "regen", duration: number) => void
  clearBoost: () => void
}

export const useBoostStore = create<BoostState>((set) => ({
  activeBoost: "none",
  boostEndTime: null,
  activateBoost: (type, duration) => {
    const endTime = Date.now() + duration * 1000
    set({ activeBoost: type, boostEndTime: endTime })

    // auto clear after duration
    setTimeout(() => {
      set({ activeBoost: "none", boostEndTime: null })
    }, duration * 1000)
  },
  clearBoost: () => set({ activeBoost: "none", boostEndTime: null }),
}))
