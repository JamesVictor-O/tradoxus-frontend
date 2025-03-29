
import { useState, useEffect } from 'react'
import axios from 'axios'

export function usePortfolio() {
  interface Portfolio {
   
    id: number
    name: string
    value: number
  }


  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)

  useEffect(() => {
    async function loadPortfolio() {
      try {
        setIsLoading(true)
        const response = await axios.get<Portfolio>('/api/portfolio')
        setPortfolio(response.data)
        setError(null)
      } catch (err) {
        console.error('Failed to load portfolio:', err)
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Failed to load portfolio data')
        }
        setPortfolio(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadPortfolio()
  }, [])

  return { portfolio, isLoading, error }
}