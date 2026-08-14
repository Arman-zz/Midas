import InstallmentTable from '../../components/installment/InstallmentTable'
import { formatBDT, installment } from '../../data/appData'
import { useAuth } from '../../hooks/useAuth'
import { getCustomerPlanSummary } from '../../services/paymentService'
import {
  getActiveCustomerPlan,
  getCompletedPlanCount,
  getCustomerPlans,
  getPendingCustomerPlan,
} from '../../services/planService'
import { usePlans } from '../../hooks/usePlans'

export default function Installments() {
  const { user } = useAuth()
  usePlans()
  const activePlan = getActiveCustomerPlan(user?.email)
  const pendingPlan = getPendingCustomerPlan(user?.email)
  const completedCount = getCompletedPlanCount(user?.email)
  const latestCompleted = getCustomerPlans(user?.email).find((plan) => plan.status === 'Completed')
  const summary = activePlan
    ? getCustomerPlanSummary(
        user?.name,
        activePlan.targetGoldGrams,
        activePlan.agreement,
        activePlan,
      )
    : null
  const confirmedCount = summary?.payments.length || 0
  const schedule = activePlan?.legacySchedule
    ? installment.schedule
    : (summary?.payments || []).map((payment, index) => ({
        ...payment,
        n: index + 1,
        due: payment.date,
        status: 'Confirmed',
      }))
  const nextInstallment = activePlan?.legacySchedule
    ? installment.schedule.find((row) => row.status === 'Scheduled')
    : null

  if (!activePlan)
    return (
      <>
        {latestCompleted && (
          <article className="card installment-congratulations" role="status">
            <span className="seal" aria-hidden="true">
              ✓
            </span>
            <div>
              <span className="installment-kicker">100% complete</span>
              <h2>Congratulations, {user?.name}!</h2>
              <p>You completed your gold goal for {latestCompleted.product}.</p>
            </div>
          </article>
        )}
        <article className="card no-plan-card">
          <div className="card-pad">
            <span className={`badge ${pendingPlan ? 'badge-warn' : 'badge-gold'}`}>
              {pendingPlan ? 'Awaiting shop approval' : 'No active plan'}
            </span>
            <h2>
              {pendingPlan
                ? pendingPlan.product
                : completedCount
                  ? 'Start another plan'
                  : "You haven't started an installment plan yet"}
            </h2>
            <p>
              {pendingPlan
                ? `${pendingPlan.shop} will approve or reject your request.`
                : 'Explore jewelry and send a plan request to one of our partner shops.'}
            </p>
            <p className="u-muted">Plans completed: {completedCount}</p>
            {!pendingPlan && (
              <a className="btn btn-gold" href="#/customer/marketplace">
                Explore jewelry
              </a>
            )}
          </div>
        </article>
      </>
    )

  return (
    <>
      {summary.isComplete && (
        <article className="card installment-congratulations" role="status">
          <span className="seal" aria-hidden="true">
            ✓
          </span>
          <div>
            <span className="installment-kicker">Target achieved</span>
            <h2>Congratulations, {user?.name}!</h2>
            <p>
              You now own {summary.goldOwned.toFixed(3)} g of gold and have completed your goal for
              {` ${activePlan.product}`}.
            </p>
          </div>
        </article>
      )}
      <article className="card active-installment-card installment-overview-card">
        <div className="card-head installment-overview-head">
          <div className="installment-title-group">
            <span className="installment-kicker">Your active plan</span>
            <div className="card-title">{activePlan.product}</div>
            <div className="card-sub">
              {activePlan.shop} · {activePlan.purity} gold
            </div>
          </div>
          <span className="badge badge-green">Active Agreement</span>
        </div>
        <div className="card-pad installment-overview-body">
          <div className="installment-metrics">
            <div className="installment-metric">
              <span className="stat-label">Gold target</span>
              <strong>{activePlan.targetGoldGrams.toFixed(2)} g</strong>
              <small>{activePlan.purity} jewelry goal</small>
            </div>
            <div className="installment-metric">
              <span className="stat-label">Confirmed gold</span>
              <strong>{summary.goldOwned.toFixed(3)} g</strong>
              <small>{confirmedCount} payments recorded</small>
            </div>
            <div className="installment-metric">
              <span className="stat-label">Total paid</span>
              <strong>{formatBDT(summary.spent)}</strong>
              <small>Confirmed by your shop</small>
            </div>
          </div>

          <div className="installment-progress-block">
            <div className="u-flex progress-label">
              <span>
                Plan progress <small>by confirmed gold weight</small>
              </span>
              <strong>{summary.progress.toFixed(1)}%</strong>
            </div>
            <div
              className="progress"
              role="progressbar"
              aria-label="Installment plan progress"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={Math.round(summary.progress)}
            >
              <span style={{ width: `${summary.progress}%` }} />
            </div>
            <div className="installment-progress-foot">
              <span>0 g</span>
              <span>{activePlan.targetGoldGrams.toFixed(2)} g target</span>
            </div>
          </div>

          {nextInstallment && (
            <div className="installment-next-due">
              <div>
                <span className="stat-label">Next scheduled installment</span>
                <strong>{nextInstallment.due}</strong>
              </div>
              <div>
                <span className="stat-label">Amount</span>
                <strong>{formatBDT(nextInstallment.amount)}</strong>
              </div>
              <small>Your partner shop records the payment after receiving it directly.</small>
            </div>
          )}
        </div>
      </article>

      <div className="section-h installment-section-head">
        <div>
          <h2>Installment schedule</h2>
          <p className="installment-section-copy">
            A complete record of confirmed and upcoming payments.
          </p>
        </div>
        <span className="badge badge-muted">{schedule.length} recorded / scheduled</span>
      </div>
      <div className="card installment-schedule-card">
        {schedule.length ? (
          <InstallmentTable rows={schedule} />
        ) : (
          <div className="shop-filter-empty">No payments yet. Your plan starts at 0%.</div>
        )}
      </div>
    </>
  )
}
