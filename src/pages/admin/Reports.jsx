import { useMemo } from 'react'
import { c2cListings, formatBDT, requests, shops } from '../../data/appData'
import { getPaymentGroups, getPaymentRecords } from '../../services/paymentService'
import { getProducts } from '../../services/productService'

function csvCell(value) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`
}

export default function Reports() {
  const records = useMemo(() => getPaymentRecords(), [])
  const groups = useMemo(() => getPaymentGroups(), [])
  const products = useMemo(() => getProducts(), [])
  const paymentValue = records.reduce((sum, record) => sum + Number(record.amount), 0)
  const goldValue = records.reduce((sum, record) => sum + Number(record.goldAmount), 0)
  const commissionValue = paymentValue * 0.02
  const verifiedShops = shops.filter((shop) => shop.verified)
  const inventoryValue = products.reduce((sum, product) => sum + Number(product.price), 0)
  const inStockProducts = products.filter((product) => product.inStock).length

  const customerGoldTotals = Object.entries(
    records.reduce((totals, record) => {
      totals[record.customer] = (totals[record.customer] || 0) + Number(record.goldAmount)
      return totals
    }, {}),
  )
    .map(([customer, goldGrams]) => ({ customer, goldGrams }))
    .sort((a, b) => b.goldGrams - a.goldGrams)
  const highestCustomerGold = customerGoldTotals[0]?.goldGrams || 1

  const partnerRows = verifiedShops.map((shop) => {
    const shopProducts = products.filter((product) => product.shop === shop.name)
    return {
      ...shop,
      products: shopProducts.length,
      inStock: shopProducts.filter((product) => product.inStock).length,
      catalogValue: shopProducts.reduce((sum, product) => sum + Number(product.price), 0),
    }
  })

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
            {records.length} invoices across {groups.length} agreements
          </small>
        </article>
        <article className="card admin-report-kpi">
          <span className="stat-label">Gold credited</span>
          <strong>{goldValue.toFixed(3)} g</strong>
          <small>Calculated from shop-recorded conversion rates</small>
        </article>
        <article className="card admin-report-kpi warning">
          <span className="stat-label">Commission exposure</span>
          <strong>{formatBDT(commissionValue)}</strong>
          <small>Estimated using the current 2% platform rate</small>
        </article>
        <article className="card admin-report-kpi">
          <span className="stat-label">Verified partner coverage</span>
          <strong>
            {verifiedShops.length}/{shops.length}
          </strong>
          <small>{products.length} published marketplace products</small>
        </article>
      </section>

      <section className="admin-report-chart-grid">
        <article className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Gold credited by customer</div>
              <div className="card-sub">Confirmed gold weight from shop-recorded payments</div>
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
                {inStockProducts}/{products.length}
              </strong>
              <small>{formatBDT(inventoryValue)} catalog value</small>
            </div>
            <div>
              <span>Open purchase requests</span>
              <strong>{requests.length}</strong>
              <small>
                {formatBDT(requests.reduce((sum, request) => sum + request.amount, 0))} requested
                value
              </small>
            </div>
            <div>
              <span>Active C2C listings</span>
              <strong>{c2cListings.length}</strong>
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
