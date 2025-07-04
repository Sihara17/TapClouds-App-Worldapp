import { Button } from "@/components/ui/button"
import { useState } from "react"

interface BoostCardProps {
  title: string
  description: string
  cost: number
  duration: number // in seconds
  onActivate: (boost: string, duration: number, cost: number) => void
  disabled: boolean
}

export default function BoostCard({
  title,
  description,
  cost,
  duration,
  onActivate,
  disabled,
}: BoostCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      onActivate(title, duration, cost)
      setIsLoading(false)
    }, 300) // Simulate delay
  }

  return (
    <div className="bg-gradient-to-r from-blue-800 to-cyan-600 text-white p-4 rounded-xl shadow-lg space-y-2">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-blue-100">{description}</p>
      <div className="flex justify-between items-center pt-2">
        <span className="text-yellow-300 font-bold">{cost} TCL</span>
        <Button
          onClick={handleClick}
          disabled={disabled || isLoading}
          className="bg-yellow-400 text-black hover:bg-yellow-300"
        >
          {isLoading ? "Activating..." : "Activate"}
        </Button>
      </div>
    </div>
  )
}
