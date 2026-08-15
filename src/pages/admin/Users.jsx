import DataTable from '../../components/common/DataTable'
import { useApiResource } from '../../hooks/useApiResource'
import { midasApi } from '../../services/midasApi'

export default function Users({ globalSearch = '' }) {
  const { data, loading, error } = useApiResource(midasApi.adminUsers, [])
  const rows = (data || []).filter((row) =>
    Object.values(row).join(' ').toLowerCase().includes(globalSearch.toLowerCase()),
  )
  if (loading) return <div className="route-loading">Loading users…</div>
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
        { key: 'name', label: 'User', className: 'tname' },
        { key: 'email', label: 'Email' },
        { key: 'mobile', label: 'Mobile' },
        { key: 'role', label: 'Role' },
        {
          key: 'createdAt',
          label: 'Joined',
          render: (value) => new Date(value).toLocaleDateString(),
        },
      ]}
    />
  )
}
