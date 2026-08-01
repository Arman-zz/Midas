import { formatCurrency } from '../../utils/format'
export default function InstallmentTable({ rows = [] }) {
  return (
    <table className="dtable">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Converted Gold</th>
          <th>Gold Rate</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.id || index}>
            <td className="mono installment-number">
              {String(row.n || index + 1).padStart(2, '0')}
            </td>
            <td className="installment-date">{row.due}</td>
            <td className="mono">{formatCurrency(row.amount)}</td>
            <td className="mono">
              {row.goldRate ? `${(row.amount / row.goldRate).toFixed(3)} g` : '—'}
            </td>
            <td className="mono">{row.goldRate ? `${formatCurrency(row.goldRate)}/g` : '—'}</td>
            <td>
              <span
                className={`badge ${row.status === 'Confirmed' ? 'badge-green' : 'badge-muted'}`}
              >
                {row.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
