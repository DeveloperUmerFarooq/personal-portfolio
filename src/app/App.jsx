import { useEffect } from 'react'
import { siteConfig } from '../config/site.js'
import { projects } from '../config/projects.js'
import { Header } from '../components/layout/Header.jsx'
import { Footer } from '../components/layout/Footer.jsx'
import { Hero } from '../features/portfolio/components/Hero.jsx'
import { Capabilities } from '../features/portfolio/components/Capabilities.jsx'
import { ProjectGrid } from '../features/portfolio/components/ProjectGrid.jsx'
import { Profile } from '../features/portfolio/components/Profile.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { useParallax } from '../hooks/useParallax.js'

function App() {
  useReveal()
  useParallax()
  useEffect(() => { document.title = `${siteConfig.identity.name} — ${siteConfig.identity.role}` }, [])
  return (
    <div className="site-shell">
      <Header identity={siteConfig.identity} navigation={siteConfig.navigation} />
      <main>
        <Hero config={siteConfig.hero} identity={siteConfig.identity} />
        <Capabilities items={siteConfig.capabilities} toolkit={siteConfig.toolkit} />
        <ProjectGrid projects={projects} />
        <Profile config={siteConfig.profile} identity={siteConfig.identity} />
      </main>
      <Footer identity={siteConfig.identity} />
    </div>
  )
}

export default App
