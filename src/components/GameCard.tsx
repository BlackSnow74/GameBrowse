import { Link } from "react-router-dom"
import type { Game } from "../types"

interface GameCardProps {
  game: Game
}

function GameCard({ game }: GameCardProps) {
  return (
    <Link to={`/games/${game.id}`}>
      <article className="group overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-800">
        <div className="overflow-hidden">
          <img
            src={game.background_image}
            alt={game.name}
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            {game.name}
          </h2>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Game
            </span>

            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              ⭐ {game.rating}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default GameCard