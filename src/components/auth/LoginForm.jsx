import { useState } from 'react'
import { login as authenticate } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../context/ToastContext'

export default function LoginForm() {
  const [errors, setErrors] = useState({})
  const { login } = useAuth()
  const notify = useToast()
  const submit = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const identity = form.get('identity').trim()
    const password = form.get('password')
    const next = {}
    if (!identity) next.identity = 'Enter your email or mobile number.'
    if (password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (Object.keys(next).length) return setErrors(next)
    try {
      const session = authenticate(identity, password)
      login(session)
      location.hash = `#/${session.role}/dashboard`
      notify(`Welcome back, ${session.name}`)
    } catch (err) {
      setErrors({ identity: err.message })
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
          autoComplete="username"
          placeholder="e.g. customer@midas.bd"
        />
        <div className="field-error">{errors.identity}</div>
      </div>
      <div className="field-row">
        <label className="field-label" htmlFor="login-password">
          Password
        </label>
        <input
          className="field"
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
        />
        <div className="field-error">{errors.password}</div>
      </div>
      <div className="auth-form-options">
        <label>
          <input type="checkbox" /> Remember me
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
      <button className="btn btn-gold btn-block auth-submit" type="submit">
        Log in <span>→</span>
      </button>
      <div className="login-hint">
        Demo: customer@midas.bd, shop@midas.bd, or admin@midas.bd · Password: Midas@123
      </div>
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
