"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SimulationModeToggleProps {
  isSimulation: boolean
  onToggle: (isSimulation: boolean) => void
}

export function SimulationModeToggle({ isSimulation, onToggle }: SimulationModeToggleProps) {
  const [showWarning, setShowWarning] = useState(false)

  const handleToggle = (checked: boolean) => {
    if (!checked && isSimulation) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 3000)
    }
    onToggle(checked)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
        <div className="flex items-center space-x-3">
          {isSimulation ? (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                SIMULATION MODE
              </Badge>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                LIVE TRADING
              </Badge>
            </div>
          )}
          <span className="text-sm font-medium">
            {isSimulation ? "Practice with virtual funds" : "Real money trading"}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-sm text-muted-foreground">{isSimulation ? "Simulation" : "Live"}</span>
          <Switch checked={isSimulation} onCheckedChange={handleToggle} className="data-[state=checked]:bg-blue-600" />
        </div>
      </div>

      {showWarning && (
        <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            You are now in LIVE TRADING mode. All trades will use real money.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
