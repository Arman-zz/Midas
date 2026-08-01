const ACCOUNTS = {
  'customer@midas.bd': {
    password: 'Midas@123',
    role: 'customer',
    name: 'Midas Customer',
    hasActivePlan: true,
  },
  'shop@midas.bd': {
    password: 'Midas@123',
    role: 'shop',
    name: 'Aurelia Jewellers',
    verified: true,
  },
  'admin@midas.bd': { password: 'Midas@123', role: 'admin', name: 'Midas Admin' },
}
export function login(email, password) {
  const account = ACCOUNTS[email?.trim().toLowerCase()]
  if (!account || account.password !== password) throw new Error('Invalid email or password')
  const session = {
    email,
    role: account.role,
    name: account.name,
    hasActivePlan: account.hasActivePlan ?? false,
    verified: account.verified ?? false,
  }
  localStorage.setItem('midas-session', JSON.stringify(session))
  return session
}
export function logout() {
  localStorage.removeItem('midas-session')
}
export function getSession() {
  try {
    return JSON.parse(localStorage.getItem('midas-session') || 'null')
  } catch {
    return null
  }
}
