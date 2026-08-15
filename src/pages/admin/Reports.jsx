import { formatBDT } from '../../data/appData'
import { useApiResource } from '../../hooks/useApiResource'
import { midasApi } from '../../services/midasApi'

function csvCell(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`
}

export default function Reports() {
  const { data: report, loading, error } = useApiResource(midasApi.report, [])
  if (loading) return <div className="route-loading">Loading reports…</div>
  if (error)
    return (
      <div className="notice" role="alert">
        {error}
      </div>
    )
  const records = report.payments || []
  const groups = new Set(records.map((record) => record.agreement).filter(Boolean))
  const paymentValue = Number(report.paymentValue)
  const goldValue = Number(report.goldValue)
  const commissionValue = paymentValue * 0.02
  const inventoryValue = Number(report.inventoryValue)
  const inStockProducts = Number(report.inStockProducts)

  const customerGoldTotals = Object.entries(
    Object.fromEntries(
      (report.customerGold || []).map((row) => [row.customer, Number(row.goldGrams)]),
    ),
  )
    .map(([customer, goldGrams]) => ({ customer, goldGrams }))
    .sort((a, b) => b.goldGrams - a.goldGrams)
  const highestCustomerGold = customerGoldTotals[0]?.goldGrams || 1

  const partnerRows = report.partners || []

  const exportReport = () => {
    const headers = [
      'Invoice ID',
      'Customer',
      'Agreement',
      'Amount BDT',
      'Gold grams',
      'Gold rate',
      'Date',
    ]
    const lines = records.map((record) =>
      [
        record.invoiceId,
        record.customer,
        record.agreement,
        record.amount,
        record.goldAmount,
        record.goldRate,
        record.date,
      ]
        .map(csvCell)
        .join(','),
    )
    const blob = new Blob([[headers.map(csvCell).join(','), ...lines].join('\n')], {
      type: 'text/csv;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'midas-platform-payment-report.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="admin-platform-reports">
      <div className="report-toolbar admin-report-hero">
        <div>
          <span className="shop-dashboard-kicker">Platform intelligence</span>
          <h2>Platform Reports</h2>
          <p>
            Operational performance based on verified partners, payment records, and marketplace
            activity.
          </p>
        </div>
        <button className="btn btn-gold" onClick={exportReport} disabled={!records.length}>
          Export payment data
        </button>
      </div>

      <section className="admin-report-kpis" aria-label="Platform report summary">
        <article className="card admin-report-kpi primary">
          <span className="stat-label">Recorded payment value</span>
          <strong>{formatBDT(paymentValue)}</strong>
          <small>
            {records.length} invoices across {groups.size} agreements
          </small>
        </article>
        <article className="card admin-report-kpi">
          <span className="stat-label">Gold credited</span>
          <strong>{goldValue.toFixed(3)} g</strong>
          <small>Calculated from shop recorded conversion rates</small>
        </article>
        <article className="card admin-report-kpi warning">
          <span className="stat-label">Commission exposure</span>
          <strong>{formatBDT(commissionValue)}</strong>
          <small>Estimated using the current 2% platform rate</small>
        </article>
        <article className="card admin-report-kpi">
          <span className="stat-label">Verified partner coverage</span>
          <strong>
            {report.verifiedShops}/{report.totalShops}
          </strong>
          <small>{report.products} published marketplace products</small>
        </article>
      </section>

      <section className="admin-report-chart-grid">
        <article className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Gold credited by customer</div>
              <div className="card-sub">Confirmed gold weight from shop recorded payments</div>
            </div>
          </div>
          <div className="card-pad admin-customer-value-bars">
            {customerGoldTotals.map((row) => (
              <div key={row.customer}>
                <span>
                  <b>{row.customer}</b>
                  <strong>{row.goldGrams.toFixed(3)} g</strong>
                </span>
                <div className="admin-value-track">
                  <span style={{ width: `${(row.goldGrams / highestCustomerGold) * 100}%` }} />
                </div>
              </div>
            ))}
            {!customerGoldTotals.length && (
              <div className="shop-filter-empty">No confirmed gold records yet.</div>
            )}
          </div>
        </article>

        <article className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Marketplace readiness</div>
              <div className="card-sub">Stock, request, and C2C activity</div>
            </div>
          </div>
          <div className="card-pad admin-marketplace-readiness">
            <div>
              <span>Products in stock</span>
              <strong>
                {inStockProducts}/{report.products}
              </strong>
              <small>{formatBDT(inventoryValue)} catalog value</small>
            </div>
            <div>
              <span>Open purchase requests</span>
              <strong>{report.openRequests}</strong>
              <small>{formatBDT(report.openRequestValue)} requested value</small>
            </div>
            <div>
              <span>Active C2C listings</span>
              <strong>{report.activeC2c}</strong>
              <small>Jewelry resale listings</small>
            </div>
          </div>
        </article>
      </section>

      <section className="card admin-partner-report">
        <div className="card-head">
          <div>
            <div className="card-title">Partner marketplace performance</div>
            <div className="card-sub">
              Verification, catalog coverage, stock, and customer rating
            </div>
          </div>
          <span className="badge badge-green">Verified partners only</span>
        </div>
        <div className="admin-report-table-wrap">
          <table className="dtable">
            <thead>
              <tr>
                <th>Partner shop</th>
                <th>Location</th>
                <th>Products</th>
                <th>In stock</th>
                <th>Catalog value</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {partnerRows.map((shop) => (
                <tr key={shop.id}>
                  <td className="tname">{shop.name}</td>
                  <td>{shop.area}</td>
                  <td>{shop.products}</td>
                  <td>
                    {shop.inStock}/{shop.products}
                  </td>
                  <td className="mono">{formatBDT(shop.catalogValue)}</td>
                  <td>{shop.rating} ★</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="notice admin-report-principle">
        <b>Reporting scope:</b> MIDAS reports recorded marketplace and agreement activity. Payment
        values are entered by partner shops; MIDAS does not receive or reconcile customer funds.
      </div>
    </div>
  )
}
