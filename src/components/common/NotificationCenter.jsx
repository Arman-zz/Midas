import { useEffect, useRef, useState } from 'react'
import { Icon } from '../../utils/icons'
import { midasApi } from '../../services/midasApi'
import { useApiResource } from '../../hooks/useApiResource'

export default function NotificationCenter() {
  const [open, setOpen] = useState(false)
  const { data, setData, reload } = useApiResource(midasApi.notifications, [])
  const notifications = data || []
  const rootRef = useRef(null)
  const unread = notifications.filter((item) => !item.readAt).length

  useEffect(() => {
    const closeOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const markAllRead = async () => {
    await midasApi.readNotifications()
    await reload()
  }
  const openNotification = async (notification) => {
    await midasApi.readNotifications(notification.id)
    setData((current) =>
      current.map((item) =>
        item.id === notification.id ? { ...item, readAt: new Date().toISOString() } : item,
      ),
    )
    setOpen(false)
    location.hash = `#${notification.href}`
  }

  return (
    <div className="notification-center" ref={rootRef}>
      <button
        className={`icon-btn notification-trigger ${open ? 'active' : ''}`}
        type="button"
        aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name="bell" />
        {unread > 0 && <span className="dot-badge">{unread}</span>}
      </button>
      {open && (
        <section className="notification-panel" aria-label="Notifications">
          <div className="notification-panel-head">
            <div>
              <b>Notifications</b>
              <small>{unread ? `${unread} unread` : 'You are all caught up'}</small>
            </div>
            {unread > 0 && (
              <button type="button" onClick={markAllRead}>
                Mark all read
              </button>
            )}
          </div>
          <div className="notification-list">
            {notifications.map((notification) => (
              <button
                className={notification.readAt ? 'read' : 'unread'}
                type="button"
                key={notification.id}
                onClick={() => openNotification(notification)}
              >
                <span className="notification-status" aria-hidden="true" />
                <span>
                  <b>{notification.title}</b>
                  <small>{notification.detail}</small>
                  <time>{new Date(notification.createdAt).toLocaleDateString()}</time>
                </span>
              </button>
            ))}
          </div>
          {!notifications.length && <div className="notification-empty">No notifications.</div>}
        </section>
      )}
    </div>
  )
}
