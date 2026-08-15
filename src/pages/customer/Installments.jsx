import { useState } from 'react'
import InstallmentTable from '../../components/installment/InstallmentTable'
import PaymentSubmissionModal from '../../components/installment/PaymentSubmissionModal'
import { formatBDT, installment } from '../../data/appData'
import { useAuth } from '../../hooks/useAuth'
import { usePlans } from '../../hooks/usePlans'
import { useApiResource } from '../../hooks/useApiResource'
import { midasApi } from '../../services/midasApi'

export default function Installments() {
  const [submissionOpen, setSubmissionOpen] = useState(false)
  const { user } = useAuth()
  const { plans, loading, error } = usePlans()
  const submissionResource = useApiResource(midasApi.paymentSubmissions, [])
  const submissions = submissionResource.data || []
  const activePlan = plans.find((plan) => plan.status === 'Active')
  const pendingPlan = plans.find((plan) => plan.status === 'Pending')
  const completedCount = plans.filter((plan) => plan.status === 'Completed').length
  const latestCompleted = plans.find((plan) => plan.status === 'Completed')
  const summary = activePlan
    ? {
        payments: [],
        goldOwned: activePlan.goldOwned,
        spent: activePlan.spent,
        progress: activePlan.progress,
        isComplete: activePlan.progress >= 100,
      }
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

  if (loading) return <div className="route-loading">Loading plans…</div>
  if (error)
    return (
      <div className="notice" role="alert">
        {error}
      </div>
    )
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
          <div className="installment-next-due">
            <div>
              <span className="stat-label">Paid directly at the shop?</span>
              <strong>Apply to add the payment to your record</strong>
            </div>
            <small>The shop must verify your invoice before your gold progress increases.</small>
            <button className="btn btn-gold" type="button" onClick={() => setSubmissionOpen(true)}>
              Apply for payment record
            </button>
          </div>
        </div>
      </article>

      <div className="section-h installment-section-head">
        <div>
          <h2>Payment record applications</h2>
          <p className="installment-section-copy">Invoices you submitted for shop verification.</p>
        </div>
      </div>
      <div className="card installment-schedule-card">
        {submissions.length ? (
          <table className="dtable">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Shop response</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="mono">{submission.invoiceId}</td>
                  <td>{new Date(submission.submittedAt).toLocaleDateString('en-BD')}</td>
                  <td>
                    <span
                      className={`badge ${submission.status === 'approved' ? 'badge-green' : submission.status === 'pending' ? 'badge-warn' : 'badge-muted'}`}
                    >
                      {submission.status}
                    </span>
                  </td>
                  <td>
                    {submission.rejectionReason ||
                      (submission.status === 'pending'
                        ? 'Awaiting shop review'
                        : 'Payment added to your record')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="shop-filter-empty">No payment record applications yet.</div>
        )}
        {submissionResource.error && (
          <div className="notice" role="alert">
            {submissionResource.error}
          </div>
        )}
      </div>

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
      <PaymentSubmissionModal
        open={submissionOpen}
        onClose={() => setSubmissionOpen(false)}
        plan={activePlan}
        onSubmitted={submissionResource.reload}
      />
    </>
  )
}
