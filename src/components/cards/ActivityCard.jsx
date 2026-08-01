export default function ActivityCard({ title, meta, when }) {
  return (
    <article className="card card-pad">
      <strong>{title}</strong>
      <p>{meta}</p>
      <time>{when}</time>
    </article>
  )
}
