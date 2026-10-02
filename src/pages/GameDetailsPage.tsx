import { Link, useParams } from "react-router-dom";
import useGameDetails from "../hooks/useGameDetails";
import { useEffect } from "react";

function GameDetailsPage() {
  const { id } = useParams();

  const { game, isLoading, error } = useGameDetails(id);

  useEffect(() => {
    if (game) {
      document.title = `${game.name} - GameBrowse`;
    }

    return () => {
      document.title = "GameBrowse";
    };
  }, [game]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 p-8 text-zinc-400">
        Loading game...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 p-8">
        <p className="text-red-400">{error}</p>

        <Link to="/" className="mt-6 inline-block text-white underline">
          ← Back to games
        </Link>
      </div>
    );
  }

  if (!game) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors dark:bg-zinc-900 dark:text-white">
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Link
          to="/"
          className="mb-6 inline-block text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          ← Back to games
        </Link>

        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={game.background_image}
            alt={game.name}
            className="h-72 w-full object-cover md:h-[28rem]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              {game.name}
            </h1>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-200">
              <span>⭐ {game.rating}</span>
              <span>📅 {game.released}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <section className="mt-10">
            <h2 className="text-2xl font-bold">About</h2>

            <p className="mt-4 max-w-4xl whitespace-pre-line leading-7 text-zinc-600 dark:text-zinc-300">
              {game.description_raw}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold">Platforms</h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {game.platforms.map((item) => (
                <span
                  key={item.platform.id}
                  className="rounded-lg bg-zinc-200 px-3 py-2 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  {item.platform.name}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold">Genres</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {game.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-zinc-200 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </section>

          {game.screenshots?.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-bold">Screenshots</h2>

              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {game.screenshots.map((screenshot) => (
                  <div
                    key={screenshot.id}
                    className="group overflow-hidden rounded-xl"
                  >
                    <img
                      src={screenshot.image}
                      alt={`${game.name} screenshot`}
                      loading="lazy"
                      className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
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
  );
}

export default GameDetailsPage;
