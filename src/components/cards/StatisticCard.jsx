export default function StatisticCard({ label, value, detail }) {
  return (
    <article className="card card-pad">
      <p>{label}</p>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </article>
  )
}
