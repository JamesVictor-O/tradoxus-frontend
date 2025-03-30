"use client"

import { Trophy, Award } from "lucide-react"
import Button from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function ProfileSidebar() {
  return (
    <div className="bg-[#111827] rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Trader Profile</h2>
        <p className="text-gray-400 text-sm">Your trading journey and achievements</p>
      </div>

      <div className="flex flex-col items-center mb-6">
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
        <h3 className="text-lg font-bold">John Doe</h3>
        <p className="text-gray-400 text-sm">Intermediate Trader</p>

        <div className="flex gap-2 mt-2">
          <span className="bg-green-800 text-green-400 text-xs px-3 py-1 rounded-full">Level 12</span>
          <span className="bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded-full">Joined Mar 2023</span>
        </div>
      </div>

      <div className="w-full mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Overall Progress</span>
          <span className="text-green-400">66%</span>
        </div>
        <Progress value={66} className="h-2 bg-gray-800" indicatorClassName="bg-green-500" />
      </div>

      <div className="grid grid-cols-2 w-full gap-4 mb-6">
        <div className="bg-[#1a2234] rounded-lg p-4 flex flex-col items-center">
          <Trophy className="h-6 w-6 text-yellow-500 mb-2" />
          <span className="text-2xl font-bold">24</span>
          <span className="text-xs text-gray-400">Achievements</span>
        </div>
        <div className="bg-[#1a2234] rounded-lg p-4 flex flex-col items-center">
          <Award className="h-6 w-6 text-blue-500 mb-2" />
          <span className="text-2xl font-bold">8</span>
          <span className="text-xs text-gray-400">Certifications</span>
        </div>
      </div>

      <Button 
        href="/profile/public" 
        onClick={() => console.log("View profile")}
        className="flex items-center justify-center w-full bg-[#22C55E] text-white px-3 py-2 rounded-md hover:bg-[#16A34A] transition-colors"
      >
        View Public Profile
      </Button>
    </div>
  )
}

