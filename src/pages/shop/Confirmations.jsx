import { useMemo, useState } from 'react'
import { confirmations, formatBDT } from '../../data/appData'
import { useToast } from '../../context/ToastContext'
export default function Confirmations({ globalSearch = '' }) {
  const [query, setQuery] = useState('')
  const [rows, setRows] = useState(confirmations)
  const notify = useToast()
  const shown = useMemo(
    () =>
      rows.filter((r) =>
        `${r.customer} ${r.agreement}`
          .toLowerCase()
          .includes((globalSearch || query).toLowerCase()),
      ),
    [rows, query, globalSearch],
  )
  const action = (agreement, status) => {
    setRows((v) => v.filter((r) => r.agreement !== agreement))
    notify(`Payment ${status}`)
  }
  return (
    <>
      <div className="section-h">
        <div>
          <h2>Payment Confirmations</h2>
          <p className="lead">Search for a customer or agreement, then verify receipt.</p>
        </div>
      </div>
      <input
        className="field confirmation-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search person or agreement number"
      />
      <div className="card">
        <table className="dtable">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Agreement</th>
              <th>Amount</th>
              <th>Submitted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((row) => (
              <tr key={row.agreement}>
                <td className="tname">{row.customer}</td>
                <td className="mono">{row.agreement}</td>
                <td className="mono">{formatBDT(row.amount)}</td>
                <td className="tmeta">{row.date}</td>
                <td>
                  <button
                    className="btn btn-gold btn-sm"
                    onClick={() => action(row.agreement, 'confirmed')}
                  >
                    Confirm
                  </button>{' '}
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => action(row.agreement, 'rejected')}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
