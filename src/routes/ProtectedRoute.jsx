import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth()
  const permitted = !role || !user || user.role === role
  return <div data-protected-route={permitted ? 'allowed' : 'demo-preview'}>{children}</div>
}
