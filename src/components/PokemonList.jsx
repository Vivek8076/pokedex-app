import { useEffect, useState } from 'react'

function PokemonList({ onSelect }) {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(res => {
        if (!res.ok) throw new Error('Pokemon list load nahi hui!')
        return res.json()
      })
      .then(data => {
        setPokemons(data.results)  // results = [{name, url}, ...]
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="loading">⏳ Loading...</div>
  if (error)   return <div className="error">❌ Error: {error}</div>

  return (
    <div className="pokemon-list">
      {pokemons.map(p => (
        <button
          key={p.name}
          className="pokemon-btn"
          onClick={() => onSelect(p.name)}
        >
          {p.name}
        </button>
      ))}
    </div>
  )
}

export default PokemonList