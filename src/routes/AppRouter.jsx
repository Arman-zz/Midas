import { Fragment, useEffect, useState } from 'react'
import { readRoute } from './routes'
import ProtectedRoute from './ProtectedRoute'
import PublicLayout from '../layouts/PublicLayout'
import CustomerLayout from '../layouts/CustomerLayout'
import ShopLayout from '../layouts/ShopLayout'
import AdminLayout from '../layouts/AdminLayout'
import LandingPage from '../pages/public/LandingPage'
import MarketplacePage from '../pages/public/MarketplacePage'
import HowItWorks from '../pages/public/HowItWorks'
import Partner from '../pages/public/Partner'
import Help from '../pages/public/Help'
import Legal from '../pages/public/Legal'
import About from '../pages/public/About'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import CustomerDashboard from '../pages/customer/Dashboard'
import CustomerMarketplace from '../pages/customer/Marketplace'
import Shops from '../pages/customer/Shops'
import Installments from '../pages/customer/Installments'
import C2C from '../pages/customer/C2C'
import Settings from '../pages/customer/Settings'
import ShopDashboard from '../pages/shop/Dashboard'
import Products from '../pages/shop/Products'
import Customers from '../pages/shop/Customers'
import ShopProfile from '../pages/shop/Profile'
import Requests from '../pages/shop/Requests'
import Confirmations from '../pages/shop/Confirmations'
import Commissions from '../pages/shop/Commissions'
import ShopReports from '../pages/shop/Reports'
import AdminDashboard from '../pages/admin/Dashboard'
import Users from '../pages/admin/Users'
import AdminShops from '../pages/admin/Shops'
import Reports from '../pages/admin/Reports'
import AdminProducts from '../pages/admin/Products'
import Records from '../pages/admin/Records'
import AdminSettings from '../pages/admin/Settings'

const publicPages = {
  landing: LandingPage,
  marketplace: MarketplacePage,
  'how-it-works': HowItWorks,
  partner: Partner,
  help: Help,
  legal: Legal,
  about: About,
  c2c: MarketplacePage,
}
const customerPages = {
  dashboard: CustomerDashboard,
  marketplace: CustomerMarketplace,
  shops: Shops,
  installments: Installments,
  c2c: C2C,
  settings: Settings,
}
const shopPages = {
  dashboard: ShopDashboard,
  products: Products,
  customers: Customers,
  profile: ShopProfile,
  requests: Requests,
  installments: Customers,
  confirmations: Confirmations,
  commissions: Commissions,
  reports: ShopReports,
}
const adminPages = {
  dashboard: AdminDashboard,
  users: Users,
  shops: AdminShops,
  products: AdminProducts,
  agreements: Records,
  transactions: Records,
  commissions: Records,
  reports: Reports,
  settings: AdminSettings,
}

export default function AppRouter() {
  const [route, setRoute] = useState(() => readRoute())

  useEffect(() => {
    const update = () => setRoute(readRoute())
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  let Screen = LandingPage
  let Layout = PublicLayout
  if (route.role === 'login') {
    Layout = Fragment
    Screen = Login
  } else if (route.role === 'register') {
    Layout = Fragment
    Screen = Register
  } else if (route.role === 'customer') {
    Layout = CustomerLayout
    Screen = customerPages[route.view] || CustomerDashboard
  } else if (route.role === 'shop') {
    Layout = ShopLayout
    Screen = shopPages[route.view] || ShopDashboard
  } else if (route.role === 'admin') {
    Layout = AdminLayout
    Screen = adminPages[route.view] || AdminDashboard
  } else Screen = publicPages[route.view] || LandingPage

  return (
    <ProtectedRoute role={['customer', 'shop', 'admin'].includes(route.role) ? route.role : null}>
      <Layout>
        <Screen />
      </Layout>
    </ProtectedRoute>
  )
}
