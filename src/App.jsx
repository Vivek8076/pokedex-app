import { useState } from 'react'
import  PokemonList from "./components/PokemonList"
import  PokemonDetail from "./components/PokemonDetail"
import "./App.css"


export default function App() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="app">
      {/* Animated background orbs */}
      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />
      <div className="bg-orb orb3" />

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo-pill">
            <span className="pokeball-icon">⬤</span>
            <span>Pokédex</span>
          </div>
          <p className="header-sub">Choose your fighter</p>
        </div>
        <div className="header-decoration">
          {['🔥','💧','🌿','⚡','🌙','🌟'].map((e,i) => (
            <span key={i} className="deco-emoji" style={{ animationDelay: `${i * 0.4}s` }}>{e}</span>
          ))}
        </div>
      </header>

      {/* Layout */}
      <main className="layout">
        <PokemonList selected={selected} onSelect={setSelected} />
        <PokemonDetail name={selected} />
      </main>
    </div>
  )
}