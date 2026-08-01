const API_ROOT = 'https://api.metalpriceapi.com/v1'
const COINGECKO_TREND_URL =
  'https://api.coingecko.com/api/v3/coins/pax-gold/market_chart?vs_currency=bdt&days=30&interval=daily'
const TROY_OUNCE_IN_GRAMS = 31.1034768
const GOLD_PURITY = 22 / 24

function formatDate(date) {
  return date.toISOString().slice(0, 10)
}

function rateToPricePerGram(rate) {
  if (!Number.isFinite(rate) || rate <= 0) return null
  return (1 / rate / TROY_OUNCE_IN_GRAMS) * GOLD_PURITY
}

function ouncePriceToPricePerGram(price) {
  if (!Number.isFinite(price) || price <= 0) return null
  return (price / TROY_OUNCE_IN_GRAMS) * GOLD_PURITY
}

async function getCoinGeckoTrend(signal) {
  const response = await fetch(COINGECKO_TREND_URL, {
    signal,
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) throw new Error('Fallback gold market provider is unavailable')

  const payload = await response.json()
  const points = (payload.prices || [])
    .map(([timestamp, value]) => ({
      date: new Date(timestamp).toISOString().slice(0, 10),
      value: ouncePriceToPricePerGram(value),
    }))
    .filter((point) => point.value !== null)

  if (points.length < 2) throw new Error('The provider returned insufficient gold price data')
  return {
    currentValue: points.at(-1).value,
    points,
    updatedAt: new Date(),
    source: 'CoinGecko · PAX Gold',
    isMarketProxy: true,
  }
}

async function getMetalpriceTrend({ days, signal, apiKey }) {
  const end = new Date()
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - days)

  const query = new URLSearchParams({
    api_key: apiKey,
    base: 'BDT',
    currencies: 'XAU',
  })
  const historyQuery = new URLSearchParams({
    ...Object.fromEntries(query),
    start_date: formatDate(start),
    end_date: formatDate(end),
  })

  const [latestResponse, historyResponse] = await Promise.all([
    fetch(`${API_ROOT}/latest?${query}`, { signal }),
    fetch(`${API_ROOT}/timeframe?${historyQuery}`, { signal }),
  ])

  if (!latestResponse.ok || !historyResponse.ok) {
    throw new Error('Gold price provider is currently unavailable')
  }

  const [latest, history] = await Promise.all([latestResponse.json(), historyResponse.json()])
  if (!latest.success || !history.success) {
    throw new Error(latest.error?.message || history.error?.message || 'Could not load gold prices')
  }

  const points = Object.entries(history.rates || {})
    .map(([date, rates]) => ({ date, value: rateToPricePerGram(rates.XAU) }))
    .filter((point) => point.value !== null)
    .sort((a, b) => a.date.localeCompare(b.date))

  const currentValue = rateToPricePerGram(latest.rates?.XAU)
  if (!currentValue || points.length < 2) {
    throw new Error('The provider returned insufficient gold price data')
  }

  return {
    currentValue,
    points,
    updatedAt: latest.timestamp ? new Date(latest.timestamp * 1000) : new Date(),
    source: 'MetalpriceAPI',
    isMarketProxy: false,
  }
}

export async function getBangladeshGoldTrend({ days = 30, signal } = {}) {
  const apiKey = import.meta.env.VITE_METALPRICE_API_KEY
  if (apiKey) {
    try {
      return await getMetalpriceTrend({ days, signal, apiKey })
    } catch (error) {
      if (error.name === 'AbortError') throw error
    }
  }
  return getCoinGeckoTrend(signal)
}
