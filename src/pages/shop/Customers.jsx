import { useMemo, useState } from 'react'
import { formatBDT, installment } from '../../data/appData'
import PaymentModal from '../../components/installment/PaymentModal'
import { useToast } from '../../context/ToastContext'
import { midasApi } from '../../services/midasApi'
import { usePlans } from '../../hooks/usePlans'
import { useApiResource } from '../../hooks/useApiResource'
export default function Customers() {
  const { plans: allPlans, reload } = usePlans()
  const [selected, setSelected] = useState(null)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const notify = useToast()
  const submissionResource = useApiResource(() => midasApi.paymentSubmissions('pending'), [])
  const pendingSubmissions = submissionResource.data || []
  const plans = allPlans.filter((row) => ['Active', 'Completed'].includes(row.status))
  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return plans.filter(
      (row) =>
        (!needle || `${row.customer} ${row.product}`.toLowerCase().includes(needle)) &&
        (status === 'all' || row.status === status),
    )
  }, [plans, query, status])

  return (
    <>
      <div className="section-h">
        <div>
          <h2>Payment records awaiting approval</h2>
          <p className="lead">Verify each customer invoice before adding it to gold progress.</p>
        </div>
        <span className="badge badge-warn">{pendingSubmissions.length} pending</span>
      </div>
      <div className="card shop-filter-table-card">
        <table className="dtable">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Invoice ID</th>
              <th>Agreement</th>
              <th>Product</th>
              <th>Submitted</th>
              <th>Decision</th>
            </tr>
          </thead>
          <tbody>
            {pendingSubmissions.map((submission) => (
              <tr key={submission.id}>
                <td className="tname">{submission.customer}</td>
                <td className="mono">{submission.invoiceId}</td>
                <td className="mono">{submission.agreement}</td>
                <td>{submission.product}</td>
                <td>{new Date(submission.submittedAt).toLocaleDateString('en-BD')}</td>
                <td>
                  <div className="u-flex">
                    <button
                      className="btn btn-gold btn-sm"
                      onClick={() => {
                        setSelected(
                          allPlans.find((plan) => plan.id === Number(submission.planId)) || null,
                        )
                        setSelectedSubmission(submission)
                      }}
                    >
                      Review & approve
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={async () => {
                        const reason = window.prompt(
                          'Reason for rejecting this invoice (shown to the customer):',
                          'Invoice could not be verified.',
                        )
                        if (reason === null) return
                        try {
                          await midasApi.decidePaymentSubmission(submission.id, {
                            decision: 'rejected',
                            reason,
                          })
                          await submissionResource.reload()
                          notify(`Invoice ${submission.invoiceId} rejected`)
                        } catch (error) {
                          notify(error.message)
                        }
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!pendingSubmissions.length && (
          <div className="shop-filter-empty">No payment records are waiting for review.</div>
        )}
        {submissionResource.error && (
          <div className="notice" role="alert">
            {submissionResource.error}
          </div>
        )}
      </div>
      <div className="shop-filter-bar">
        <div>
          <h2>Customer installments</h2>
          <p>{shown.length} plans shown</p>
        </div>
        <div className="shop-filter-controls">
          <input
            className="field"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search customer or jewelry"
            aria-label="Search installment plans"
          />
          <select
            className="field"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Filter by plan status"
          >
            <option value="all">All statuses</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="card shop-filter-table-card">
        <table className="dtable">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Jewelry</th>
              <th>Plan</th>
              <th>Target</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((row) => (
              <tr key={row.customer}>
                <td className="tname">{row.customer}</td>
                <td>{row.product}</td>
                <td>{formatBDT(row.amount)}</td>
                <td>{row.targetGoldGrams.toFixed(2)} g</td>
                <td>
                  <span
                    className={`badge ${row.status === 'Active' ? 'badge-green' : 'badge-muted'}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-gold btn-sm"
                    disabled={row.status !== 'Active'}
                    onClick={() => setSelected(row)}
                  >
                    Record payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!shown.length && (
          <div className="shop-filter-empty">No installment plans match these filters.</div>
        )}
      </div>
      <PaymentModal
        open={Boolean(selected)}
        onClose={() => {
          setSelected(null)
          setSelectedSubmission(null)
        }}
        customer={selected?.customer || ''}
        product={selected?.product || ''}
        defaultAmount={installment.nextAmount}
        defaultGoldRate={installment.currentTrendlineRate}
        defaultInvoiceId={selectedSubmission?.invoiceId || ''}
        invoiceReadOnly={Boolean(selectedSubmission)}
        onSubmit={async (payment) => {
          try {
            if (selectedSubmission) {
              await midasApi.decidePaymentSubmission(selectedSubmission.id, {
                decision: 'approved',
                ...payment,
              })
              await submissionResource.reload()
            } else {
              await midasApi.addPayment({ ...payment, planId: selected.id })
            }
            await reload()
            setSelected(null)
            setSelectedSubmission(null)
            notify(`${formatBDT(payment.amount)} recorded with invoice ${payment.invoiceId}`)
          } catch (error) {
            notify(error.message)
          }
        }}
      />
    </>
  )
}
