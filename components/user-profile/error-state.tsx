"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"
import Button from "@/components/ui/button"

interface ErrorStateProps {
  message?: string
  retry?: () => void
}

export default function ErrorState({ message = "Unable to load data", retry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#2A2F38] rounded-lg text-center">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
      <p className="text-gray-400 mb-4">{message}</p>
      {retry && (
        <Button 
          href="#" 
          onClick={retry} 
          aria-label="Try loading the data again"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  )
}

