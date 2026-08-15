import { useState } from 'react'
import ProductGrid from '../../components/marketplace/ProductGrid'
import ProductModal from '../../components/marketplace/ProductModal'
import ShopCard from '../../components/cards/ShopCard'
import GoldPriceTrend from '../../components/customer/GoldPriceTrend'
import { formatBDT, shops } from '../../data/appData'
import { usePlans } from '../../hooks/usePlans'
import { useProducts } from '../../hooks/useProducts'
import { useApiResource } from '../../hooks/useApiResource'
import { useAuth } from '../../hooks/useAuth'
import { midasApi } from '../../services/midasApi'

function relativeTime(value) {
  const timestamp = new Date(value).getTime()
  if (!Number.isFinite(timestamp)) return ''
  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000))
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`
  if (seconds < 604800)
    return `${Math.floor(seconds / 86400)} day${seconds < 172800 ? '' : 's'} ago`
  return new Date(value).toLocaleDateString('en-BD', { day: 'numeric', month: 'short' })
}

export default function Dashboard({ globalSearch = '' }) {
  const [selected, setSelected] = useState(null)
  const { user } = useAuth()
  const { plans } = usePlans()
  const { products: remoteProducts } = useProducts()
  const { data: paymentData, error: paymentError } = useApiResource(midasApi.payments, [])
  const payments = (paymentData || []).map((payment) => ({
    ...payment,
    amount: Number(payment.amount),
    goldAmount: Number(payment.goldAmount),
    goldRate: Number(payment.goldRate),
  }))
  const activePlan = plans.find((plan) => plan.status === 'Active')
  const pendingPlan = plans.find((plan) => plan.status === 'Pending')
  const completedCount = plans.filter((plan) => plan.status === 'Completed').length
  const latestCompleted = plans.find((plan) => plan.status === 'Completed')
  const summary = activePlan
    ? {
        payments: payments.filter((payment) => payment.agreement === activePlan.agreement),
        goldOwned: activePlan.goldOwned,
        spent: activePlan.spent,
        progress: activePlan.progress,
        isComplete: activePlan.progress >= 100,
      }
    : { payments: [], goldOwned: 0, spent: 0, progress: 0, isComplete: false }
  const transactions = summary.payments
  const recentActivity = [
    ...payments.map((payment) => ({
      id: `payment-${payment.id}`,
      title: 'Payment recorded',
      meta: `${payment.invoiceId} · ${formatBDT(payment.amount)} converted to ${payment.goldAmount.toFixed(3)} g`,
      date: payment.date,
    })),
    ...plans.map((plan) => ({
      id: `plan-${plan.id}-${plan.status}`,
      title:
        plan.status === 'Completed'
          ? 'Installment plan completed'
          : plan.status === 'Active'
            ? 'Installment plan approved'
            : plan.status === 'Rejected'
              ? 'Installment request rejected'
              : 'Installment plan requested',
      meta: `${plan.product} · ${plan.shop}`,
      date: plan.completedAt || plan.decidedAt || plan.requestedAt,
    })),
  ]
    .filter((item) => item.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
  const products = remoteProducts.filter((p) =>
    `${p.name} ${p.shop}`.toLowerCase().includes(globalSearch.toLowerCase()),
  )
  const filteredShops = shops.filter((s) =>
    `${s.name} ${s.area}`.toLowerCase().includes(globalSearch.toLowerCase()),
  )
  if (globalSearch)
    return (
      <>
        <div className="section-h">
          <h2>Search results</h2>
          <span>{products.length + filteredShops.length} matches</span>
        </div>
        {filteredShops.length > 0 && (
          <div className="grid g-3">
            {filteredShops.map((s) => (
              <ShopCard key={s.id} shop={s} />
            ))}
          </div>
        )}
        <div className="section-h">
          <h2>Jewelry</h2>
        </div>
        <ProductGrid products={products} onSelect={setSelected} />
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      </>
    )
  return (
    <>
      {!activePlan && latestCompleted && (
        <article
          className="card installment-congratulations dashboard-congratulations"
          role="status"
        >
          <span className="seal" aria-hidden="true">
            ✓
          </span>
          <div>
            <span className="installment-kicker">100% complete</span>
            <h2>Congratulations, {user?.name}!</h2>
            <p>
              You own your {latestCompleted.targetGoldGrams.toFixed(2)} g target for{' '}
              {latestCompleted.product}. You can now start another plan.
            </p>
          </div>
        </article>
      )}
      <div className="grid g-2-1">
        {activePlan ? (
          <article className="card active-installment-card">
            <div className="card-head">
              <div>
                <div className="card-title">Active Installment</div>
                <div className="card-sub">
                  {activePlan.shop} · {activePlan.product}
                </div>
              </div>
            </div>
            <div className="card-pad">
              <div className="u-flex progress-label">
                <b>Progress</b>
                <span className="mono">{summary.progress.toFixed(1)}%</span>
              </div>
              <div className="progress">
                <span style={{ width: `${summary.progress}%` }} />
              </div>
              <div className="grid g-2 active-installment-metrics">
                <div>
                  <div className="stat-label">Target jewelry gold</div>
                  <b>
                    {activePlan.targetGoldGrams.toFixed(2)} g {activePlan.purity}
                  </b>
                </div>
                <div>
                  <div className="stat-label">Gold you own</div>
                  <b>{summary.goldOwned.toFixed(3)} g</b>
                </div>
              </div>
              <small className="u-muted">Payments are recorded by the partner shop.</small>
              <a className="btn btn-gold btn-sm" href="#/customer/installments">
                Apply for payment record
              </a>
            </div>
          </article>
        ) : pendingPlan ? (
          <article className="card no-plan-card">
            <div className="card-pad">
              <span className="badge badge-warn">Waiting for shop approval</span>
              <h2>{pendingPlan.product}</h2>
              <p>{pendingPlan.shop} is reviewing your installment request.</p>
            </div>
          </article>
        ) : (
          <article className="card no-plan-card">
            <div className="card-pad">
              <span className="badge badge-gold">No active plan</span>
              <h2>{completedCount ? 'Start another gold plan' : 'Start your first gold plan'}</h2>
              <p>Choose jewelry from a partner shop and request an installment agreement.</p>
              <small className="u-muted">Plans completed: {completedCount}</small>
              <a className="btn btn-gold" href="#/customer/marketplace">
                Explore jewelry
              </a>
            </div>
          </article>
        )}
        <article className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Transaction History</div>
              <div className="card-sub">All payments recorded by your partner shop</div>
            </div>
          </div>
          <div className="card-pad transaction-history-list">
            {activePlan && transactions.length ? (
              transactions.map((row, index) => (
                <div key={row.n || index}>
                  <span>
                    <b>{formatBDT(row.amount)}</b>
                    <small>{row.due || row.date}</small>
                  </span>
                  <span>
                    <b>{Number(row.goldAmount).toFixed(3)} g</b>
                    <small>at {formatBDT(row.goldRate)}/g</small>
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-history">
                <span className="seal">♢</span>
                <b>No transactions yet</b>
                <small>Your shop recorded payments will appear here.</small>
              </div>
            )}
          </div>
        </article>
      </div>
      <GoldPriceTrend />
      <div className="section-h">
        <h2>Partner Shops Near You</h2>
        <a href="#/customer/shops">View all →</a>
      </div>
      <div className="grid g-3">
        {shops.slice(0, 3).map((s) => (
          <ShopCard key={s.id} shop={s} />
        ))}
      </div>
      <div className="section-h">
        <h2>Recommended Jewelry</h2>
        <a href="#/customer/marketplace">View all →</a>
      </div>
      <ProductGrid products={products.slice(0, 4)} onSelect={setSelected} />
      <div className={`grid ${activePlan ? 'g-2' : ''} dashboard-bottom`}>
        {activePlan && (
          <article className="card">
            <div className="card-head">
              <div className="card-title">Upcoming Due</div>
            </div>
            <div className="card-pad">
              <b>Arrange directly with your shop</b>
              <div className="tmeta">{activePlan.shop} · no online transaction</div>
            </div>
          </article>
        )}
        <article className="card">
          <div className="card-head">
            <div className="card-title">Recent Activity</div>
          </div>
          <div className="card-pad activity-list">
            {recentActivity.map((item) => (
              <div key={item.id}>
                <span>
                  <b>{item.title}</b>
                  <small>{item.meta}</small>
                </span>
                <small>{relativeTime(item.date)}</small>
              </div>
            ))}
            {!recentActivity.length && !paymentError && (
              <div className="empty-history">
                <span className="seal">♢</span>
                <b>No recent activity</b>
                <small>Your plan requests and shop recorded payments will appear here.</small>
              </div>
            )}
            {paymentError && (
              <div className="field-error" role="alert">
                {paymentError}
              </div>
            )}
          </div>
        </article>
      </div>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  )
}
