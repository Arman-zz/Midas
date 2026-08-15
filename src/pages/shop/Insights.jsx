import { formatBDT } from '../../data/appData'
import { usePlans } from '../../hooks/usePlans'
import { useShopProducts } from '../../hooks/useShopProducts'
import { useApiResource } from '../../hooks/useApiResource'
import { midasApi } from '../../services/midasApi'

export default function Insights() {
  const planResource = usePlans()
  const productResource = useShopProducts()
  const paymentResource = useApiResource(midasApi.payments, [])
  const records = paymentResource.data || []
  const plans = planResource.plans
  const products = productResource.products
  const totalPayments = records.reduce((sum, record) => sum + Number(record.amount), 0)
  const averagePayment = records.length ? totalPayments / records.length : 0
  const outOfStock = products.filter((product) => !product.inStock)
  const pending = plans.filter((plan) => plan.status === 'Pending')
  const active = plans.filter((plan) => plan.status === 'Active')

  const reload = async () =>
    Promise.all([planResource.reload(), productResource.reload(), paymentResource.reload()])

  return (
    <div className="shop-ai-insights">
      <div className="ai-insights-header shop-ai-header">
        <div>
          <span className="eyebrow">Live shop analysis</span>
          <h2>Operational Insights</h2>
          <p>Signals calculated from your authorized payment, plan, and inventory records.</p>
        </div>
        <button className="btn btn-gold" onClick={reload}>
          Refresh insights
        </button>
      </div>
      {(planResource.error || productResource.error || paymentResource.error) && (
        <div className="notice" role="alert">
          {planResource.error || productResource.error || paymentResource.error}
        </div>
      )}
      <section className="shop-ai-signal-grid shop-ai-vertical-stack">
        <article className="card card-pad ai-insight-card">
          <div className="ai-insight-top">
            <span className="badge badge-green">Payments</span>
          </div>
          <h3>{formatBDT(totalPayments)} recorded</h3>
          <p>
            {records.length} invoices with an average value of {formatBDT(averagePayment)}.
          </p>
        </article>
        <article className="card card-pad ai-insight-card">
          <div className="ai-insight-top">
            <span className={`badge ${outOfStock.length ? 'badge-warn' : 'badge-green'}`}>
              Inventory
            </span>
          </div>
          <h3>
            {products.length - outOfStock.length} of {products.length} available
          </h3>
          <p>
            {outOfStock.length
              ? `${outOfStock.length} products need a stock update.`
              : 'All published products are in stock.'}
          </p>
        </article>
        <article className="card card-pad ai-insight-card">
          <div className="ai-insight-top">
            <span className={`badge ${pending.length ? 'badge-warn' : 'badge-green'}`}>Plans</span>
          </div>
          <h3>{pending.length} requests awaiting review</h3>
          <p>{active.length} customer installment plans are currently active.</p>
        </article>
      </section>
    </div>
  )
}
