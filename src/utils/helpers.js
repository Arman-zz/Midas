export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}
export function classNames(...values) {
  return values.filter(Boolean).join(' ')
}
export function calculateProgress(current, target) {
  return target > 0 ? clamp((Number(current) / Number(target)) * 100, 0, 100) : 0
}
