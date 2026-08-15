import WorkspaceLayout from './WorkspaceLayout'
import { readRoute } from '../routes/routes'
import { useAuth } from '../hooks/useAuth'
const items = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'profile', label: 'Shop Profile', icon: 'store' },
  { id: 'products', label: 'Products', icon: 'bag' },
  { id: 'requests', label: 'Purchase Requests', icon: 'doc' },
  { id: 'installments', label: 'Installments', icon: 'calendar' },
  { id: 'confirmations', label: 'Payment Records', icon: 'check' },
  { id: 'commissions', label: 'Commission Statements', icon: 'percent' },
  { id: 'insights', label: 'AI Insights', icon: 'list' },
]
export default function ShopLayout({ children }) {
  const { user } = useAuth()
  const verified = user?.verified === true
  const visibleItems = verified ? items : items.filter((item) => item.id === 'profile')
  const active = verified ? readRoute().view || 'dashboard' : 'profile'
  return (
    <WorkspaceLayout
      role="shop"
      label="Partner Workspace"
      items={visibleItems}
      active={active}
      title={visibleItems.find((i) => i.id === active)?.label || 'Shop Profile'}
      subtitle={verified ? 'Verified MIDAS Partner' : 'Verification required'}
    >
      {children}
    </WorkspaceLayout>
  )
}
