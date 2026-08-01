import { Icon } from '../../utils/icons'
export default function Sidebar({ role, label, items, active, onClose }) {
  return (
    <aside className="sidebar">
      <a className="back-to-site back-to-site-top" href="#/public/landing">
        ‹ <span>Back to website</span>
      </a>
      <a className="sidebar-brand" href="#/public/landing">
        <div className="brand-mark">
          <Icon name="diamond" />
        </div>
        <div>
          <div className="brand-word">MIDAS</div>
          <div className="brand-context">{label}</div>
        </div>
      </a>
      <nav className="nav-group">
        {items.map((item) => (
          <a
            key={item.id}
            className={`nav-item ${active === item.id ? 'active' : ''}`}
            href={`#/${role}/${item.id}`}
            onClick={onClose}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
            {item.count && <span className="count">{item.count}</span>}
          </a>
        ))}
        <div id="language-switch-slot" className="language-switch-slot" />
      </nav>
      <div className="sidebar-foot">
        <div className="notice">
          <Icon name="help" className="notice-icon" />
          <span>
            <b>Non-custodial.</b> MIDAS records transactions; it never holds or moves your money.
          </span>
        </div>
      </div>
    </aside>
  )
}
