import { useEffect, useState } from "react"
import {
  getGameDetails,
  getGameScreenshots,
} from "../services/api-client"
import type { GameDetails } from "../types"

function useGameDetails(id: string | undefined) {
  const [game, setGame] = useState<GameDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      return
    }

    const controller = new AbortController()

    setIsLoading(true)
    setError("")

    Promise.all([
        getGameDetails(Number(id), controller.signal),
        getGameScreenshots(Number(id), controller.signal),
    ])
      .then(([gameData, screenshotData]) => {
        setGame({
          ...gameData,
          screenshots: screenshotData.results ?? [],
        })

      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return
        }

        console.error("useGameDetails error:", error)
        setError("Failed to load game details.")
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      })

    return () => {
      controller.abort()
    }
  }, [id])

  return {
    game,
    isLoading,
    error,
  }
}

export default useGameDetails