import { cloneElement, useState } from 'react'
import Sidebar from '../components/common/Sidebar'
import Topbar from '../components/common/Topbar'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../context/ToastContext'

export default function WorkspaceLayout({ children, role, label, items, active, title, subtitle }) {
  const [search, setSearch] = useState('')
  const { user, logout } = useAuth()
  const notify = useToast()
  const close = () => document.body.classList.remove('sidebar-open')
  const signOut = () => {
    logout()
    close()
    location.hash = '#/public/landing'
    notify('You have been logged out')
  }
  return (
    <div className="shell">
      <button className="sidebar-backdrop" aria-label="Close navigation" onClick={close} />
      <Sidebar role={role} label={label} items={items} active={active} onClose={close} />
      <div className="main">
        <Topbar
          key={user?.id || user?.email || role}
          title={title}
          subtitle={subtitle}
          name={user?.name || label}
          email={user?.email || ''}
          role={role}
          accountKey={user?.email || user?.name || role}
          onMenu={() => document.body.classList.toggle('sidebar-open')}
          onLogout={signOut}
          onSearch={setSearch}
        />
        <main className="content">{cloneElement(children, { globalSearch: search })}</main>
      </div>
    </div>
  )
}
