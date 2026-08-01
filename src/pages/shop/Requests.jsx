import { formatBDT, requests } from '../../data/appData'
import { useToast } from '../../context/ToastContext'
export default function Requests() {
  const notify = useToast()
  return (
    <div className="card">
      <table className="dtable">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Jewelry</th>
            <th>Type</th>
            <th>Value</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((row) => (
            <tr key={row.product}>
              <td className="tname">{row.customer}</td>
              <td>{row.product}</td>
              <td>{row.type}</td>
              <td className="mono">{formatBDT(row.amount)}</td>
              <td>{row.date}</td>
              <td>
                <button
                  className="btn btn-gold btn-sm"
                  onClick={() => notify('Request accepted; agreement created')}
                >
                  Accept
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
