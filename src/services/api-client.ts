const API_KEY = import.meta.env.VITE_RAWG_API_KEY

const BASE_URL = "https://api.rawg.io/api"

export async function getGames() {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch games")
  }

  return response.json()
}