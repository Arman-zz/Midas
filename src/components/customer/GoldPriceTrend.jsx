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
  const [selectedIndex, setSelectedIndex] = useState(null)
  const gradientId = useId().replaceAll(':', '')

  useEffect(() => {
    const controller = new AbortController()
    getBangladeshGoldTrend({ signal: controller.signal })
      .then((result) => {
        setData(result)
        setSelectedIndex(result.points.length - 1)
      })
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
    const firstValue = data.points[0].value
    const changeAmount = data.currentValue - firstValue
    const change = (changeAmount / firstValue) * 100
    return { coordinates, line, area: `0,100 ${line} 100,100`, min, max, change, changeAmount }
  }, [data])

  const selectedPoint = chart?.coordinates[selectedIndex ?? chart.coordinates.length - 1]

  return (
    <article className="card gold-trend-card" aria-busy={!data && !error}>
      <div className="card-head gold-trend-head">
        <div>
          <div className="card-title">Today’s Estimated 22K Gold Value</div>
          <div className="card-sub">Bangladesh taka per gram · last 30 days</div>
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
                <span>Today, 1 gram of 22K gold is worth approximately</span>
                <strong>
                  {numberFormatter.format(data.currentValue)} <small>/ gram</small>
                </strong>
              </div>
              <span className={chart.change >= 0 ? 'trend-up' : 'trend-down'}>
                {chart.change >= 0 ? '↑' : '↓'} {Math.abs(chart.change).toFixed(1)}% in 30 days
              </span>
            </div>
            <div className="gold-value-examples" aria-label="Example gold values">
              {[1, 5, 10].map((grams) => (
                <div key={grams}>
                  <span>{grams} g gold</span>
                  <strong>{numberFormatter.format(data.currentValue * grams)}</strong>
                </div>
              ))}
            </div>
            <div className={`gold-trend-explanation ${chart.change >= 0 ? 'up' : 'down'}`}>
              <b>
                {chart.change >= 0 ? 'Gold value increased' : 'Gold value decreased'} over the last
                30 days.
              </b>
              <span>
                It changed by {numberFormatter.format(Math.abs(chart.changeAmount))} per gram. An
                upward line means gold became more valuable; a downward line means it became less
                valuable.
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
                {selectedPoint && (
                  <>
                    <line
                      className="gold-chart-marker-line"
                      x1={selectedPoint.x}
                      x2={selectedPoint.x}
                      y1="8"
                      y2="100"
                      vectorEffect="non-scaling-stroke"
                    />
                    <circle
                      className="gold-chart-marker"
                      cx={selectedPoint.x}
                      cy={selectedPoint.y}
                      r="2.2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </>
                )}
              </svg>
            </div>
            <div className="gold-chart-dates">
              <span>{shortDate(data.points[0].date)}</span>
              <span>{shortDate(data.points.at(-1).date)}</span>
            </div>
            <div className="gold-chart-reader">
              <div>
                <span>Selected date</span>
                <strong>{shortDate(selectedPoint.date)}</strong>
              </div>
              <input
                type="range"
                min="0"
                max={data.points.length - 1}
                value={selectedIndex ?? data.points.length - 1}
                onChange={(event) => setSelectedIndex(Number(event.target.value))}
                aria-label="Explore daily gold prices"
              />
              <div>
                <span>Value on that date</span>
                <strong>{numberFormatter.format(selectedPoint.value)}/g</strong>
              </div>
            </div>
            <div className="gold-installment-help">
              <span aria-hidden="true">◇</span>
              <p>
                <b>How this affects your installment</b>Your shop records your payment using that
                day’s gold rate. For example, a BDT 10,000 payment at{' '}
                {numberFormatter.format(data.currentValue)}/g adds about{' '}
                {(10000 / data.currentValue).toFixed(3)} g to “Gold you own.”
              </p>
            </div>
            <p className="gold-chart-note">
              Updated {data.updatedAt.toLocaleString('en-BD')} · {data.source}.{' '}
              {data.isMarketProxy ? 'PAX Gold-backed market proxy. ' : ''}International spot
              estimate only. Your shop’s selling price may be higher because VAT, making charges,
              stones and shop pricing are not included.
            </p>
          </>
        )}
      </div>
    </article>
  )
}
