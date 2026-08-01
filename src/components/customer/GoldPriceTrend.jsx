import { useEffect, useId, useMemo, useState } from 'react'
import { getBangladeshGoldTrend } from '../../services/goldPriceService'

const numberFormatter = new Intl.NumberFormat('en-BD', {
  style: 'currency',
  currency: 'BDT',
  maximumFractionDigits: 0,
})

function shortDate(date) {
  return new Intl.DateTimeFormat('en-BD', { day: 'numeric', month: 'short' }).format(
    new Date(`${date}T00:00:00Z`),
  )
}

export default function GoldPriceTrend() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const gradientId = useId().replaceAll(':', '')

  useEffect(() => {
    const controller = new AbortController()
    getBangladeshGoldTrend({ signal: controller.signal })
      .then(setData)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
    return () => controller.abort()
  }, [])

  const chart = useMemo(() => {
    if (!data) return null
    const values = data.points.map((point) => point.value)
    const min = Math.min(...values)
    const max = Math.max(...values)
    const spread = max - min || 1
    const coordinates = data.points.map((point, index) => ({
      ...point,
      x: (index / (data.points.length - 1)) * 100,
      y: 92 - ((point.value - min) / spread) * 78,
    }))
    const line = coordinates.map(({ x, y }) => `${x},${y}`).join(' ')
    const change = ((data.currentValue - data.points[0].value) / data.points[0].value) * 100
    return { coordinates, line, area: `0,100 ${line} 100,100`, min, max, change }
  }, [data])

  return (
    <article className="card gold-trend-card" aria-busy={!data && !error}>
      <div className="card-head gold-trend-head">
        <div>
          <div className="card-title">Gold Price in Bangladesh</div>
          <div className="card-sub">30-day international spot trend · 22K per gram</div>
        </div>
        <span className="badge badge-gold">Live market</span>
      </div>
      <div className="card-pad">
        {!data && !error && <div className="gold-chart-state">Loading live gold prices…</div>}
        {error && (
          <div className="gold-chart-state gold-chart-error">
            <b>Price trend unavailable</b>
            <span>{error}. Please try again shortly.</span>
          </div>
        )}
        {data && chart && (
          <>
            <div className="gold-price-summary">
              <div>
                <span>Estimated spot value</span>
                <strong>{numberFormatter.format(data.currentValue)}</strong>
              </div>
              <span className={chart.change >= 0 ? 'trend-up' : 'trend-down'}>
                {chart.change >= 0 ? '↑' : '↓'} {Math.abs(chart.change).toFixed(1)}%
              </span>
            </div>
            <div className="gold-chart-wrap">
              <div className="gold-chart-scale">
                <span>{numberFormatter.format(chart.max)}</span>
                <span>{numberFormatter.format(chart.min)}</span>
              </div>
              <svg
                className="gold-chart"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                role="img"
                aria-label="Gold price trend over the last 30 days"
              >
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b9903f" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#b9903f" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points={chart.area} fill={`url(#${gradientId})`} />
                <polyline points={chart.line} fill="none" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <div className="gold-chart-dates">
              <span>{shortDate(data.points[0].date)}</span>
              <span>{shortDate(data.points.at(-1).date)}</span>
            </div>
            <p className="gold-chart-note">
              Updated {data.updatedAt.toLocaleString('en-BD')} · {data.source}.{' '}
              {data.isMarketProxy ? 'PAX Gold-backed market proxy. ' : ''}International spot
              estimate; Bangladesh jeweller rates, VAT and making charges may differ.
            </p>
          </>
        )}
      </div>
    </article>
  )
}
