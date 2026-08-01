import { useState } from 'react'
import ProductGrid from '../../components/marketplace/ProductGrid'
import ProductModal from '../../components/marketplace/ProductModal'
import ShopCard from '../../components/cards/ShopCard'
import GoldPriceTrend from '../../components/customer/GoldPriceTrend'
import { activity, formatBDT, installment, installmentSummary, shops } from '../../data/appData'
import { getProducts } from '../../services/productService'
import { useAuth } from '../../hooks/useAuth'
export default function Dashboard({ globalSearch = '' }) {
  const [selected, setSelected] = useState(null)
  const { user } = useAuth()
  const hasActivePlan =
    user?.hasActivePlan === true || user?.email?.toLowerCase() === 'customer@midas.bd'
  const summary = installmentSummary()
  const transactions = installment.schedule.filter((row) => row.status === 'Confirmed')
  const products = getProducts().filter((p) =>
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
      <div className="grid g-2-1">
        {hasActivePlan ? (
          <article className="card active-installment-card">
            <div className="card-head">
              <div>
                <div className="card-title">Active Installment</div>
                <div className="card-sub">
                  {installment.shop} · {installment.product}
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
                    {installment.targetGoldGrams} g {installment.purity}
                  </b>
                </div>
                <div>
                  <div className="stat-label">Gold you own</div>
                  <b>{summary.goldOwned.toFixed(3)} g</b>
                </div>
              </div>
              <small className="u-muted">Payments are recorded by the partner shop.</small>
            </div>
          </article>
        ) : (
          <article className="card no-plan-card">
            <div className="card-pad">
              <span className="badge badge-gold">No active plan</span>
              <h2>Start your first gold plan</h2>
              <p>Choose jewelry from a partner shop and request an installment agreement.</p>
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
            {hasActivePlan && transactions.length ? (
              transactions.map((row, index) => (
                <div key={row.n || index}>
                  <span>
                    <b>{formatBDT(row.amount)}</b>
                    <small>{row.due}</small>
                  </span>
                  <span>
                    <b>{(row.amount / row.goldRate).toFixed(3)} g</b>
                    <small>at {formatBDT(row.goldRate)}/g</small>
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-history">
                <span className="seal">♢</span>
                <b>No transactions yet</b>
                <small>Your shop-recorded payments will appear here.</small>
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
      <div className={`grid ${hasActivePlan ? 'g-2' : ''} dashboard-bottom`}>
        {hasActivePlan && (
          <article className="card">
            <div className="card-head">
              <div className="card-title">Upcoming Due</div>
            </div>
            <div className="card-pad">
              <b>{installment.nextDue}</b>
              <div className="tmeta">
                {installment.shop} · {formatBDT(installment.nextAmount)}
              </div>
            </div>
          </article>
        )}
        <article className="card">
          <div className="card-head">
            <div className="card-title">Recent Activity</div>
          </div>
          <div className="card-pad activity-list">
            {activity.map((a) => (
              <div key={a.title}>
                <span>
                  <b>{a.title}</b>
                  <small>{a.meta}</small>
                </span>
                <small>{a.when}</small>
              </div>
            ))}
          </div>
        </article>
      </div>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  )
}
