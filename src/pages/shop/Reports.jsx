import { formatBDT } from '../../data/appData'
export default function Reports() {
  return (
    <>
      <div className="section-h">
        <div>
          <h2>Shop Reports</h2>
          <p className="lead">A summary of marketplace and agreement activity.</p>
        </div>
        <button className="btn btn-gold">Export report</button>
      </div>
      <div className="grid g-3">
        <article className="card card-pad">
          <span className="stat-label">Marketplace products</span>
          <h2>4</h2>
        </article>
        <article className="card card-pad">
          <span className="stat-label">Confirmed payments</span>
          <h2>{formatBDT(58000)}</h2>
        </article>
        <article className="card card-pad">
          <span className="stat-label">Gold credited</span>
          <h2>5.72 g</h2>
        </article>
      </div>
    </>
  )
}
