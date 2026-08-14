import { Icon } from '../../utils/icons'
import NotificationCenter from './NotificationCenter'
export default function Topbar({
  title,
  subtitle,
  name,
  role,
  accountKey,
  onMenu,
  onLogout,
  onSearch,
}) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((v) => v[0])
    .join('')
    .toUpperCase()
  return (
    <header className="topbar">
      <button className="icon-btn mobile-menu-btn" onClick={onMenu}>
        <Icon name="list" />
      </button>
      <div>
        <div className="topbar-title">{title}</div>
        {subtitle && <div className="topbar-role">{subtitle}</div>}
      </div>
      <label className="search-field">
        <Icon name="search" />
        <input
          type="search"
          aria-label="Search"
          placeholder="Search shops, jewelry, or area"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </label>
      <div className="topbar-spacer" />
      <NotificationCenter role={role} accountKey={accountKey} />
      <div className="profile-chip">
        <div className="avatar">{initials}</div>
        <div className="profile-name">{name}</div>
      </div>
      <button className="btn btn-outline btn-sm logout-button" onClick={onLogout}>
        Log out
      </button>
    </header>
  )
}
