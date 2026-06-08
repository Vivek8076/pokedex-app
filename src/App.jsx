import { useState } from 'react'
import PokemonList from './components/PokemonList.jsx'
import PokemonDetail from './components/PokemonDetail.jsx'

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  return (
    <div className="app">
      <h1 className="title">🔴 Pokédex</h1>
      <div className="layout">
        <PokemonList onSelect={setSelectedPokemon} />
        <PokemonDetail name={selectedPokemon} />
      </div>
    </div>
  )
}

export default App