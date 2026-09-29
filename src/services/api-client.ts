const API_KEY = import.meta.env.VITE_RAWG_API_KEY

const BASE_URL = "https://api.rawg.io/api"

interface GetGamesParams {
  search?: string
  genre?: string
  platform?: string
  ordering?: string
}

export async function getGames({
  search = "",
  genre = "",
  platform = "",
  ordering = "",
}: GetGamesParams = {}) {
  const params = new URLSearchParams({
    key: API_KEY,
    page_size: "20",
  })

  if (search.trim()) {
    params.set("search", search.trim())
  }

  if (genre) {
    params.set("genres", genre)
  }

  if (platform) {
    params.set("platforms", platform)
  }

  if (ordering) {
    params.set("ordering", ordering)
  }

  const response = await fetch(
    `${BASE_URL}/games?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch games")
  }

  return response.json()
}