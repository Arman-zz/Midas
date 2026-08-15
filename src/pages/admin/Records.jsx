import DataTable from '../../components/common/DataTable'
import { formatBDT } from '../../data/appData'
import { readRoute } from '../../routes/routes'
import { useApiResource } from '../../hooks/useApiResource'
import { midasApi } from '../../services/midasApi'

function Agreements({ rows }) {
  return (
    <RecordPage
      title="Agreements"
      description="Customer installment relationships and their accumulated payment progress."
      rows={rows}
      columns={[
        { key: 'id', label: 'Agreement ID', className: 'mono' },
        { key: 'customer', label: 'Customer', className: 'tname' },
        { key: 'product', label: 'Plan / Jewelry' },
        { key: 'payments', label: 'Payments' },
        { key: 'totalPaid', label: 'Total Paid', render: (value) => formatBDT(value) },
        { key: 'gold', label: 'Gold Progress', render: (value) => `${value.toFixed(3)} g` },
        {
          key: 'status',
          label: 'Status',
          render: (value) => <span className="badge badge-green">{value}</span>,
        },
      ]}
    />
  )
}

function Transactions({ rows }) {
  return (
    <RecordPage
      title="Transactions"
      description="Individual invoices recorded by shops. MIDAS records these entries but does not move the payment."
      rows={rows}
      columns={[
        { key: 'invoiceId', label: 'Invoice ID', className: 'mono' },
        { key: 'customer', label: 'Customer', className: 'tname' },
        { key: 'agreement', label: 'Agreement', className: 'mono' },
        { key: 'amount', label: 'Payment', render: (value) => formatBDT(value) },
        { key: 'goldAmount', label: 'Gold Converted', render: (value) => `${value.toFixed(3)} g` },
        { key: 'goldRate', label: 'Applied Rate', render: (value) => `${formatBDT(value)}/g` },
        { key: 'date', label: 'Recorded Date' },
      ]}
    />
  )
}

function Commissions({ report }) {
  const rows = (report.partners || []).map((shop) => ({
    id: `COM-${shop.id}`,
    shop: shop.name,
    qualifyingValue: Number(shop.qualifyingValue),
    rate: 2,
    due: Number(shop.qualifyingValue) * 0.02,
    status: 'Due',
  }))
  return (
    <RecordPage
      title="Commissions"
      description="Platform fees calculated from qualifying shop recorded payment value."
      rows={rows}
      columns={[
        { key: 'id', label: 'Statement ID', className: 'mono' },
        { key: 'shop', label: 'Partner Shop', className: 'tname' },
        { key: 'qualifyingValue', label: 'Qualifying Value', render: (value) => formatBDT(value) },
        { key: 'rate', label: 'Rate', render: (value) => `${value.toFixed(1)}%` },
        { key: 'due', label: 'Commission Due', render: (value) => formatBDT(value) },
        {
          key: 'status',
          label: 'Status',
          render: (value) => <span className="badge badge-warn">{value}</span>,
        },
      ]}
    />
  )
}

function RecordPage({ title, description, rows, columns }) {
  return (
    <>
      <div className="section-h">
        <div>
          <h2>{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <span className="badge badge-muted">{rows.length} records</span>
      </div>
      <DataTable rows={rows} columns={columns} />
    </>
  )
}

export default function Records() {
  const view = readRoute().view
  const { data: report, loading, error } = useApiResource(midasApi.report, [])
  const { data: plans } = useApiResource(midasApi.plans, [])
  if (loading) return <div className="route-loading">Loading records…</div>
  if (error)
    return (
      <div className="notice" role="alert">
        {error}
      </div>
    )
  const payments = (report.payments || []).map((record) => ({
    ...record,
    id: record.invoiceId,
    amount: Number(record.amount),
    goldAmount: Number(record.goldAmount),
    goldRate: Number(record.goldRate),
  }))
  const agreements = (plans || []).map((plan) => ({
    id: plan.agreement || `Pending #${plan.id}`,
    customer: plan.customer,
    product: plan.product,
    payments: payments.filter((item) => item.agreement === plan.agreement).length,
    totalPaid: Number(plan.spent),
    gold: Number(plan.goldOwned),
    status: plan.status,
  }))
  if (view === 'transactions') return <Transactions rows={payments} />
  if (view === 'commissions') return <Commissions report={report} />
  return <Agreements rows={agreements} />
}
