"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, PlayCircle, BookOpen, Target, TrendingUp, Shield } from "lucide-react"

interface SimulationTutorialProps {
  isSimulation: boolean
}

export function SimulationTutorial({ isSimulation }: SimulationTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const tutorialSteps = [
    {
      title: "Welcome to Trading Simulation",
      description: "Learn to trade without risking real money. You start with $100,000 in virtual funds.",
      icon: Shield,
      content:
        "Trading simulation allows you to practice trading strategies, learn the platform, and build confidence before trading with real money. All trades are virtual and have no financial impact.",
    },
    {
      title: "Understanding Your Virtual Portfolio",
      description: "Monitor your virtual holdings, cash balance, and performance metrics.",
      icon: Target,
      content:
        "Your portfolio shows your virtual cash balance, current holdings, and profit/loss. The portfolio value updates in real-time based on market prices, giving you a realistic trading experience.",
    },
    {
      title: "Placing Virtual Orders",
      description: "Learn how to place buy and sell orders using virtual funds.",
      icon: TrendingUp,
      content:
        "You can place market orders (executed immediately at current price) or limit orders (executed when price reaches your specified level). All orders use virtual money and simulate real trading conditions.",
    },
    {
      title: "Tracking Performance",
      description: "Analyze your trading performance with detailed charts and metrics.",
      icon: BookOpen,
      content:
        "Monitor your realized and unrealized gains/losses, view your trading history, and analyze your performance over time. Use these insights to improve your trading strategies.",
    },
  ]

  const handleCompleteStep = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
    }
    if (stepIndex < tutorialSteps.length - 1) {
      setCurrentStep(stepIndex + 1)
    }
  }

  const progress = (completedSteps.length / tutorialSteps.length) * 100

  if (!isSimulation) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Switch to Simulation Mode to access the trading tutorial</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tutorial Progress */}
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Trading Simulation Tutorial</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {completedSteps.length}/{tutorialSteps.length} Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Tutorial Steps */}
      <div className="grid gap-6 md:grid-cols-2">
        {tutorialSteps.map((step, index) => {
          const isCompleted = completedSteps.includes(index)
          const isCurrent = currentStep === index
          const isLocked = index > 0 && !completedSteps.includes(index - 1) && !isCompleted

          return (
            <Card
              key={index}
              className={`transition-all ${
                isCurrent
                  ? "ring-2 ring-blue-500 border-blue-200"
                  : isCompleted
                    ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50"
                    : isLocked
                      ? "opacity-60"
                      : ""
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isCompleted
                        ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                        : isCurrent
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground font-normal">{step.description}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{step.content}</p>

                {!isCompleted && !isLocked && (
                  <Button
                    onClick={() => handleCompleteStep(index)}
                    className={isCurrent ? "bg-blue-600 hover:bg-blue-700" : ""}
                    variant={isCurrent ? "default" : "outline"}
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    {isCurrent ? "Start This Step" : "Begin"}
                  </Button>
                )}

                {isCompleted && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                )}

                {isLocked && <p className="text-sm text-muted-foreground">Complete the previous step to unlock</p>}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Tips for Simulation Trading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>Risk-Free Learning</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                Experiment with different strategies without financial risk. Make mistakes and learn from them.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium flex items-center space-x-2">
                <Target className="h-4 w-4 text-green-600" />
                <span>Set Goals</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                Set specific learning objectives and track your progress to maximize the educational value.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span>Analyze Performance</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                Regularly review your trades and performance metrics to identify patterns and improve.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-orange-600" />
                <span>Keep Learning</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                Use simulation alongside educational resources to build comprehensive trading knowledge.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
