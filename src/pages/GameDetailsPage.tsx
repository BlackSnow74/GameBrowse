import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  getGameDetails,
  getGameScreenshots,
} from "../services/api-client"
import type { GameDetails } from "../types"

function GameDetailsPage() {
  const { id } = useParams()

  const [game, setGame] = useState<GameDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) return

    Promise.all([
      getGameDetails(Number(id)),
      getGameScreenshots(Number(id)),
    ])
      .then(([gameData, screenshotData]) => {
        setGame({
          ...gameData,
          screenshots: screenshotData.results ?? [],
        })

        document.title = `${gameData.name} - GameBrowse`
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
      <div className="min-h-screen bg-zinc-900 p-8 text-zinc-400">
        Loading game...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 p-8">
        <p className="text-red-400">{error}</p>

        <Link
          to="/"
          className="mt-6 inline-block text-white underline"
        >
          ← Back to games
        </Link>
      </div>
    )
  }

  if (!game) {
    return null
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Link
          to="/"
          className="mb-6 inline-block text-zinc-400 transition hover:text-white"
        >
          ← Back to games
        </Link>

        <img
          src={game.background_image}
          alt={game.name}
          className="h-72 w-full rounded-xl object-cover md:h-96"
        />

        <div className="mt-8">
          <h1 className="text-4xl font-bold md:text-5xl">
            {game.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-5 text-zinc-400">
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

          <section className="mt-10">
            <h2 className="text-2xl font-bold">
              About
            </h2>

            <p className="mt-4 max-w-4xl whitespace-pre-line leading-7 text-zinc-300">
              {game.description_raw}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold">
              Platforms
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {game.platforms.map((item) => (
                <span
                  key={item.platform.id}
                  className="rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-300"
                >
                  {item.platform.name}
                </span>
              ))}
            </div>
          </section>

          {game.screenshots?.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-bold">
                Screenshots
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {game.screenshots.map((screenshot) => (
                  <img
                    key={screenshot.id}
                    src={screenshot.image}
                    alt={`${game.name} screenshot`}
                    className="rounded-lg object-cover"
                  />
                ))}
              </div>
            </section>
          )}

          {game.website && (
            <a
              href={game.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
            >
              Official Website ↗
            </a>
          )}
        </div>
      </main>
    </div>
  )
}

export default GameDetailsPage