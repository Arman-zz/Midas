export default function ProgressBar({ value = 0 }) {
  return (
    <div className="progress">
      <div className="progress-fill" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  )
}
