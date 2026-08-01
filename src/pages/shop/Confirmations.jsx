import { useMemo, useState } from 'react'
import { formatBDT } from '../../data/appData'
import { getPaymentGroups } from '../../services/paymentService'

export default function Confirmations({ globalSearch = '' }) {
  const [query, setQuery] = useState('')
  const groups = useMemo(() => getPaymentGroups(), [])
  const shown = useMemo(() => {
    const needle = (globalSearch || query).trim().toLowerCase()
    return groups.filter(
      (group) =>
        !needle ||
        `${group.customer} ${group.agreement} ${group.product} ${group.payments
          .map((payment) => payment.invoiceId)
          .join(' ')}`
          .toLowerCase()
          .includes(needle),
    )
  }, [groups, query, globalSearch])

  return (
    <>
      <div className="section-h payment-records-head">
        <div>
          <h2>Customer Payment Records</h2>
          <p className="lead">Each customer's invoices are grouped under their agreement.</p>
        </div>
        <span className="badge badge-muted">{shown.length} customers</span>
      </div>
      <input
        className="field confirmation-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search customer, agreement, or invoice ID"
      />

      <div className="payment-group-list">
        {shown.map((group) => {
          const total = group.payments.reduce((sum, payment) => sum + payment.amount, 0)
          return (
            <article
              className="card payment-group-card"
              key={`${group.customer}-${group.agreement}`}
            >
              <div className="card-head payment-group-head">
                <div>
                  <div className="card-title">{group.customer}</div>
                  <div className="card-sub">
                    <span className="mono">{group.agreement}</span> · {group.product}
                  </div>
                </div>
                <div className="payment-group-summary">
                  <span>{group.payments.length} payments</span>
                  <strong>{formatBDT(total)}</strong>
                </div>
              </div>
              <div className="payment-group-table-wrap">
                <table className="dtable">
                  <thead>
                    <tr>
                      <th>Invoice ID</th>
                      <th>Recorded date</th>
                      <th>Amount</th>
                      <th>Gold converted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.payments.map((payment) => (
                      <tr key={payment.id || payment.invoiceId}>
                        <td className="mono">{payment.invoiceId}</td>
                        <td>{payment.date}</td>
                        <td className="mono">{formatBDT(payment.amount)}</td>
                        <td className="mono">
                          <b>{payment.goldAmount.toFixed(3)} g</b>
                          <small className="payment-gold-rate">
                            @ {formatBDT(payment.goldRate)}/g
                          </small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          )
        })}
        {!shown.length && (
          <div className="card shop-filter-empty">
            No customer payment records match your search.
          </div>
        )}
      </div>
    </>
  )
}
