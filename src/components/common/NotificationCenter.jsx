import { useEffect, useRef, useState } from 'react'
import { Icon } from '../../utils/icons'
import { getPlans } from '../../services/planService'

const roleNotifications = {
  customer: [
    {
      id: 'customer-payment',
      title: 'Payment added to your plan',
      detail: 'Your partner shop recorded a payment and gold conversion.',
      time: 'Today',
      href: '#/customer/installments',
    },
    {
      id: 'customer-due',
      title: 'Installment coming up',
      detail: 'Review your next scheduled installment and current gold progress.',
      time: '1 day ago',
      href: '#/customer/installments',
    },
    {
      id: 'customer-marketplace',
      title: 'New jewelry available',
      detail: 'Verified partner shops have updated their marketplace inventory.',
      time: '2 days ago',
      href: '#/customer/marketplace',
    },
  ],
  shop: [
    {
      id: 'shop-request',
      title: 'Purchase request needs review',
      detail: 'A customer request is waiting for your decision.',
      time: 'Today',
      href: '#/shop/requests',
    },
    {
      id: 'shop-payment',
      title: 'Payment record reminder',
      detail: 'Record received payments with invoice and gold-conversion details.',
      time: 'Today',
      href: '#/shop/installments',
    },
    {
      id: 'shop-stock',
      title: 'Review marketplace stock',
      detail: 'Keep product availability accurate for customer requests.',
      time: '2 days ago',
      href: '#/shop/products',
    },
  ],
  admin: [
    {
      id: 'admin-verification',
      title: 'Check verification queue',
      detail: 'Review pending shop documents before granting partner access.',
      time: 'Today',
      href: '#/admin/shops',
    },
    {
      id: 'admin-integrity',
      title: 'Record integrity check',
      detail: 'Review invoice IDs and stored gold conversions.',
      time: 'Today',
      href: '#/admin/transactions',
    },
    {
      id: 'admin-commission',
      title: 'Commission statement updated',
      detail: 'Recorded payment activity changed platform commission exposure.',
      time: '1 day ago',
      href: '#/admin/commissions',
    },
  ],
}

function initialNotifications(role, storageKey) {
  const completionNotices =
    role === 'shop'
      ? getPlans()
          .filter((plan) => plan.status === 'Completed')
          .map((plan) => ({
            id: `completed-${plan.id}`,
            title: 'Customer installment completed',
            detail: `${plan.customer} reached 100% for ${plan.product}.`,
            time: 'Completed',
            href: '#/shop/installments',
          }))
      : []
  const seeds = [...completionNotices, ...(roleNotifications[role] || [])]
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]')
    const readIds = new Set(saved.filter((item) => item.read).map((item) => item.id))
    return seeds.map((item) => ({ ...item, read: readIds.has(item.id) }))
  } catch {
    return seeds.map((item) => ({ ...item, read: false }))
  }
}

export default function NotificationCenter({ role, accountKey }) {
  const storageKey = `midas-notifications-${role}-${accountKey}`
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(() => initialNotifications(role, storageKey))
  const rootRef = useRef(null)
  const unread = notifications.filter((item) => !item.read).length

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(notifications))
  }, [notifications, storageKey])

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

  const markAllRead = () =>
    setNotifications((current) => current.map((item) => ({ ...item, read: true })))
  const openNotification = (notification) => {
    setNotifications((current) =>
      current.map((item) => (item.id === notification.id ? { ...item, read: true } : item)),
    )
    setOpen(false)
    location.hash = notification.href
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
                className={notification.read ? 'read' : 'unread'}
                type="button"
                key={notification.id}
                onClick={() => openNotification(notification)}
              >
                <span className="notification-status" aria-hidden="true" />
                <span>
                  <b>{notification.title}</b>
                  <small>{notification.detail}</small>
                  <time>{notification.time}</time>
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
