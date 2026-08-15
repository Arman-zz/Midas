import { api, getAccessToken, setAccessToken } from './apiClient'

function saveSession(payload) {
  setAccessToken(payload.token)
  return payload.user
}

export async function login(identity, password) {
  return saveSession(await api('/auth/login', { method: 'POST', body: { identity, password } }))
}

export async function register(details) {
  return saveSession(await api('/auth/register', { method: 'POST', body: details }))
}

export async function getSession() {
  if (!getAccessToken()) return null
  return (await api('/auth/me')).user
}

export function logout() {
  setAccessToken(null)
}
