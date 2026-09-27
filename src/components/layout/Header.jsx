import { useEffect, useState } from 'react'

export function Header({ identity, navigation }) {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu()
    }
    const handleResize = () => {
      if (window.innerWidth > 900) closeMenu()
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [open])

  return (
    <header className="header">
      <a className="brand" href="#top" aria-label={`${identity.name}, home`} onClick={closeMenu}><span className="brand__mark">{identity.initials}</span><span className="brand__name">{identity.name}</span></a>
      <button className={`menu-button${open ? ' menu-button--open' : ''}`} type="button" aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen((value) => !value)}><span /><span /><span className="sr-only">Toggle navigation</span></button>
      <nav id="site-navigation" className={`navigation${open ? ' navigation--open' : ''}`} aria-label="Main navigation">
        {navigation.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}
        <a className="navigation__contact" href={`mailto:${identity.email}`}>Let&apos;s talk</a>
      </nav>
    </header>
  )
}
