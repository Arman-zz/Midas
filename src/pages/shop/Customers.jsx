import { useMemo, useState } from 'react'
import { formatBDT, installment, requests } from '../../data/appData'
import PaymentModal from '../../components/installment/PaymentModal'
import { useToast } from '../../context/ToastContext'
import { addPaymentRecord } from '../../services/paymentService'
export default function Customers() {
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const notify = useToast()
  const plans = useMemo(
    () =>
      requests
        .filter((row) => row.type === 'Installment')
        .map((row, index) => ({
          ...row,
          agreement: row.agreement || `AG-2025-${String(481 - index).padStart(4, '0')}`,
          status: 'Active',
        })),
    [],
  )
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
            {shown.map((row, index) => (
              <tr key={row.customer}>
                <td className="tname">{row.customer}</td>
                <td>{row.product}</td>
                <td>{formatBDT(row.amount)}</td>
                <td>{index ? '8.20 g' : `${installment.targetGoldGrams} g`}</td>
                <td>
                  <span
                    className={`badge ${row.status === 'Active' ? 'badge-green' : 'badge-muted'}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-gold btn-sm" onClick={() => setSelected(row)}>
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
        onClose={() => setSelected(null)}
        customer={selected?.customer || ''}
        product={selected?.product || ''}
        defaultAmount={installment.nextAmount}
        defaultGoldRate={installment.currentTrendlineRate}
        onSubmit={(payment) => {
          try {
            addPaymentRecord({
              ...payment,
              agreement: selected.agreement,
              date: new Date(`${payment.date}T00:00:00`).toLocaleDateString('en-BD', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }),
              recordedBy: 'Shop',
            })
            setSelected(null)
            notify(`${formatBDT(payment.amount)} recorded with invoice ${payment.invoiceId}`)
          } catch (error) {
            notify(error.message)
          }
        }}
      />
    </>
  )
}
