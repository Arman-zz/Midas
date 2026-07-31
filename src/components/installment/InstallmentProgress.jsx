import ProgressBar from '../common/ProgressBar'
export default function InstallmentProgress({ value, label }) {
  return <div><div>{label || `${value}%`}</div><ProgressBar value={value} /></div>
}
