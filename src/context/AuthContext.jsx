import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import * as auth from '../services/authService'

export const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  refreshSession: async () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshSession = useCallback(async () => {
    try {
      setUser(await auth.getSession())
    } catch {
      auth.logout()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshSession()
  }, [refreshSession])

  const login = useCallback(async (identity, password) => {
    const session = await auth.login(identity, password)
    setUser(session)
    return session
  }, [])

  const register = useCallback(async (details) => {
    const session = await auth.register(details)
    setUser(session)
    return session
  }, [])

  const logout = useCallback(() => {
    auth.logout()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, register, logout, refreshSession }),
    [user, loading, login, register, logout, refreshSession],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
