import { Icon } from '../../utils/icons'
import { getSession } from '../../services/authService'
export default function Header(){
 const session=getSession()
 return <header className="pub-header">
  <a className="u-flex u-gap-10 brand-home-link" href="#/public/landing"><Icon name="diamond"/><span className="public-brand-word">MIDAS</span></a>
  <nav className="pub-nav"><a href="#/public/landing">Home</a><a href="#/public/marketplace">Marketplace</a><a href="#/public/how-it-works">How it works</a><a href="#/public/partner">Become a Partner</a><a href="#/public/about">About Us</a></nav>
  <div className="pub-actions">{session?<a className="btn btn-gold" href={`#/${session.role}/dashboard`}>My dashboard</a>:<><a className="btn btn-ghost" href="#/login">Log in</a><a className="btn btn-gold" href="#/register">Create account</a></>}</div>
 </header>
}
