interface NavbarProps {
  search: string
  onSearchChange: (value: string) => void
}

function Navbar({ search, onSearchChange }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-700 px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🎮</span>

        <h1 className="text-2xl font-bold text-white">
          GameBrowse
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-64 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-white outline-none"
        />

        <button
          type="button"
          className="rounded-full border border-zinc-700 px-4 py-2"
        >
          🌙
        </button>
      </div>
    </nav>
  )
}

export default Navbar