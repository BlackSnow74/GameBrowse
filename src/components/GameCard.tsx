import { Link } from "react-router-dom";
import type { Game } from "../types";

interface GameCardProps {
  game: Game;
}

function GameCard({ game }: GameCardProps) {
  return (
    <Link to={`/games/${game.id}`} className="block">
      <article className="group overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-800">
        <div className="relative overflow-hidden">
          <img
            src={game.background_image}
            alt={game.name}
            loading="lazy"
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            ⭐ {game.rating}
          </div>
        </div>

        <div className="p-4">
          <h2 className="truncate text-lg font-bold text-zinc-900 dark:text-white">
            {game.name}
          </h2>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Game</p>
        </div>
      </article>
    </Link>
  );
}

export default GameCard;
