export const ROUTES = {
  public: {
    landing: '#/public/landing',
    marketplace: '#/public/marketplace',
    howItWorks: '#/public/how-it-works',
    partner: '#/public/partner',
    about: '#/public/about',
    help: '#/public/help',
    legal: '#/public/legal',
  },
  auth: { login: '#/login', register: '#/register' },
  customer: {
    dashboard: '#/customer/dashboard',
    marketplace: '#/customer/marketplace',
    shops: '#/customer/shops',
    installments: '#/customer/installments',
    c2c: '#/customer/c2c',
    settings: '#/customer/settings',
  },
  shop: {
    dashboard: '#/shop/dashboard',
    products: '#/shop/products',
    customers: '#/shop/customers',
  },
  admin: {
    dashboard: '#/admin/dashboard',
    users: '#/admin/users',
    shops: '#/admin/shops',
    reports: '#/admin/reports',
  },
}

export function readRoute(hash = window.location.hash) {
  const [role = 'public', view = 'landing'] = hash.replace(/^#\//, '').split('/')
  return { role, view }
}
