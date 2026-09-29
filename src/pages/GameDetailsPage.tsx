import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getGameDetails } from "../services/api-client"

interface GameDetails {
  id: number
  name: string
  description_raw: string
  background_image: string
  rating: number
  released: string
  website: string
  genres: {
    id: number
    name: string
  }[]
  platforms: {
    platform: {
      id: number
      name: string
    }
  }[]
}

function GameDetailsPage() {
  const { id } = useParams()
  const [game, setGame] = useState<GameDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) return

    getGameDetails(Number(id))
      .then((data) => {
        setGame(data)
      })
      .catch(() => {
        setError("Failed to load game details.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 p-8 text-white">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 p-8 text-red-400">
        {error}
      </div>
    )
  }

  if (!game) {
    return null
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <main className="mx-auto max-w-5xl px-6 py-10">
        <img
          src={game.background_image}
          alt={game.name}
          className="mb-8 h-96 w-full rounded-xl object-cover"
        />

        <h1 className="text-4xl font-bold">
          {game.name}
        </h1>

        <div className="mt-4 flex flex-wrap gap-4 text-zinc-400">
          <span>⭐ {game.rating}</span>
          <span>📅 {game.released}</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {game.genres.map((genre) => (
            <span
              key={genre.id}
              className="rounded-full bg-zinc-800 px-3 py-1 text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-bold">
          About
        </h2>

        <p className="mt-4 leading-7 text-zinc-300">
          {game.description_raw}
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Platforms
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {game.platforms.map((item) => (
            <span
              key={item.platform.id}
              className="rounded-lg bg-zinc-800 px-3 py-2 text-sm"
            >
              {item.platform.name}
            </span>
          ))}
        </div>

        {game.website && (
          <a
            href={game.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-lg bg-white px-5 py-3 font-medium text-black"
          >
            Official Website
          </a>
        )}
      </main>
    </div>
  )
}

export default GameDetailsPage