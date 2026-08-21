import { Icon } from '../../utils/icons'
import { useAuth } from '../../hooks/useAuth'
export default function Header() {
  const { user, loading } = useAuth()
  return (
    <header className="pub-header">
      <a className="u-flex u-gap-10 brand-home-link" href="#/public/landing">
        <Icon name="diamond" />
        <span className="public-brand-word">Midas_Gohona</span>
      </a>
      <nav className="pub-nav">
        <a href="#/public/landing">Home</a>
        <a href="#/public/marketplace">Marketplace</a>
        <a href="#/public/how-it-works">How it works</a>
        <a href="#/public/partner">Become a Partner</a>
        <a href="#/public/about">About Us</a>
      </nav>
      <div className="pub-actions">
        {!loading && user ? (
          <a className="btn btn-gold" href={`#/${user.role}/dashboard`}>
            My dashboard
          </a>
        ) : !loading ? (
          <>
            <a className="btn btn-ghost" href="#/login">
              Log in
            </a>
            <a className="btn btn-gold" href="#/register">
              Create account
            </a>
          </>
        ) : null}
      </div>
    </header>
  )
}
