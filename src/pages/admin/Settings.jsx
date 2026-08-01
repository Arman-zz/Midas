import { useState } from 'react'
import { useToast } from '../../context/ToastContext'
export default function Settings() {
  let saved = {}
  try {
    saved = JSON.parse(localStorage.getItem('midas-platform-settings') || '{}')
  } catch {}
  const [data, setData] = useState({ commissionRate: '2.0', confirmationWindow: '24', ...saved })
  const notify = useToast()
  const submit = (e) => {
    e.preventDefault()
    localStorage.setItem('midas-platform-settings', JSON.stringify(data))
    notify('Platform settings saved')
  }
  return (
    <form className="platform-settings" onSubmit={submit}>
      <div className="platform-settings-header">
        <div>
          <h2>Platform Settings</h2>
          <p>Configure marketplace-wide record and commission rules.</p>
        </div>
        <button className="btn btn-gold">Save Settings</button>
      </div>
      <section className="card settings-section">
        <div className="card-head">
          <div className="card-title">Marketplace and Commission</div>
        </div>
        <div className="card-pad settings-form-grid">
          <div>
            <label className="field-label">Partner commission (%)</label>
            <input
              className="field"
              type="number"
              step="0.1"
              value={data.commissionRate}
              onChange={(e) => setData({ ...data, commissionRate: e.target.value })}
            />
          </div>
          <div>
            <label className="field-label">Confirmation window (hours)</label>
            <input
              className="field"
              type="number"
              value={data.confirmationWindow}
              onChange={(e) => setData({ ...data, confirmationWindow: e.target.value })}
            />
          </div>
          <label className="setting-toggle">
            <input type="checkbox" defaultChecked />
            <span>
              <b>Require shop confirmation</b>
              <small>Gold is credited only after receipt verification.</small>
            </span>
          </label>
          <label className="setting-toggle">
            <input type="checkbox" defaultChecked />
            <span>
              <b>Preserve rate history</b>
              <small>Retain the conversion rate used for each record.</small>
            </span>
          </label>
        </div>
      </section>
    </form>
  )
}
