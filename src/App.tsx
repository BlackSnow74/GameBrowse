import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { getGames } from "./services/api-client"
import type { Game } from "./types"
import Navbar from "./components/Navbar"
import GameCard from "./components/GameCard"
import GameCardSkeleton from "./components/GameCardSkeleton"
import GameDetailsPage from "./pages/GameDetailsPage"

function HomePage() {
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [genre, setGenre] = useState("")
  const [platform, setPlatform] = useState("")
  const [ordering, setOrdering] = useState("")
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)

  useEffect(() => {
    document.title = search
      ? `${search} - GameBrowse`
      : "GameBrowse"
  }, [search])

  useEffect(() => {
    setPage(1)
  }, [search, genre, platform, ordering])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(true)
      setError("")

      getGames({
        search,
        genre,
        platform,
        ordering,
        page,
      })
        .then((data) => {
          setGames(data.results)
          setHasNextPage(Boolean(data.next))
        })
        .catch(() => {
          setError("Failed to load games.")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [search, genre, platform, ordering, page])

  function handleNextPage() {
    if (hasNextPage && !isLoading) {
      setPage((currentPage) => currentPage + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  function handlePreviousPage() {
    if (page > 1 && !isLoading) {
      setPage((currentPage) => currentPage - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-zinc-100 transition-colors dark:bg-zinc-900">
      <Navbar
        search={search}
        onSearchChange={setSearch}
      />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">
          {search
            ? `Search results for "${search}"`
            : "Discover Games"}
        </h1>

        <div className="mb-8 flex flex-wrap gap-4">
          <select
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          >
            <option value="">All genres</option>
            <option value="4">Action</option>
            <option value="3">Adventure</option>
            <option value="5">RPG</option>
            <option value="10">Strategy</option>
            <option value="2">Shooter</option>
            <option value="7">Puzzle</option>
            <option value="1">Racing</option>
            <option value="11">Arcade</option>
            <option value="15">Sports</option>
          </select>

          <select
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          >
            <option value="">All platforms</option>
            <option value="4">PC</option>
            <option value="187">PlayStation 5</option>
            <option value="18">PlayStation 4</option>
            <option value="1">Xbox One</option>
            <option value="186">Xbox Series S/X</option>
            <option value="7">Nintendo Switch</option>
          </select>

          <select
            value={ordering}
            onChange={(event) => setOrdering(event.target.value)}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          >
            <option value="">Relevance</option>
            <option value="-rating">Rating: High to Low</option>
            <option value="rating">Rating: Low to High</option>
            <option value="-released">Release Date: Newest</option>
            <option value="released">Release Date: Oldest</option>
            <option value="name">Name: A → Z</option>
            <option value="-name">Name: Z → A</option>
          </select>

          {(genre || platform || ordering) && (
            <button
              type="button"
              onClick={() => {
                setGenre("")
                setPlatform("")
                setOrdering("")
              }}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-600 transition hover:bg-zinc-200 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Clear filters
            </button>
          )}
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <GameCardSkeleton key={index} />
            ))}
          </div>
        )}

        {error && (
          <p className="text-red-400">
            {error}
          </p>
        )}

        {!isLoading && !error && games.length === 0 && (
          <p className="text-zinc-500 dark:text-zinc-400">
            No games found.
          </p>
        )}

        {!isLoading && !error && games.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={page === 1 || isLoading}
                className="rounded-lg border border-zinc-300 px-5 py-2 text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                ← Previous
              </button>

              <span className="text-zinc-500 dark:text-zinc-400">
                Page {page}
              </span>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={!hasNextPage || isLoading}
                className="rounded-lg border border-zinc-300 px-5 py-2 text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Next →
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games/:id" element={<GameDetailsPage />} />
    </Routes>
  )
}

export default App