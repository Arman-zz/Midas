import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../context/ToastContext'
export default function RegisterForm() {
  const [role, setRole] = useState('customer')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { register } = useAuth()
  const notify = useToast()
  const submit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setError('')
    setSubmitting(true)
    try {
      await register({ ...data, role })
      location.hash = role === 'customer' ? '#/customer/settings' : `#/${role}/dashboard`
      notify('Your MIDAS account is ready')
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <form className="auth-card" onSubmit={submit}>
      <h2>Create account</h2>
      <p className="auth-form-intro">Join MIDAS as a customer or partner shop.</p>
      <div className="tabbar field-row">
        <button
          type="button"
          className={role === 'customer' ? 'active' : ''}
          onClick={() => setRole('customer')}
        >
          Customer
        </button>
        <button
          type="button"
          className={role === 'shop' ? 'active' : ''}
          onClick={() => setRole('shop')}
        >
          Shop Owner
        </button>
      </div>
      <div className="field-row">
        <label className="field-label">Full name</label>
        <input className="field" name="name" required />
      </div>
      <div className="field-row">
        <label className="field-label">Email</label>
        <input className="field" name="email" type="email" required />
      </div>
      <div className="field-row">
        <label className="field-label">Mobile number</label>
        <input className="field" name="mobile" required />
      </div>
      <div className="field-row">
        <label className="field-label">Password</label>
        <div className="password-field-control">
          <input
            className="field"
            name="password"
            type={showPassword ? 'text' : 'password'}
            minLength="10"
            maxLength="128"
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,128}"
            title="Use at least 10 characters with uppercase, lowercase, and a number"
            autoComplete="new-password"
            required
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
      </div>
      {error && (
        <div className="field-error" role="alert">
          {error}
        </div>
      )}
      <button className="btn btn-gold btn-block auth-submit" disabled={submitting}>
        {submitting ? 'Creating account…' : 'Create account'} <span>→</span>
      </button>
      <div className="auth-divider">
        <span>Already registered?</span>
      </div>
      <a className="auth-create" href="#/login">
        Log in
      </a>
    </form>
  )
}
