import { useEffect, useState } from "react";
import useGames from "./hooks/useGames";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import GameCard from "./components/GameCard";
import GameCardSkeleton from "./components/GameCardSkeleton";
import GameDetailsPage from "./pages/GameDetailsPage";

function HomePage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [ordering, setOrdering] = useState("");
  const [page, setPage] = useState(1);
  const { games, isLoading, error, hasNextPage } = useGames({
    search,
    genre,
    platform,
    ordering,
    page,
  });

  useEffect(() => {
    if (page !== 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, genre, platform, ordering]);

  function handleNextPage() {
    if (hasNextPage && !isLoading) {
      setPage((currentPage) => currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handlePreviousPage() {
    if (page > 1 && !isLoading) {
      setPage((currentPage) => currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="min-h-screen bg-zinc-100 transition-colors dark:bg-zinc-900">
      <Navbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          // setPage(1);
        }}
      />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">
          {search ? `Search results for "${search}"` : "Discover Games"}
        </h1>

        <div className="mb-8 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-800 sm:flex-row sm:flex-wrap sm:items-center">
          <select
            value={genre}
            onChange={(event) => {
              setGenre(event.target.value);
              // setPage(1);
            }}
            className="rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-500"
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
            onChange={(event) => {
              setPlatform(event.target.value);
              // setPage(1);
            }}
            className="rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-500"
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
            onChange={(event) => {
              setOrdering(event.target.value);
              // setPage(1);
            }}
            className="rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-500"
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
                setGenre("");
                setPlatform("");
                setOrdering("");
              }}
              className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Clear filters
            </button>
          )}
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <GameCardSkeleton key={index} />
            ))}
          </div>
        )}

        {error && (
          <div className="flex min-h-60 flex-col items-center justify-center rounded-xl border border-red-300 bg-red-50 text-center dark:border-red-900 dark:bg-red-950/20">
            <span className="text-4xl">⚠️</span>

            <h2 className="mt-4 text-xl font-semibold text-red-700 dark:text-red-400">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-red-600 dark:text-red-300">
              {error}
            </p>
          </div>
        )}

        {!isLoading && !error && games.length === 0 && (
          <div className="flex min-h-60 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 text-center dark:border-zinc-700">
            <span className="text-5xl">🎮</span>

            <h2 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">
              No games found
            </h2>

            <p className="mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
              Try a different search term or adjust your filters.
            </p>
          </div>
        )}

        {!isLoading && !error && games.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games/:id" element={<GameDetailsPage />} />
    </Routes>
  );
}

export default App;
