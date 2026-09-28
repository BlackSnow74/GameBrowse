import { useEffect, useState } from "react"
import { getGames } from "./services/api-client"

function App() {
  const [games, setGames] = useState<any[]>([])

  useEffect(() => {
    getGames().then((data) => {
      setGames(data.results)
    })
  }, [])

  return (
    <>
      <h1>GameBrowse</h1>

      <p>Games found: {games.length}</p>
    </>
  )
}

export default App