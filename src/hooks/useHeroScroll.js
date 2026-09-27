import { useEffect } from 'react'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export function useHeroScroll() {
  useEffect(() => {
    const hero = document.querySelector('[data-hero-scroll]')
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame = null
    const render = () => {
      const rect = hero.getBoundingClientRect()
      const distance = Math.max(1, hero.offsetHeight - window.innerHeight)
      const progress = clamp(-rect.top / distance)
      const contentFade = 1 - clamp((progress - 0.08) / 0.42)
      const transitionIn = clamp((progress - 0.28) / 0.22)
      const nameScale = 0.72 + Math.pow(progress, 2.2) * 18

      hero.style.setProperty('--hero-progress', progress.toFixed(4))
      hero.style.setProperty('--hero-content-opacity', contentFade.toFixed(4))
      hero.style.setProperty('--hero-content-shift', `${(progress * -38).toFixed(2)}px`)
      hero.style.setProperty('--hero-content-scale', (1 - progress * 0.025).toFixed(4))
      hero.style.setProperty('--hero-name-opacity', transitionIn.toFixed(4))
      hero.style.setProperty('--hero-name-scale', nameScale.toFixed(4))
      hero.style.setProperty('--hero-transition-opacity', clamp((progress - 0.54) / 0.24).toFixed(4))
      frame = null
    }

    const requestRender = () => {
      if (frame === null) frame = window.requestAnimationFrame(render)
    }

    render()
    window.addEventListener('scroll', requestRender, { passive: true })
    window.addEventListener('resize', requestRender)
    return () => {
      window.removeEventListener('scroll', requestRender)
      window.removeEventListener('resize', requestRender)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [])
}
