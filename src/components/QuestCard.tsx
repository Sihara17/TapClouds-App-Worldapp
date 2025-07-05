// components/QuestCard.tsx
"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuestCardProps {
  day: number
  reward: string
  isCompleted: boolean
  onClaim: () => void
  disabled?: boolean
}

export default function QuestCard({ day, reward, isCompleted, onClaim, disabled }: QuestCardProps) {
  return (
    <div className={cn(
      "p-4 rounded-xl border shadow-sm bg-white/10 backdrop-blur-md",
      isCompleted ? "opacity-50" : ""
    )}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-white">Day {day}</h3>
          <p className="text-sm text-gray-200">Reward: {reward}</p>
        </div>
        <Button
          size="sm"
          className="bg-yellow-400 text-black hover:bg-yellow-500"
          onClick={onClaim}
          disabled={isCompleted || disabled}
        >
          {isCompleted ? "Claimed" : "Claim"}
        </Button>
      </div>
    </div>
  )
}
