import { useMemo, useState } from 'react'
import { formatBDT, requests } from '../../data/appData'
import { useToast } from '../../context/ToastContext'

export default function Requests() {
  const [rows, setRows] = useState(() => requests.map((row) => ({ ...row, status: 'Pending' })))
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [status, setStatus] = useState('all')
  const notify = useToast()
  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return rows.filter(
      (row) =>
        (!needle || `${row.customer} ${row.product}`.toLowerCase().includes(needle)) &&
        (type === 'all' || row.type === type) &&
        (status === 'all' || row.status === status),
    )
  }, [rows, query, type, status])

  const accept = (product) => {
    setRows((current) =>
      current.map((row) => (row.product === product ? { ...row, status: 'Accepted' } : row)),
    )
    notify('Request accepted; agreement created')
  }

  return (
    <>
      <div className="shop-filter-bar">
        <div>
          <h2>Purchase requests</h2>
          <p>{shown.length} requests shown</p>
        </div>
        <div className="shop-filter-controls">
          <input
            className="field"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search customer or jewelry"
            aria-label="Search purchase requests"
          />
          <select
            className="field"
            value={type}
            onChange={(event) => setType(event.target.value)}
            aria-label="Filter by purchase type"
          >
            <option value="all">All types</option>
            <option value="Installment">Installment</option>
            <option value="Direct">Direct</option>
          </select>
          <select
            className="field"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Filter by request status"
          >
            <option value="all">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
          </select>
        </div>
      </div>
      <div className="card shop-filter-table-card">
        <table className="dtable">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Jewelry</th>
              <th>Type</th>
              <th>Value</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((row) => (
              <tr key={row.product}>
                <td className="tname">{row.customer}</td>
                <td>{row.product}</td>
                <td>{row.type}</td>
                <td className="mono">{formatBDT(row.amount)}</td>
                <td>{row.date}</td>
                <td>
                  <span
                    className={`badge ${row.status === 'Accepted' ? 'badge-green' : 'badge-warn'}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-gold btn-sm"
                    disabled={row.status === 'Accepted'}
                    onClick={() => accept(row.product)}
                  >
                    {row.status === 'Accepted' ? 'Accepted' : 'Accept'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!shown.length && (
          <div className="shop-filter-empty">No purchase requests match these filters.</div>
        )}
      </div>
    </>
  )
}
