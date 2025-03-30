"use client"

import { Book, BarChart2, Lock, ChevronRight } from "lucide-react"
import Button from "@/components/ui/button"

export default function LearningPath() {
  return (
    <div className="bg-[#111827] rounded-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Current Learning Path</h2>
        <p className="text-gray-400">Advanced Trading Strategies</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Module Progress</span>
          <span className="text-green-400">4/7 Completed</span>
        </div>
        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <div className="bg-green-500 h-full" style={{ width: "57%" }}></div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-4 bg-[#1a2234] rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-green-900/50 p-2 rounded-full text-green-500">
              <Book className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Risk Management Fundamentals</h3>
              <p className="text-xs text-green-500">Completed</p>
            </div>
          </div>
          <span className="bg-green-900 text-green-400 text-xs px-2 py-1 rounded">100%</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-[#1a2234] rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-blue-900/50 p-2 rounded-full text-blue-500">
              <BarChart2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Technical Analysis Patterns</h3>
              <p className="text-xs text-blue-500">In Progress</p>
            </div>
          </div>
          <span className="bg-blue-900 text-blue-400 text-xs px-2 py-1 rounded">75%</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-[#1a2234] rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-gray-800/50 p-2 rounded-full text-gray-500">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Advanced Order Types</h3>
              <p className="text-xs text-gray-500">Locked</p>
            </div>
          </div>
          <Button
            href="#start" 
            onClick={() => console.log("Start module")}
            className="flex items-center bg-black text-white border border-white/50 px-5 py-1.5 rounded-md hover:opacity-80 transition-opacity"
          >
            Start <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <Button 
        href="#continue" 
        onClick={() => console.log("Continue learning")}
        className="flex items-center justify-center w-full bg-[#22C55E] text-white px-3 py-3 rounded-md hover:bg-[#16A34A] transition-colors font-medium"
      >
        Continue Learning
      </Button>
    </div>
  )
}

