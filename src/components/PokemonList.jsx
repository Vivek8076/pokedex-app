import { useEffect, useState } from 'react'

const TYPE_COLORS = {
  fire:     { bg: '#FF6B35', glow: 'rgba(255,107,53,0.6)',  icon: '🔥' },
  water:    { bg: '#00B4D8', glow: 'rgba(0,180,216,0.6)',   icon: '💧' },
  grass:    { bg: '#52B788', glow: 'rgba(82,183,136,0.6)',  icon: '🌿' },
  electric: { bg: '#FFD60A', glow: 'rgba(255,214,10,0.6)',  icon: '⚡' },
  poison:   { bg: '#C77DFF', glow: 'rgba(199,125,255,0.6)', icon: '☠️' },
  normal:   { bg: '#ADB5BD', glow: 'rgba(173,181,189,0.6)', icon: '⭐' },
  psychic:  { bg: '#FF4D6D', glow: 'rgba(255,77,109,0.6)',  icon: '🔮' },
  flying:   { bg: '#90E0EF', glow: 'rgba(144,224,239,0.6)', icon: '🌬️' },
  rock:     { bg: '#B5838D', glow: 'rgba(181,131,141,0.6)', icon: '🪨' },
  ground:   { bg: '#D4A373', glow: 'rgba(212,163,115,0.6)', icon: '🌍' },
  ice:      { bg: '#CAF0F8', glow: 'rgba(202,240,248,0.6)', icon: '❄️' },
  bug:      { bg: '#80B918', glow: 'rgba(128,185,24,0.6)',  icon: '🐛' },
  ghost:    { bg: '#7B2FBE', glow: 'rgba(123,47,190,0.6)',  icon: '👻' },
  dragon:   { bg: '#4361EE', glow: 'rgba(67,97,238,0.6)',   icon: '🐉' },
  dark:     { bg: '#3D405B', glow: 'rgba(61,64,91,0.6)',    icon: '🌑' },
  steel:    { bg: '#8D99AE', glow: 'rgba(141,153,174,0.6)', icon: '⚙️' },
  fairy:    { bg: '#FF85A1', glow: 'rgba(255,133,161,0.6)', icon: '✨' },
  fighting: { bg: '#E63946', glow: 'rgba(230,57,70,0.6)',   icon: '👊' },
}

function PokemonCard({ pokemon, isSelected, onSelect, index }) {
  const [sprite, setSprite] = useState(null)
  const [type, setType] = useState(null)
  const [id, setId] = useState(null)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then(r => r.json())
      .then(d => {
        setSprite(d.sprites.front_default)
        setType(d.types[0].type.name)
        setId(d.id)
      })
  }, [pokemon.name])

  const color = TYPE_COLORS[type] || TYPE_COLORS.normal
  const cardStyle = {
    animationDelay: `${index * 0.06}s`,
    '--glow': color.glow,
    '--accent': color.bg,
  }

  return (
    <button
      className={`poke-card ${isSelected ? 'poke-card--active' : ''}`}
      style={cardStyle}
      onClick={() => onSelect(pokemon.name)}
    >
      {/* ID badge */}
      <span className="card-id">#{id ? String(id).padStart(3,'0') : '???'}</span>

      {/* Type icon */}
      <span className="card-type-icon">{color.icon}</span>

      {/* Sprite */}
      <div className="card-sprite-wrap">
        {sprite
          ? <img src={sprite} alt={pokemon.name} className="card-sprite" />
          : <div className="card-sprite-placeholder" />
        }
      </div>

      {/* Name */}
      <span className="card-name">{pokemon.name}</span>

      {/* Active ring */}
      {isSelected && <span className="active-ring" />}
    </button>
  )
}

export default function PokemonList({ onSelect, selected }) {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(r => { if (!r.ok) throw new Error('List load failed'); return r.json() })
      .then(d => { setPokemons(d.results); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [])

  if (loading) return (
    <div className="panel-loading">
      <div className="pokeball-loader" />
      <p>Loading Pokédex…</p>
    </div>
  )

  if (error) return (
    <div className="panel-error">⚠️ {error}</div>
  )

  return (
    <aside className="list-panel">
      <div className="list-header">
        <span>20 Pokémon</span>
        <span className="list-header-hint">tap to reveal</span>
      </div>
      <div className="pokemon-grid">
        {pokemons.map((p, i) => (
          <PokemonCard
            key={p.name}
            pokemon={p}
            index={i}
            isSelected={selected === p.name}
            onSelect={onSelect}
          />
        ))}
      </div>
    </aside>
  )
}