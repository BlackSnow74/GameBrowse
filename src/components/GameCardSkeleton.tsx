function GameCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-zinc-800">
      <div className="h-52 animate-pulse bg-zinc-200 dark:bg-zinc-700" />

      <div className="p-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />

        <div className="mt-3 h-4 w-1/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </article>
  )
}

export default GameCardSkeleton