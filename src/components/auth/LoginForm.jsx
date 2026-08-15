import { useRef, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../context/ToastContext'

export default function LoginForm() {
  const rememberedIdentity = localStorage.getItem('midas-remembered-identity') || ''
  const [identity, setIdentity] = useState(rememberedIdentity)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(Boolean(rememberedIdentity))
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const passwordRef = useRef(null)
  const { login } = useAuth()
  const notify = useToast()
  const submit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const normalizedIdentity = form.get('identity').trim()
    const next = {}
    if (!normalizedIdentity) next.identity = 'Enter your email or mobile number.'
    if (password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (Object.keys(next).length) return setErrors(next)
    try {
      setSubmitting(true)
      const session = await login(normalizedIdentity, password)
      if (remember) localStorage.setItem('midas-remembered-identity', normalizedIdentity)
      else localStorage.removeItem('midas-remembered-identity')
      location.hash =
        session.role === 'customer' && !session.profileComplete
          ? '#/customer/settings'
          : `#/${session.role}/dashboard`
      notify(`Welcome back, ${session.name}`)
    } catch (err) {
      setErrors({ identity: err.message })
      setPassword('')
      requestAnimationFrame(() => passwordRef.current?.focus())
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <form className="auth-card" onSubmit={submit} noValidate>
      <a className="auth-mobile-brand brand-home-link" href="#/public/landing">
        ◇<span>MIDAS</span>
      </a>
      <span className="auth-form-kicker">Secure account access</span>
      <h2>Welcome back</h2>
      <p className="auth-form-intro">Log in to explore jewelry and manage your gold agreements.</p>
      <div className="field-row">
        <label className="field-label" htmlFor="login-identity">
          Mobile number or email
        </label>
        <input
          className="field"
          id="login-identity"
          name="identity"
          value={identity}
          onChange={(event) => {
            setIdentity(event.target.value)
            if (errors.identity) setErrors((current) => ({ ...current, identity: '' }))
          }}
          onFocus={(event) => event.target.select()}
          autoComplete="username"
          placeholder="e.g. customer@midas.bd"
        />
        <div className="field-error">{errors.identity}</div>
      </div>
      <div className="field-row">
        <label className="field-label" htmlFor="login-password">
          Password
        </label>
        <div className="password-field-control">
          <input
            className="field"
            id="login-password"
            name="password"
            ref={passwordRef}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              if (errors.password) setErrors((current) => ({ ...current, password: '' }))
            }}
            onFocus={(event) => event.target.select()}
            autoComplete="current-password"
            placeholder="••••••••"
          />
          <button
            className="password-visibility-toggle"
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className="field-error">{errors.password}</div>
      </div>
      <div className="auth-form-options">
        <label>
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />{' '}
          Remember me
        </label>
        <button
          className="text-button"
          type="button"
          onClick={() =>
            notify('Password recovery instructions will be sent to your registered contact')
          }
        >
          Forgot password?
        </button>
      </div>
      <button className="btn btn-gold btn-block auth-submit" type="submit" disabled={submitting}>
        {submitting ? 'Logging in…' : 'Log in'} <span>→</span>
      </button>
      {import.meta.env.DEV && (
        <div className="login-hint">
          Demo: customer@midas.bd, shop@midas.bd, or admin@midas.bd · Password: Midas@123
        </div>
      )}
      <div className="auth-divider">
        <span>New to MIDAS?</span>
      </div>
      <a className="auth-create" href="#/register">
        Create your account
      </a>
      <p className="auth-legal">
        By continuing, you agree to MIDAS's <a href="#/public/legal">Terms</a> and{' '}
        <a href="#/public/legal">Privacy Policy</a>.
      </p>
    </form>
  )
}
