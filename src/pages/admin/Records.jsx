import DataTable from '../../components/common/DataTable'
import { formatBDT, shops } from '../../data/appData'
import { readRoute } from '../../routes/routes'
import { getPaymentGroups, getPaymentRecords } from '../../services/paymentService'

function Agreements() {
  const rows = getPaymentGroups().map((group) => ({
    id: group.agreement,
    customer: group.customer,
    product: group.product,
    payments: group.payments.length,
    totalPaid: group.payments.reduce((sum, payment) => sum + payment.amount, 0),
    gold: group.payments.reduce((sum, payment) => sum + payment.goldAmount, 0),
    status: 'Active',
  }))
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

function Transactions() {
  const rows = getPaymentRecords().map((record) => ({
    ...record,
    id: record.id || record.invoiceId,
  }))
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

function Commissions() {
  const paymentValue = getPaymentRecords().reduce((sum, record) => sum + record.amount, 0)
  const rows = [
    {
      id: 'COM-SH-01',
      shop: shops[0].name,
      qualifyingValue: paymentValue,
      rate: 2,
      due: paymentValue * 0.02,
      status: 'Due',
    },
  ]
  return (
    <RecordPage
      title="Commissions"
      description="Platform fees calculated from qualifying shop-recorded payment value."
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
  if (view === 'transactions') return <Transactions />
  if (view === 'commissions') return <Commissions />
  return <Agreements />
}
