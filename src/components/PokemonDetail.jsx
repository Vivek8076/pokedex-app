import { useEffect, useState } from 'react'

function PokemonDetail({ name }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!name) return  // koi select nahi kiya abhi

    setLoading(true)
    setData(null)
    setError(null)

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => {
        if (!res.ok) throw new Error('Pokemon details nahi mili!')
        return res.json()
      })
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [name])

  if (!name)    return <div className="detail-empty">👈 Koi Pokemon select karo</div>
  if (loading)  return <div className="loading">⏳ Loading {name}...</div>
  if (error)    return <div className="error">❌ {error}</div>
  if (!data)    return null

  // Response deeply nested hai — dhyan se nikalo
  const sprite   = data.sprites.front_default
  const types    = data.types.map(t => t.type.name)        // [{slot, type:{name}}]
  const abilities = data.abilities.map(a => a.ability.name) // [{ability:{name}, ...}]
  const stats    = data.stats.map(s => ({                   // [{base_stat, stat:{name}}]
    name: s.stat.name,
    value: s.base_stat
  }))

  return (
    <div className="detail-card">
      <h2>{data.name} <span className="poke-id">#{data.id}</span></h2>

      {sprite && <img src={sprite} alt={data.name} className="sprite" />}

      <div className="section">
        <strong>Types:</strong>
        {types.map(t => (
          <span key={t} className={`type type-${t}`}>{t}</span>
        ))}
      </div>

      <div className="section">
        <strong>Abilities:</strong>
        {abilities.map(a => <span key={a} className="ability">{a}</span>)}
      </div>

      <div className="section">
        <strong>Base Stats:</strong>
        {stats.map(s => (
          <div key={s.name} className="stat-row">
            <span className="stat-name">{s.name}</span>
            <div className="stat-bar">
              <div className="stat-fill" style={{ width: `${(s.value / 255) * 100}%` }} />
            </div>
            <span className="stat-val">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PokemonDetail