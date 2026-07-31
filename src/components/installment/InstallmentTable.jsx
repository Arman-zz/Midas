import { formatCurrency } from '../../utils/format'
export default function InstallmentTable({ rows = [] }) {
  return <table className="dtable"><thead><tr><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row.id || index}><td>{row.due}</td><td>{formatCurrency(row.amount)}</td><td>{row.status}</td></tr>)}</tbody></table>
}
