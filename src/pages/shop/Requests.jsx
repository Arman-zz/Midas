import { useMemo, useState } from 'react'
import { formatBDT } from '../../data/appData'
import { useToast } from '../../context/ToastContext'
import { decidePlanRequest, getPlans } from '../../services/planService'
import { usePlans } from '../../hooks/usePlans'

export default function Requests() {
  usePlans()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const notify = useToast()
  const rows = getPlans().filter((plan) => plan.requestedAt && !plan.legacySchedule)
  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return rows.filter(
      (row) =>
        (!needle || `${row.customer} ${row.product} ${row.shop}`.toLowerCase().includes(needle)) &&
        (status === 'all' || row.status === status),
    )
  }, [rows, query, status])

  const decide = (id, decision) => {
    try {
      decidePlanRequest(id, decision)
      notify(
        decision === 'Approved' ? 'Plan approved; it is now active at 0%' : 'Plan request rejected',
      )
    } catch (error) {
      notify(error.message)
    }
  }

  return (
    <>
      <div className="shop-filter-bar">
        <div>
          <h2>Installment requests</h2>
          <p>{shown.length} requests shown</p>
        </div>
        <div className="shop-filter-controls">
          <input
            className="field"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search customer or jewelry"
            aria-label="Search installment requests"
          />
          <select
            className="field"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Filter by request status"
          >
            <option value="all">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Active">Approved</option>
            <option value="Rejected">Rejected</option>
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
              <th>Target</th>
              <th>Value</th>
              <th>Status</th>
              <th>Decision</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((row) => (
              <tr key={row.id}>
                <td className="tname">{row.customer}</td>
                <td>
                  {row.product}
                  <small className="payment-gold-rate">{row.shop}</small>
                </td>
                <td>
                  {row.targetGoldGrams.toFixed(2)} g {row.purity}
                </td>
                <td className="mono">{formatBDT(row.amount)}</td>
                <td>
                  <span
                    className={`badge ${row.status === 'Active' || row.status === 'Completed' ? 'badge-green' : row.status === 'Pending' ? 'badge-warn' : 'badge-muted'}`}
                  >
                    {row.status === 'Active' ? 'Approved' : row.status}
                  </span>
                </td>
                <td>
                  {row.status === 'Pending' ? (
                    <div className="u-flex">
                      <button
                        className="btn btn-gold btn-sm"
                        onClick={() => decide(row.id, 'Approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => decide(row.id, 'Rejected')}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="u-muted">Decision recorded</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!shown.length && (
          <div className="shop-filter-empty">No installment requests match these filters.</div>
        )}
      </div>
    </>
  )
}
