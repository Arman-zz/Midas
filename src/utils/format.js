export function formatCurrency(value, currency = 'BDT') {
  return `${currency} ${Number(value || 0).toLocaleString('en-US')}`
}
export function formatPercent(value) {
  return `${Number(value || 0).toFixed(1)}%`
}
export function formatWeight(value) {
  return `${Number(value || 0)
    .toFixed(3)
    .replace(/\.?0+$/, '')} g`
}
