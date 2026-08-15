import { useState } from 'react'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../hooks/useAuth'
import { midasApi } from '../../services/midasApi'
export default function Settings() {
  const { user, refreshSession } = useAuth()
  const onboarding = !user?.profileComplete
  const [profile, setProfile] = useState(() => ({
    name: user?.name || '',
    mobile: user?.mobile || '',
    area: user?.area || '',
    nid: user?.nid || '',
  }))
  const notify = useToast()
  const change = (e) => setProfile((v) => ({ ...v, [e.target.name]: e.target.value }))
  const submit = async (e) => {
    e.preventDefault()
    try {
      await midasApi.updateProfile(profile)
      await refreshSession()
      notify('Account settings saved')
      if (onboarding) location.hash = '#/customer/dashboard'
    } catch (error) {
      notify(error.message)
    }
  }
  return (
    <article className="card settings-card">
      <div className="card-head">
        <div>
          <div className="card-title">Account Settings</div>
          <div className="card-sub">Manage your personal information and preferences.</div>
        </div>
      </div>
      <form className="card-pad" onSubmit={submit}>
        {onboarding && (
          <div className="notice" role="status">
            Complete your profile to continue. Your area and valid NID are required before using the
            customer dashboard.
          </div>
        )}
        <div className="field-grid field-row">
          <div>
            <label className="field-label">Full name</label>
            <input className="field" name="name" value={profile.name} onChange={change} required />
          </div>
          <div>
            <label className="field-label">Mobile number</label>
            <input
              className="field"
              name="mobile"
              value={profile.mobile || ''}
              onChange={change}
              placeholder="01XXXXXXXXX"
              required
            />
          </div>
        </div>
        <div className="field-row">
          <label className="field-label">National ID (NID)</label>
          <input
            className="field"
            name="nid"
            inputMode="numeric"
            pattern="(?:[0-9]{10}|[0-9]{13}|[0-9]{17})"
            value={profile.nid || ''}
            onChange={change}
            placeholder="10, 13, or 17-digit NID number"
            required
          />
          <div className="tmeta">Enter a valid Bangladesh National ID number.</div>
        </div>
        <div className="field-row">
          <label className="field-label">Area</label>
          <input
            className="field"
            name="area"
            value={profile.area || ''}
            onChange={change}
            required
          />
        </div>
        <button className="btn btn-gold">Save changes</button>
      </form>
    </article>
  )
}
