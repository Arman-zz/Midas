import InstallmentTable from '../../components/installment/InstallmentTable'
import { formatBDT, installment, installmentSummary } from '../../data/appData'
import { useAuth } from '../../hooks/useAuth'

export default function Installments() {
  const { user } = useAuth()
  const hasActivePlan =
    user?.hasActivePlan === true || user?.email?.toLowerCase() === 'customer@midas.bd'
  const summary = installmentSummary()
  const confirmedCount = installment.schedule.filter((row) => row.status === 'Confirmed').length
  const nextInstallment = installment.schedule.find((row) => row.status === 'Scheduled')

  if (!hasActivePlan)
    return (
      <article className="card no-plan-card">
        <div className="card-pad">
          <span className="badge badge-gold">No active plan</span>
          <h2>You haven't started an installment plan yet</h2>
          <p>Explore jewelry and send a plan request to one of our partner shops.</p>
          <a className="btn btn-gold" href="#/customer/marketplace">
            Explore jewelry
          </a>
        </div>
      </article>
    )

  return (
    <>
      <article className="card active-installment-card installment-overview-card">
        <div className="card-head installment-overview-head">
          <div className="installment-title-group">
            <span className="installment-kicker">Your active plan</span>
            <div className="card-title">{installment.product}</div>
            <div className="card-sub">
              {installment.shop} · {installment.purity} gold
            </div>
          </div>
          <span className="badge badge-green">Active Agreement</span>
        </div>
        <div className="card-pad installment-overview-body">
          <div className="installment-metrics">
            <div className="installment-metric">
              <span className="stat-label">Gold target</span>
              <strong>{installment.targetGoldGrams.toFixed(2)} g</strong>
              <small>{installment.purity} jewelry goal</small>
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
              <span>{installment.targetGoldGrams.toFixed(2)} g target</span>
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
        <span className="badge badge-muted">{installment.schedule.length} installments</span>
      </div>
      <div className="card installment-schedule-card">
        <InstallmentTable rows={installment.schedule} />
      </div>
    </>
  )
}
