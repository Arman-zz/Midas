import { api } from './apiClient'

export const midasApi = {
  products: (query = '') =>
    api(`/products${query ? `?${query}` : ''}`).then((data) => data.products),
  shopProducts: () => api('/products/mine').then((data) => data.products),
  shops: () => api('/shops').then((data) => data.shops),
  plans: () => api('/plans').then((data) => data.plans),
  requestPlan: (productId) => api('/plans', { method: 'POST', body: { productId } }),
  decidePlan: (id, decision) =>
    api(`/plans/${id}/decision`, { method: 'PATCH', body: { decision } }),
  payments: (planId) =>
    api(`/payments${planId ? `?planId=${encodeURIComponent(planId)}` : ''}`).then(
      (data) => data.payments,
    ),
  addPayment: (payment) => api('/payments', { method: 'POST', body: payment }),
  paymentSubmissions: (status = '') =>
    api(`/payment-submissions${status ? `?status=${status}` : ''}`).then(
      (data) => data.submissions,
    ),
  submitPaymentRecord: (planId, invoiceId) =>
    api('/payment-submissions', { method: 'POST', body: { planId, invoiceId } }),
  decidePaymentSubmission: (id, decision) =>
    api(`/payment-submissions/${id}/decision`, { method: 'PATCH', body: decision }),
  listings: () => api('/c2c').then((data) => data.listings),
  addListing: (listing) => api('/c2c', { method: 'POST', body: listing }),
  updateProfile: (profile) => api('/users/me', { method: 'PUT', body: profile }),
  shopProfile: () => api('/shops/me').then((data) => data.shop),
  saveShopProfile: (profile) =>
    api('/shops/me', { method: 'PUT', body: profile }).then((data) => data.shop),
  submitVerification: (documents) =>
    api('/shops/me/verification', { method: 'POST', body: { documents } }),
  addProduct: (product) => api('/products', { method: 'POST', body: product }),
  setProductStock: (id, inStock) =>
    api(`/products/${id}/stock`, { method: 'PATCH', body: { inStock } }),
  adminUsers: () => api('/admin/users').then((data) => data.users),
  adminShops: () => api('/admin/shops').then((data) => data.shops),
  decideShop: (id, status) =>
    api(`/shops/${id}/verification`, { method: 'PATCH', body: { status } }),
  report: () => api('/admin/reports'),
  settings: () => api('/settings').then((data) => data.settings),
  saveSettings: (settings) => api('/settings', { method: 'PUT', body: settings }),
  notifications: () => api('/notifications').then((data) => data.notifications),
  readNotifications: (id) =>
    api('/notifications/read', { method: 'PATCH', body: id ? { id } : {} }),
}
