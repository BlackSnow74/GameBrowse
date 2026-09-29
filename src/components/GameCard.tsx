import type { Game } from "../types"
import { Link } from "react-router-dom"

interface GameCardProps {
  game: Game
}

function GameCard({ game }: GameCardProps) {
  return (
  <Link to={`/games/${game.id}`}>
    <article className="overflow-hidden rounded-lg bg-zinc-800 shadow transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src={game.background_image}
        alt={game.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold text-white">
          {game.name}
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          ⭐ {game.rating}
        </p>
      </div>
    </article>
  </Link>
)
}

export default GameCard