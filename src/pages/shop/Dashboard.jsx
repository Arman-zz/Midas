import { formatBDT, installment } from '../../data/appData'
import { usePlans } from '../../hooks/usePlans'
import { useShopProducts } from '../../hooks/useShopProducts'
import { useApiResource } from '../../hooks/useApiResource'
import { midasApi } from '../../services/midasApi'

export default function Dashboard() {
  const { plans } = usePlans()
  const { products: shopProducts } = useShopProducts()
  const { data } = useApiResource(midasApi.payments, [])
  const paymentRecords = (data || []).map((row) => ({ ...row, amount: Number(row.amount) }))
  const paymentTotal = paymentRecords.reduce((sum, row) => sum + row.amount, 0)
  const pendingRequests = plans.filter((row) => row.status === 'Pending')
  const installmentRequests = plans.filter((row) => row.status === 'Active')
  const outOfStock = shopProducts.filter((product) => !product.inStock).length

  return (
    <div className="shop-dashboard">
      <section className="shop-dashboard-hero">
        <div>
          <span className="shop-dashboard-kicker">Today's workspace</span>
          <h2>Run your shop from one place</h2>
          <p>Review requests, record received payments, and keep your marketplace stock current.</p>
        </div>
        <div className="shop-quick-actions" aria-label="Common shop actions">
          <a className="btn btn-gold" href="#/shop/installments">
            Record payment
          </a>
          <a className="btn btn-outline" href="#/shop/products">
            Add product
          </a>
        </div>
      </section>

      <section className="shop-metric-grid" aria-label="Shop overview">
        <article className="card shop-metric-card attention">
          <span className="stat-label">Requests to review</span>
          <strong>{pendingRequests.length}</strong>
          <a href="#/shop/requests">Review requests →</a>
        </article>
        <article className="card shop-metric-card">
          <span className="stat-label">Payments recorded</span>
          <strong>{paymentRecords.length}</strong>
          <small>{formatBDT(paymentTotal)} total</small>
        </article>
        <article className="card shop-metric-card">
          <span className="stat-label">Marketplace products</span>
          <strong>{shopProducts.length}</strong>
          <small>{outOfStock ? `${outOfStock} out of stock` : 'All products in stock'}</small>
        </article>
        <article className="card shop-metric-card">
          <span className="stat-label">Commission due</span>
          <strong className="shop-metric-money">{formatBDT(18500)}</strong>
          <a href="#/shop/commissions">View statement →</a>
        </article>
      </section>

      <section className="shop-priority-grid">
        <article className="card shop-action-card">
          <div className="card-head">
            <div>
              <div className="card-title">Needs your attention</div>
              <div className="card-sub">Tasks that keep customer plans moving</div>
            </div>
            <span className="badge badge-warn">{pendingRequests.length} open</span>
          </div>
          <div className="card-pad shop-task-list">
            {pendingRequests.slice(0, 3).map((row) => (
              <div className="shop-task" key={`${row.customer}-${row.product}`}>
                <span className="shop-task-marker" aria-hidden="true" />
                <span>
                  <b>{row.customer}</b>
                  <small>Installment request · {row.product}</small>
                </span>
                <div>
                  <b>{formatBDT(row.amount)}</b>
                  <a href="#/shop/requests">Review</a>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="card shop-shortcuts-card">
          <div className="card-head">
            <div>
              <div className="card-title">Quick management</div>
              <div className="card-sub">Frequently used shop tools</div>
            </div>
          </div>
          <div className="card-pad shop-shortcut-list">
            <a href="#/shop/installments">
              <span>Record a customer payment</span>
              <small>Update an active installment after receiving payment</small>
              <b>→</b>
            </a>
            <a href="#/shop/products">
              <span>Manage marketplace stock</span>
              <small>Add products or update availability</small>
              <b>→</b>
            </a>
            <a href="#/shop/insights">
              <span>View AI insights</span>
              <small>See prioritized payment, request, and stock signals</small>
              <b>→</b>
            </a>
          </div>
        </article>
      </section>

      <section className="grid g-2 shop-dashboard-lower">
        <article className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Active installment plans</div>
              <div className="card-sub">Customers currently paying toward jewelry</div>
            </div>
            <a href="#/shop/installments">Manage all</a>
          </div>
          <div className="shop-dashboard-table-wrap">
            <table className="dtable shop-dashboard-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Target</th>
                  <th>Next payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {installmentRequests.map((row) => (
                  <tr key={row.customer}>
                    <td className="tname">{row.customer}</td>
                    <td>{row.targetGoldGrams} g</td>
                    <td>{formatBDT(installment.nextAmount)}</td>
                    <td>
                      <span className="badge badge-green">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Recent payment records</div>
              <div className="card-sub">Latest payments entered by your shop</div>
            </div>
            <a href="#/shop/confirmations">View all</a>
          </div>
          <div className="card-pad activity-list shop-payment-list">
            {paymentRecords.slice(0, 4).map((row) => (
              <div key={row.id || row.invoiceId}>
                <span>
                  <b>{row.customer}</b>
                  <small>
                    {row.invoiceId} · {row.date}
                  </small>
                </span>
                <b>{formatBDT(row.amount)}</b>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
