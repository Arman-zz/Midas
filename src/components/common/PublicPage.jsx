export default function PublicPage({ eyebrow, title, intro, children }) {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      <section className="pub-section">{children}</section>
    </>
  )
}
