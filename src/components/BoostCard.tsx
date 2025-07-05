"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

type BoostCardProps = {
  title: string
  description: string
  onBoost: () => void
  disabled?: boolean
}

export default function BoostCard({ title, description, onBoost, disabled = false }: BoostCardProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-blue-900">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <Sparkles className="text-cyan-500 w-6 h-6" />
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={onBoost}
          disabled={disabled}
          className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-4"
        >
          {disabled ? "Coming Soon" : "Activate"}
        </Button>
      </div>
    </Card>
  )
}
