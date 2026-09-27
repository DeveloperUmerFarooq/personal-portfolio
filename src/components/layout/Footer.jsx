import { Arrow } from '../ui/Arrow.jsx'
export function Footer({ identity }) {
  return <footer className="footer"><p>© {new Date().getFullYear()} {identity.name}</p><p>{identity.location}</p><a href="#top">Back to top <Arrow direction="down" /></a></footer>
}
