import { useEffect, useState } from 'react'

const TYPE_META = {
  fire:     { bg: 'linear-gradient(135deg,#FF6B35,#FF9F1C)', badge: '#FF6B35', text: '#fff' },
  water:    { bg: 'linear-gradient(135deg,#00B4D8,#0077B6)', badge: '#00B4D8', text: '#fff' },
  grass:    { bg: 'linear-gradient(135deg,#52B788,#2D6A4F)', badge: '#52B788', text: '#fff' },
  electric: { bg: 'linear-gradient(135deg,#FFD60A,#FFA200)', badge: '#FFD60A', text: '#000' },
  poison:   { bg: 'linear-gradient(135deg,#C77DFF,#7B2FBE)', badge: '#C77DFF', text: '#fff' },
  normal:   { bg: 'linear-gradient(135deg,#ADB5BD,#6C757D)', badge: '#ADB5BD', text: '#fff' },
  psychic:  { bg: 'linear-gradient(135deg,#FF4D6D,#C9184A)', badge: '#FF4D6D', text: '#fff' },
  flying:   { bg: 'linear-gradient(135deg,#90E0EF,#0096C7)', badge: '#90E0EF', text: '#000' },
  rock:     { bg: 'linear-gradient(135deg,#B5838D,#6D6875)', badge: '#B5838D', text: '#fff' },
  ground:   { bg: 'linear-gradient(135deg,#D4A373,#A98467)', badge: '#D4A373', text: '#fff' },
  ice:      { bg: 'linear-gradient(135deg,#CAF0F8,#90E0EF)', badge: '#CAF0F8', text: '#000' },
  bug:      { bg: 'linear-gradient(135deg,#80B918,#4D7C0F)', badge: '#80B918', text: '#fff' },
  ghost:    { bg: 'linear-gradient(135deg,#7B2FBE,#3C1361)', badge: '#7B2FBE', text: '#fff' },
  dragon:   { bg: 'linear-gradient(135deg,#4361EE,#3A0CA3)', badge: '#4361EE', text: '#fff' },
  dark:     { bg: 'linear-gradient(135deg,#3D405B,#1B1B2F)', badge: '#3D405B', text: '#fff' },
  steel:    { bg: 'linear-gradient(135deg,#8D99AE,#495057)', badge: '#8D99AE', text: '#fff' },
  fairy:    { bg: 'linear-gradient(135deg,#FF85A1,#FF4D8D)', badge: '#FF85A1', text: '#fff' },
  fighting: { bg: 'linear-gradient(135deg,#E63946,#9D0208)', badge: '#E63946', text: '#fff' },
}

const STAT_LABEL = {
  hp:              'HP',
  attack:          'Attack',
  defense:         'Defense',
  'special-attack':'Sp. Atk',
  'special-defense':'Sp. Def',
  speed:           'Speed',
}

const STAT_COLOR = {
  hp:              '#FF6B6B',
  attack:          '#FF9F43',
  defense:         '#48CAE4',
  'special-attack':'#9B59B6',
  'special-defense':'#52B788',
  speed:           '#FFD60A',
}

export default function PokemonDetail({ name }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!name) return
    setLoading(true)
    setData(null)
    setError(null)
    setVisible(false)

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(r => { if (!r.ok) throw new Error('Not found!'); return r.json() })
      .then(json => {
        setData(json)
        setLoading(false)
        setTimeout(() => setVisible(true), 50)
      })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [name])

  if (!name) return (
    <div className="detail-empty">
      <div className="empty-pokeball">
        <div className="ep-top" />
        <div className="ep-mid" />
        <div className="ep-bot" />
      </div>
      <p className="empty-text">Pick a Pokémon</p>
      <p className="empty-sub">20 legends await your call</p>
    </div>
  )

  if (loading) return (
    <div className="detail-loading">
      <div className="pokeball-loader large" />
      <p>Summoning {name}…</p>
    </div>
  )

  if (error) return (
    <div className="detail-error">⚠️ {error}</div>
  )

  if (!data) return null

  const primaryType = data.types[0].type.name
  const meta = TYPE_META[primaryType] || TYPE_META.normal
  const sprite =
    data.sprites.other?.['official-artwork']?.front_default ||
    data.sprites.front_default
  const types = data.types.map(t => t.type.name)
  const abilities = data.abilities.map(a => a.ability.name)
  const stats = data.stats.map(s => ({ name: s.stat.name, val: s.base_stat }))
  const totalStats = stats.reduce((acc, s) => acc + s.val, 0)

  return (
    <div className={`detail-card ${visible ? 'detail-card--in' : ''}`}>

      {/* Dynamic gradient hero banner */}
      <div className="hero-banner" style={{ background: meta.bg }}>
        <div className="hero-circles">
          <div className="hc hc1" />
          <div className="hc hc2" />
          <div className="hc hc3" />
        </div>

        {/* Pokémon ID + Name */}
        <div className="hero-text">
          <span className="hero-num">#{String(data.id).padStart(3,'0')}</span>
          <h1 className="hero-name">{data.name}</h1>
          <div className="hero-types">
            {types.map(t => (
              <span key={t} className="type-badge">{t}</span>
            ))}
          </div>
        </div>

        {/* Floating sprite */}
        {sprite && (
          <div className="hero-sprite-wrap">
            <img src={sprite} alt={data.name} className="hero-sprite" />
            <div className="sprite-shadow" />
          </div>
        )}
      </div>

      {/* Body content */}
      <div className="detail-body">

        {/* Quick stats row */}
        <div className="quick-stats">
          <div className="qs-item">
            <span className="qs-val">{data.height / 10}m</span>
            <span className="qs-label">Height</span>
          </div>
          <div className="qs-divider" />
          <div className="qs-item">
            <span className="qs-val">{data.weight / 10}kg</span>
            <span className="qs-label">Weight</span>
          </div>
          <div className="qs-divider" />
          <div className="qs-item">
            <span className="qs-val">{data.base_experience ?? '—'}</span>
            <span className="qs-label">Base XP</span>
          </div>
          <div className="qs-divider" />
          <div className="qs-item">
            <span className="qs-val">{totalStats}</span>
            <span className="qs-label">Total</span>
          </div>
        </div>

        {/* Abilities */}
        <section className="section">
          <h3 className="section-title">Abilities</h3>
          <div className="abilities-wrap">
            {abilities.map(a => (
              <span key={a} className="ability-chip">{a}</span>
            ))}
          </div>
        </section>

        {/* Base Stats */}
        <section className="section">
          <h3 className="section-title">Base Stats</h3>
          {stats.map(stat => (
            <div key={stat.name} className="stat-row">
              <span className="stat-label">{STAT_LABEL[stat.name] || stat.name}</span>
              <div className="stat-track">
                <div
                  className="stat-fill"
                  style={{
                    width: `${(stat.val / 255) * 100}%`,
                    background: STAT_COLOR[stat.name] || '#fff',
                    boxShadow: `0 0 8px ${STAT_COLOR[stat.name] || '#fff'}88`,
                  }}
                />
              </div>
              <span className="stat-val">{stat.val}</span>
            </div>
          ))}
        </section>

      </div>
    </div>
  )
}