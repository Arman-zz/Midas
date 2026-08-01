import DataTable from '../../components/common/DataTable'
import { formatBDT } from '../../data/appData'
const agreements = [
  {
    id: 'AG-2026-0481',
    parties: 'Midas Customer · Diamond Plaza',
    type: 'Active agreement',
    amount: 125000,
    status: 'Active',
  },
  {
    id: 'AG-2026-0476',
    parties: 'Rahman Khan · Diamond World',
    type: 'Installment',
    amount: 78000,
    status: 'Active',
  },
]
export default function Records({ kind = 'Agreements' }) {
  return (
    <>
      <div className="section-h">
        <div>
          <h2>{kind}</h2>
          <p className="lead">
            Platform records are shown separately from direct payment movement.
          </p>
        </div>
      </div>
      <DataTable
        rows={agreements}
        columns={[
          { key: 'id', label: 'Record ID', className: 'mono' },
          { key: 'parties', label: 'Parties' },
          { key: 'type', label: 'Type' },
          { key: 'amount', label: 'Amount', render: (v) => formatBDT(v) },
          {
            key: 'status',
            label: 'Status',
            render: (v) => <span className="badge badge-green">{v}</span>,
          },
        ]}
      />
    </>
  )
}
