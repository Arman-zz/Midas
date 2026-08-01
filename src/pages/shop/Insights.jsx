import { useMemo, useState } from 'react'
import { formatBDT, requests, shops } from '../../data/appData'
import { getPaymentRecords } from '../../services/paymentService'
import { getProducts } from '../../services/productService'

export default function Insights() {
  const [lastAnalyzed, setLastAnalyzed] = useState(() => new Date())
  const records = useMemo(() => getPaymentRecords(), [lastAnalyzed])
  const products = useMemo(
    () => getProducts().filter((product) => product.shop === shops[0].name),
    [lastAnalyzed],
  )

  const totalPayments = records.reduce((sum, record) => sum + Number(record.amount), 0)
  const averagePayment = records.length ? totalPayments / records.length : 0
  const outOfStock = products.filter((product) => !product.inStock)
  const installmentRequests = requests.filter((request) => request.type === 'Installment')
  const customerTotals = records.reduce((totals, record) => {
    totals[record.customer] = (totals[record.customer] || 0) + Number(record.amount)
    return totals
  }, {})
  const topCustomer = Object.entries(customerTotals).sort((a, b) => b[1] - a[1])[0]
  const topCustomerShare = topCustomer && totalPayments ? (topCustomer[1] / totalPayments) * 100 : 0
  const productValues = Object.entries(
    requests.reduce((totals, request) => {
      totals[request.product] = (totals[request.product] || 0) + Number(request.amount)
      return totals
    }, {}),
  )
    .map(([product, value]) => ({ product, value }))
    .sort((a, b) => b.value - a.value)
  const highestProductValue = productValues[0]?.value || 1
  const topProduct = productValues[0]
  const requestTypeValues = requests.reduce(
    (totals, request) => ({
      ...totals,
      [request.type]: (totals[request.type] || 0) + Number(request.amount),
    }),
    {},
  )
  const totalRequestValue = Object.values(requestTypeValues).reduce((sum, value) => sum + value, 0)
  const installmentValueShare = totalRequestValue
    ? ((requestTypeValues.Installment || 0) / totalRequestValue) * 100
    : 0
  const directValueShare = totalRequestValue
    ? ((requestTypeValues.Direct || 0) / totalRequestValue) * 100
    : 0

  return (
    <div className="shop-ai-insights">
      <div className="ai-insights-header shop-ai-header">
        <div>
          <span className="eyebrow">AI-assisted shop analysis</span>
          <h2>AI Insights</h2>
          <p>Actionable signals generated from your payments, requests, and marketplace stock.</p>
        </div>
        <button className="btn btn-gold" onClick={() => setLastAnalyzed(new Date())}>
          Refresh insights
        </button>
      </div>

      <div className="shop-ai-status">
        <span className="shop-ai-pulse" aria-hidden="true" />
        <span>
          Analyzed {records.length} payments, {requests.length} requests, and {products.length}{' '}
          products
        </span>
        <small>
          Updated {lastAnalyzed.toLocaleTimeString('en-BD', { hour: 'numeric', minute: '2-digit' })}
        </small>
      </div>

      <section className="shop-ai-signal-grid shop-ai-vertical-stack">
        <article className="card card-pad ai-insight-card">
          <div className="ai-insight-top">
            <span className="badge badge-green">Healthy</span>
            <span className="mono">Payments</span>
          </div>
          <h3>{formatBDT(totalPayments)} recorded</h3>
          <p>
            Average invoice value is {formatBDT(averagePayment)} across {records.length} payment
            records.
          </p>
          <div className="ai-recommendation">
            <b>Recommended action</b>
            <span>
              Record invoices promptly so customer gold progress and insights stay current.
            </span>
          </div>
        </article>

        <article className="card card-pad ai-insight-card">
          <div className="ai-insight-top">
            <span className={`badge ${outOfStock.length ? 'badge-warn' : 'badge-green'}`}>
              {outOfStock.length ? 'Attention' : 'Healthy'}
            </span>
            <span className="mono">Inventory</span>
          </div>
          <h3>
            {products.length - outOfStock.length} of {products.length} products available
          </h3>
          <p>
            {outOfStock.length
              ? `${outOfStock.map((product) => product.name).join(', ')} should be restocked or marked accurately.`
              : 'Every marketplace product is currently available for customer requests.'}
          </p>
          <div className="ai-recommendation">
            <b>Recommended action</b>
            <span>
              {outOfStock.length
                ? 'Update stock before promoting these products.'
                : 'Keep availability reviewed daily.'}
            </span>
          </div>
        </article>

        <article className="card card-pad ai-insight-card">
          <div className="ai-insight-top">
            <span className="badge badge-gold">Opportunity</span>
            <span className="mono">Requests</span>
          </div>
          <h3>{installmentRequests.length} installment opportunities</h3>
          <p>
            {requests.length
              ? `${Math.round((installmentRequests.length / requests.length) * 100)}% of open requests are for installment plans.`
              : 'There are no open requests requiring review.'}
          </p>
          <div className="ai-recommendation">
            <b>Recommended action</b>
            <span>Respond quickly and confirm product availability before accepting a plan.</span>
          </div>
        </article>
      </section>

      <section className="shop-ai-chart-layout">
        <article className="card shop-ai-chart-card">
          <div className="card-head">
            <div>
              <div className="card-title">Product value ranking</div>
              <div className="card-sub">Customer-request value by product</div>
            </div>
            <span className="badge badge-gold">Bar chart</span>
          </div>
          <div className="card-pad shop-product-bars">
            {productValues.map((row, index) => (
              <div className="shop-product-bar-row" key={row.product}>
                <div className="shop-product-bar-label">
                  <span>
                    <b>{row.product}</b>
                    {index === 0 && <small>Highest value product</small>}
                  </span>
                  <strong>{formatBDT(row.value)}</strong>
                </div>
                <div
                  className="shop-product-bar-track"
                  role="img"
                  aria-label={`${row.product}: ${formatBDT(row.value)} in request value`}
                >
                  <span style={{ width: `${(row.value / highestProductValue) * 100}%` }} />
                </div>
              </div>
            ))}
            {topProduct && (
              <div className="shop-chart-insight">
                <span>AI insight</span>
                <p>
                  <b>{topProduct.product}</b> is generating the most potential value at{' '}
                  {formatBDT(topProduct.value)}. Prioritize availability and a fast response for
                  this product.
                </p>
              </div>
            )}
          </div>
        </article>

        <article className="card shop-ai-chart-card">
          <div className="card-head">
            <div>
              <div className="card-title">Request value mix</div>
              <div className="card-sub">Installment versus direct purchase value</div>
            </div>
            <span className="badge badge-muted">Pie chart</span>
          </div>
          <div className="card-pad shop-request-pie-content">
            <div
              className="shop-request-pie"
              style={{ '--installment-share': `${installmentValueShare}%` }}
              role="img"
              aria-label={`${installmentValueShare.toFixed(1)} percent installment value and ${directValueShare.toFixed(1)} percent direct value`}
            >
              <span>
                <strong>{formatBDT(totalRequestValue)}</strong>
                <small>Total request value</small>
              </span>
            </div>
            <div className="shop-pie-legend">
              <div>
                <span className="shop-pie-dot installment" />
                <span>
                  <b>Installment</b>
                  <small>{formatBDT(requestTypeValues.Installment || 0)}</small>
                </span>
                <strong>{installmentValueShare.toFixed(1)}%</strong>
              </div>
              <div>
                <span className="shop-pie-dot direct" />
                <span>
                  <b>Direct</b>
                  <small>{formatBDT(requestTypeValues.Direct || 0)}</small>
                </span>
                <strong>{directValueShare.toFixed(1)}%</strong>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="shop-ai-customer-section">
        <article className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Customer value signal</div>
              <div className="card-sub">Payment concentration across your customers</div>
            </div>
          </div>
          <div className="card-pad shop-ai-customer-signal">
            {topCustomer ? (
              <>
                <span className="stat-label">Highest recorded customer value</span>
                <strong>{topCustomer[0]}</strong>
                <b>{formatBDT(topCustomer[1])}</b>
                <div className="progress">
                  <span style={{ width: `${topCustomerShare}%` }} />
                </div>
                <small>{topCustomerShare.toFixed(1)}% of all recorded payment value</small>
              </>
            ) : (
              <div className="shop-ai-clear">Record payments to generate customer insights.</div>
            )}
          </div>
        </article>
      </section>

      <p className="shop-ai-disclaimer">
        Insights are decision support generated from MIDAS activity records. Verify stock, customer
        context, and payment details before acting.
      </p>
    </div>
  )
}
