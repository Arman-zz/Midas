import DataTable from '../../components/common/DataTable'
import { useApiResource } from '../../hooks/useApiResource'
import { midasApi } from '../../services/midasApi'
import { useToast } from '../../context/ToastContext'

export default function Shops({ globalSearch = '' }) {
  const { data, loading, error, reload } = useApiResource(midasApi.adminShops, [])
  const notify = useToast()
  const rows = (data || []).filter((shop) =>
    `${shop.name} ${shop.area} ${shop.email}`.toLowerCase().includes(globalSearch.toLowerCase()),
  )
  const decide = async (shop, status) => {
    try {
      await midasApi.decideShop(shop.id, status)
      await reload()
      notify(`Shop ${status}`)
    } catch (decisionError) {
      notify(decisionError.message)
    }
  }
  if (loading) return <div className="route-loading">Loading shops…</div>
  if (error)
    return (
      <div className="notice" role="alert">
        {error}
      </div>
    )
  return (
    <DataTable
      rows={rows}
      columns={[
        { key: 'name', label: 'Partner Shop', className: 'tname' },
        { key: 'area', label: 'Location' },
        { key: 'email', label: 'Account' },
        {
          key: 'verificationStatus',
          label: 'Verification',
          render: (value) => (
            <span className={`badge ${value === 'verified' ? 'badge-green' : 'badge-warn'}`}>
              {value}
            </span>
          ),
        },
      ]}
      renderActions={(shop) =>
        shop.verificationStatus === 'pending' && (
          <div className="u-flex">
            <button className="btn btn-gold btn-sm" onClick={() => decide(shop, 'verified')}>
              Approve
            </button>
            <button className="btn btn-outline btn-sm" onClick={() => decide(shop, 'rejected')}>
              Reject
            </button>
          </div>
        )
      }
    />
  )
}
