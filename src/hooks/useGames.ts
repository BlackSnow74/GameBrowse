import { useEffect, useState } from "react"
import { getGames } from "../services/api-client"
import type { Game } from "../types"

interface UseGamesParams {
  search: string
  genre: string
  platform: string
  ordering: string
  page: number
}

function useGames({
  search,
  genre,
  platform,
  ordering,
  page,
}: UseGamesParams) {
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [hasNextPage, setHasNextPage] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const timeoutId = setTimeout(() => {
      setIsLoading(true)
      setError("")

      getGames({
        search,
        genre,
        platform,
        ordering,
        page,
        signal: controller.signal,
      })
        .then((data) => {
          setGames(data.results)
          setHasNextPage(Boolean(data.next))
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            return
          }

          console.error("useGames error:", error)
          setError("Failed to load games.")
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setIsLoading(false)
          }
        })
    }, 500)

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [search, genre, platform, ordering, page])

  return {
    games,
    isLoading,
    error,
    hasNextPage,
  }
}

export default useGames