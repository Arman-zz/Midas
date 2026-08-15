import { formatBDT } from '../../data/appData'
import { useApiResource } from '../../hooks/useApiResource'
import { midasApi } from '../../services/midasApi'

export default function Dashboard() {
  const { data: report, loading, error } = useApiResource(midasApi.report, [])
  const { data: shops } = useApiResource(midasApi.adminShops, [])
  if (loading) return <div className="route-loading">Loading administration overview…</div>
  if (error)
    return (
      <div className="notice" role="alert">
        {error}
      </div>
    )
  const pendingShops = (shops || []).filter((shop) => shop.verificationStatus === 'pending')
  const paymentValue = Number(report.paymentValue)
  const commissionDue = paymentValue * 0.02

  return (
    <div className="admin-dashboard">
      <section className="admin-ops-hero">
        <div>
          <span className="shop-dashboard-kicker">Platform operations</span>
          <h2>Administration overview</h2>
          <p>Live marketplace, agreement, payment, and partner-verification records.</p>
        </div>
        <div className="admin-hero-actions">
          <a className="btn btn-gold" href="#/admin/shops">
            Review shops
          </a>
          <a className="btn btn-outline" href="#/admin/settings">
            Platform settings
          </a>
        </div>
      </section>

      <section className="admin-ops-metrics" aria-label="Platform overview">
        <article className={`card admin-ops-metric ${pendingShops.length ? 'attention' : ''}`}>
          <span className="stat-label">Verification queue</span>
          <strong>{pendingShops.length}</strong>
          <small>Applications waiting for a decision</small>
        </article>
        <article className="card admin-ops-metric">
          <span className="stat-label">Verified partners</span>
          <strong>{report.verifiedShops}</strong>
          <small>{report.products} marketplace products</small>
        </article>
        <article className="card admin-ops-metric">
          <span className="stat-label">Recorded payment value</span>
          <strong className="admin-ops-money">{formatBDT(paymentValue)}</strong>
          <small>
            {report.invoices} invoices across {report.agreements} agreements
          </small>
        </article>
        <article className="card admin-ops-metric">
          <span className="stat-label">Commission exposure</span>
          <strong className="admin-ops-money">{formatBDT(commissionDue)}</strong>
          <small>Estimated at the current 2% rate</small>
        </article>
      </section>

      <section className="admin-platform-snapshot">
        <article className="card card-pad">
          <span className="stat-label">Open plan requests</span>
          <strong>{report.openRequests}</strong>
          <a href="#/admin/agreements">Manage agreements →</a>
        </article>
        <article className="card card-pad">
          <span className="stat-label">Active C2C listings</span>
          <strong>{report.activeC2c}</strong>
          <a href="#/admin/products">Review marketplace →</a>
        </article>
        <article className="card card-pad">
          <span className="stat-label">Products in stock</span>
          <strong>
            {report.inStockProducts}/{report.products}
          </strong>
          <a href="#/admin/products">View catalog →</a>
        </article>
      </section>

      <section className="card admin-recent-records">
        <div className="card-head">
          <div>
            <div className="card-title">Recent payment records</div>
            <div className="card-sub">Latest partner shop invoices</div>
          </div>
          <a href="#/admin/transactions">View all</a>
        </div>
        <div className="admin-dashboard-table-wrap">
          <table className="dtable">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Customer</th>
                <th>Agreement</th>
                <th>Payment</th>
                <th>Gold</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {(report.payments || []).slice(0, 5).map((record) => (
                <tr key={record.invoiceId}>
                  <td className="mono">{record.invoiceId}</td>
                  <td className="tname">{record.customer}</td>
                  <td className="mono">{record.agreement}</td>
                  <td>{formatBDT(record.amount)}</td>
                  <td>{Number(record.goldAmount).toFixed(3)} g</td>
                  <td>{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
