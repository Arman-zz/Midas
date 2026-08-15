import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth()
  const permitted = !role || user?.role === role
  useEffect(() => {
    if (!loading && role && !user) location.hash = '#/login'
    else if (role && user.role !== role) location.hash = `#/${user.role}/dashboard`
  }, [role, user, loading])
  if (loading)
    return (
      <div className="route-loading" role="status">
        Loading MIDAS…
      </div>
    )
  return permitted ? children : null
}
