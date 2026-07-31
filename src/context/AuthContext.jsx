import { createContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
export const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} })
export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('midas-session', null)
  const value = useMemo(() => ({ user, login: setUser, logout: () => setUser(null) }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
