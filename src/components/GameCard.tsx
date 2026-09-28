import type { Game } from "../types"

interface GameCardProps {
  game: Game
}

function GameCard({ game }: GameCardProps) {
  return (
    <article className="overflow-hidden rounded-lg bg-zinc-800 shadow">
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
  )
}

export default GameCard