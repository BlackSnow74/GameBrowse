import ThemeToggle from "./ThemeToggle"

interface NavbarProps {
  search: string
  onSearchChange: (value: string) => void
}

function Navbar({ search, onSearchChange }: NavbarProps) {
  return (
    <nav className="flex flex-col gap-4 border-b border-zinc-200 bg-white px-6 py-4 transition-colors dark:border-zinc-700 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🎮</span>

        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          GameBrowse
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-full border border-zinc-300 bg-zinc-100 px-4 py-2 text-zinc-900 outline-none placeholder:text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:w-64"
        />

        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar