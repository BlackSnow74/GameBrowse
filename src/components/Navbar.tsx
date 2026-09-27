function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🎮</span>
        <h1 className="text-2xl font-bold">GameBrowse</h1>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search games..."
          className="w-64 rounded-full border px-4 py-2 outline-none"
        />

        <button
          type="button"
          className="rounded-full border px-4 py-2"
        >
          🌙
        </button>
      </div>
    </nav>
  )
}

export default Navbar