"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimulationModeToggle } from "@/components/trading-simulation/simulation-mode-toggle"
import { SimulationPortfolio } from "@/components/trading-simulation/simulation-portfolio"
import { SimulationTradingInterface } from "@/components/trading-simulation/simulation-trading-interface"
import { SimulationPerformance } from "@/components/trading-simulation/simulation-performance"
import { SimulationTutorial } from "@/components/trading-simulation/simulation-tutorial"

export default function TradingSimulationPage() {
  const [isSimulation, setIsSimulation] = useState(true)

  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trading Simulation</h1>
          <p className="text-muted-foreground">
            Practice trading strategies with virtual funds in a risk-free environment
          </p>
        </div>
      </div>

      <SimulationModeToggle isSimulation={isSimulation} onToggle={setIsSimulation} />

      <Tabs defaultValue="portfolio" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="trade">Trade</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="tutorial">Tutorial</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-6">
          <SimulationPortfolio isSimulation={isSimulation} />
        </TabsContent>

        <TabsContent value="trade" className="space-y-6">
          <SimulationTradingInterface isSimulation={isSimulation} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <SimulationPerformance isSimulation={isSimulation} />
        </TabsContent>

        <TabsContent value="tutorial" className="space-y-6">
          <SimulationTutorial isSimulation={isSimulation} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
