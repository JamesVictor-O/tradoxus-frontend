"use client"

import { Shield, Award } from "lucide-react"
import Button from "@/components/ui/button"

export default function Certifications() {
  return (
    <div className="bg-[#111827] rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-gray-400" />
        <h2 className="text-xl font-bold">Certifications</h2>
      </div>

      <div className="space-y-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-900 rounded-full p-2">
            <Shield className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium">Crypto Fundamentals</h3>
            <p className="text-xs text-gray-400">Earned May 2023</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-blue-900 rounded-full p-2">
            <Award className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium">Technical Analysis</h3>
            <p className="text-xs text-gray-400">Earned July 2023</p>
          </div>
        </div>
      </div>

      <Button 
        href="/certifications"
        onClick={() => console.log("View all certifications")}
        className="flex items-center justify-center w-full bg-black text-white border border-white/50 px-4 py-2.5 rounded-md hover:opacity-80 transition-opacity font-medium"
      >
        View All Certifications
      </Button>
    </div>
  )
}

