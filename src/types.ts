export interface Game {
  id: number
  name: string
  background_image: string
  rating: number
}

export interface GameDetails {
  id: number
  name: string
  description_raw: string
  background_image: string
  rating: number
  released: string
  website: string
  genres: {
    id: number
    name: string
  }[]
  platforms: {
    platform: {
      id: number
      name: string
    }
  }[]
  screenshots: {
    id: number
    image: string
  }[]
}