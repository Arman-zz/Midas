import { c2cListings, formatBDT, requests, shops } from '../../data/appData'
import { getPaymentGroups, getPaymentRecords } from '../../services/paymentService'
import { getProducts } from '../../services/productService'

function pendingShopApplication() {
  try {
    const profile = JSON.parse(localStorage.getItem('midas-shop-profile') || 'null')
    return profile?.verificationStatus === 'pending' ? profile : null
  } catch {
    return null
  }
}

export default function Dashboard() {
  const products = getProducts()
  const paymentRecords = getPaymentRecords()
  const paymentGroups = getPaymentGroups()
  const pendingShop = pendingShopApplication()
  const verifiedShops = shops.filter((shop) => shop.verified)
  const paymentValue = paymentRecords.reduce((sum, record) => sum + Number(record.amount), 0)
  const commissionDue = paymentValue * 0.02
  const dataIssues = [
    {
      label: 'Payments missing invoice IDs',
      count: paymentRecords.filter((record) => !record.invoiceId).length,
      href: '#/admin/transactions',
    },
    {
      label: 'Payments missing gold conversion',
      count: paymentRecords.filter((record) => !record.goldAmount || !record.goldRate).length,
      href: '#/admin/transactions',
    },
    {
      label: 'Products missing images',
      count: products.filter((product) => !product.image).length,
      href: '#/admin/products',
    },
    {
      label: 'Unverified shops in partner directory',
      count: shops.filter((shop) => !shop.verified).length,
      href: '#/admin/shops',
    },
  ]
  const issueTotal = dataIssues.reduce((sum, issue) => sum + issue.count, 0)

  return (
    <div className="admin-dashboard">
      <section className="admin-ops-hero">
        <div>
          <span className="shop-dashboard-kicker">Platform operations</span>
          <h2>Administration overview</h2>
          <p>Monitor partner eligibility, marketplace records, payment data, and platform fees.</p>
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
        <article className={`card admin-ops-metric ${pendingShop ? 'attention' : ''}`}>
          <span className="stat-label">Verification queue</span>
          <strong>{pendingShop ? 1 : 0}</strong>
          <small>{pendingShop ? 'Shop application needs review' : 'No applications waiting'}</small>
        </article>
        <article className="card admin-ops-metric">
          <span className="stat-label">Verified partners</span>
          <strong>{verifiedShops.length}</strong>
          <small>{products.length} marketplace products</small>
        </article>
        <article className="card admin-ops-metric">
          <span className="stat-label">Recorded payment value</span>
          <strong className="admin-ops-money">{formatBDT(paymentValue)}</strong>
          <small>
            {paymentRecords.length} invoices across {paymentGroups.length} agreements
          </small>
        </article>
        <article className="card admin-ops-metric">
          <span className="stat-label">Commission exposure</span>
          <strong className="admin-ops-money">{formatBDT(commissionDue)}</strong>
          <small>Estimated at the current 2% rate</small>
        </article>
      </section>

      <section className="admin-priority-layout">
        <article className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Needs administrator attention</div>
              <div className="card-sub">Items requiring review or follow-up</div>
            </div>
            <span
              className={`badge ${pendingShop || requests.length ? 'badge-warn' : 'badge-green'}`}
            >
              {(pendingShop ? 1 : 0) + requests.length} open
            </span>
          </div>
          <div className="card-pad admin-attention-list">
            {pendingShop && (
              <div>
                <span className="admin-attention-marker urgent" />
                <span>
                  <b>{pendingShop.name || 'New shop'} verification application</b>
                  <small>Review business identity and uploaded documents before approval.</small>
                </span>
                <a href="#/admin/shops">Review</a>
              </div>
            )}
            <div>
              <span className="admin-attention-marker" />
              <span>
                <b>{requests.length} purchase requests are open</b>
                <small>Monitor request handling and agreement creation across partner shops.</small>
              </span>
              <a href="#/admin/agreements">View</a>
            </div>
            <div>
              <span className="admin-attention-marker" />
              <span>
                <b>{formatBDT(commissionDue)} commission is recorded</b>
                <small>Review partner commission statements and outstanding platform fees.</small>
              </span>
              <a href="#/admin/commissions">Review</a>
            </div>
          </div>
        </article>

        <article className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Record integrity</div>
              <div className="card-sub">Automated checks across platform data</div>
            </div>
            <span className={`badge ${issueTotal ? 'badge-warn' : 'badge-green'}`}>
              {issueTotal ? `${issueTotal} issues` : 'Healthy'}
            </span>
          </div>
          <div className="card-pad admin-integrity-list">
            {dataIssues.map((issue) => (
              <a href={issue.href} key={issue.label}>
                <span className={issue.count ? 'has-issue' : ''}>{issue.count ? '!' : '✓'}</span>
                <b>{issue.label}</b>
                <strong>{issue.count}</strong>
              </a>
            ))}
          </div>
        </article>
      </section>

      <section className="admin-platform-snapshot">
        <article className="card card-pad">
          <span className="stat-label">Active customer agreements</span>
          <strong>{paymentGroups.length}</strong>
          <a href="#/admin/agreements">Manage agreements →</a>
        </article>
        <article className="card card-pad">
          <span className="stat-label">C2C marketplace listings</span>
          <strong>{c2cListings.length}</strong>
          <a href="#/admin/products">Review marketplace →</a>
        </article>
        <article className="card card-pad">
          <span className="stat-label">Open purchase requests</span>
          <strong>{requests.length}</strong>
          <a href="#/admin/agreements">View activity →</a>
        </article>
      </section>

      <section className="card admin-recent-records">
        <div className="card-head">
          <div>
            <div className="card-title">Recent payment records</div>
            <div className="card-sub">Latest invoices recorded by partner shops</div>
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
                <th>Gold converted</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentRecords.slice(0, 5).map((record) => (
                <tr key={record.id || record.invoiceId}>
                  <td className="mono">{record.invoiceId}</td>
                  <td className="tname">{record.customer}</td>
                  <td className="mono">{record.agreement}</td>
                  <td className="mono">{formatBDT(record.amount)}</td>
                  <td className="mono">{record.goldAmount.toFixed(3)} g</td>
                  <td>{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="admin-dashboard-note">
        MIDAS records platform activity and gold conversions but does not receive or hold customer
        payments.
      </p>
    </div>
  )
}
