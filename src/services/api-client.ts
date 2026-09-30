const API_KEY = import.meta.env.VITE_RAWG_API_KEY

const BASE_URL = "https://api.rawg.io/api"

interface GetGamesParams {
  search?: string
  genre?: string
  platform?: string
  ordering?: string
  page?: number
}

export async function getGames({
  search = "",
  genre = "",
  platform = "",
  ordering = "",
  page = 1,
}: GetGamesParams = {}) {
  const params = new URLSearchParams({
    key: API_KEY,
    page_size: "20",
    page: String(page),
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

export async function getGameDetails(id: number) {
  const response = await fetch(
    `${BASE_URL}/games/${id}?key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch game details")
  }

  return response.json()
}

export async function getGameScreenshots(id: number) {
  const response = await fetch(
    `${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch screenshots")
  }

  return response.json()
}