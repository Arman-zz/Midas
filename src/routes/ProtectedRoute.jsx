import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth()
  const permitted = !role || user?.role === role
  useEffect(()=>{if(role&&!user)location.hash='#/login';else if(role&&user.role!==role)location.hash=`#/${user.role}/dashboard`},[role,user])
  return permitted ? children : null
}
