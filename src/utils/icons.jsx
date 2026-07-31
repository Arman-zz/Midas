export function Icon({ name, className = '' }) {
  const symbols = { diamond: '◇', search: '⌕', store: '▢', star: '★', check: '✓', alert: '!' }
  return <span className={className} aria-hidden="true">{symbols[name] || '•'}</span>
}
