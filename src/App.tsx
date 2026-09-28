import { useEffect, useState } from "react"
import { getGames } from "./services/api-client"
import type { Game } from "./types"
import GameCard from "./components/GameCard"
import Navbar from "./components/Navbar"

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    getGames().then((data) => {
      setGames(data.results)
    })
  }, [])

  return (
    <div className="min-h-screen bg-zinc-900">
    <Navbar />

    <main className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="mb-6 text-3xl font-bold text-white">
        Discover Games
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
    </div>
  )
}

export default App