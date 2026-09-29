import { useEffect, useState } from "react"
import { getGames } from "./services/api-client"
import type { Game } from "./types"
import Navbar from "./components/Navbar"
import GameCard from "./components/GameCard"
import GameCardSkeleton from "./components/GameCardSkeleton"

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [genre, setGenre] = useState("")
  const [platform, setPlatform] = useState("")
  const [ordering, setOrdering] = useState("")

  useEffect(() => {
      document.title = search
        ? `${search} - GameBrowse`
        : "GameBrowse"
      }, [search])
      
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(true)
      setError("")

      getGames({
        search,
        genre,
        platform,
        ordering,
      })
        .then((data) => {
          setGames(data.results)
        })
        .catch(() => {
          setError("Failed to load games.")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [search, genre, platform, ordering])

  return (
    <div className="min-h-screen bg-zinc-900">
      <Navbar
        search={search}
        onSearchChange={setSearch}
      />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-6 text-3xl font-bold text-white">
          {search
            ? `Search results for "${search}"`
            : "Discover Games"}
        </h1>

        <div className="mb-8 flex flex-wrap gap-4">
          <select
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white outline-none"
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
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white outline-none"
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
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white outline-none"
            onChange={(event) => setOrdering(event.target.value)}
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
              className="rounded-lg border border-zinc-700 px-4 py-2 text-zinc-300 hover:bg-zinc-800"
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
          <p className="text-zinc-400">
            No games found.
          </p>
        )}

        {!isLoading && !error && games.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App