"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Settings } from "lucide-react"
import Button from "@/components/ui/button"

export default function LearningTabs() {
  const [activeTab, setActiveTab] = useState("learning")

  const tabs = [
    { id: "learning", label: "Learning Progress" },
    { id: "trading", label: "Trading Performance" },
    { id: "achievements", label: "Achievements" },
  ]

  return (
    <div className="flex justify-between items-center">
      <div className="inline-flex bg-[#1a2234] rounded-md">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-colors rounded-md",
              activeTab === tab.id 
                ? "bg-[#2E4A36] text-[#22C55E]" 
                : "text-gray-400 hover:text-gray-300",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <Button 
        href="#" 
        onClick={() => console.log("Settings clicked")}
        className="flex items-center bg-black text-white border border-white/50 px-4 py-1.5 rounded-md hover:opacity-80 transition-opacity"
      >
        <Settings className="h-4 w-4 mr-2" />
        Settings
      </Button>
    </div>
  )
}

