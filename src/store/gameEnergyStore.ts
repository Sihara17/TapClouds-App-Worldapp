import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useEnergyStore } from './energyStore'

type GameEnergyStore = {
  currentEnergy: number
  lastReset: string
  resetEnergyIfNeeded: () => void
  consumeEnergy: (amount?: number) => void
}

export const useGameEnergyStore = create<GameEnergyStore>()(
  persist(
    (set, get) => ({
      currentEnergy: useEnergyStore.getState().maxEnergy,
      lastReset: new Date().toDateString(),

      resetEnergyIfNeeded: () => {
        const today = new Date().toDateString()
        const { lastReset } = get()
        if (today !== lastReset) {
          const max = useEnergyStore.getState().maxEnergy
          set({ currentEnergy: max, lastReset: today })
        }
      },

      consumeEnergy: (amount = 1) => {
        const { currentEnergy } = get()
        if (currentEnergy >= amount) {
          set({ currentEnergy: currentEnergy - amount })
        }
      },
    }),
    {
      name: 'game-energy-store',
    }
  )
)
