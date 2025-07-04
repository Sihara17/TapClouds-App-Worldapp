"use client"

import BoostCard from "@/components/BoostCard"

export default function BoostPage() {
  const handleBoost = (boostName: string) => {
    alert(`Boost activated: ${boostName}`)
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-blue-900 p-6" style={{ backgroundImage: "url('/bg-Cloud.png')" }}>
      <h1 className="text-2xl font-bold mb-4">Boost Center</h1>

      <div className="grid gap-4">
        <BoostCard
          title="Double Points"
          description="Dapatkan 2x poin selama 10 menit."
          onBoost={() => handleBoost("Double Points")}
        />

        <BoostCard
          title="Energy Regen x2"
          description="Regenerasi energi dua kali lebih cepat selama 15 menit."
          onBoost={() => handleBoost("Energy Regen x2")}
        />

        <BoostCard
          title="Auto Tap"
          description="Otomatis tap cloud selama 1 menit."
          onBoost={() => handleBoost("Auto Tap")}
          disabled
        />
      </div>
    </div>
  )
}
