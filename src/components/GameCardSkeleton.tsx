function GameCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-lg bg-zinc-800 shadow">
      <div className="h-48 animate-pulse bg-zinc-700" />

      <div className="p-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-700" />

        <div className="mt-3 h-4 w-1/4 animate-pulse rounded bg-zinc-700" />
      </div>
    </article>
  )
}

export default GameCardSkeleton