import RegisterForm from '../../components/auth/RegisterForm'
import { Icon } from '../../utils/icons'
export default function Register() {
  return (
    <div className="auth-wrap auth-login">
      <section className="auth-side">
        <a className="auth-brand" href="#/public/landing">
          <Icon name="diamond" />
          <span>MIDAS</span>
        </a>
        <div className="auth-side-content">
          <span className="auth-eyebrow">Start your gold journey</span>
          <h1>
            Every promise,
            <br />
            <em>clearly recorded.</em>
          </h1>
          <p>
            Create an account to discover partner shops, select jewelry, and follow your installment
            progress.
          </p>
        </div>
        <div className="auth-side-foot">© 2026 MIDAS · Bangladesh</div>
      </section>
      <div className="auth-form-wrap">
        <RegisterForm />
      </div>
    </div>
  )
}
