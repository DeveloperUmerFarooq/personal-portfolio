import { useEffect } from 'react'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export function useHeroScroll() {
  useEffect(() => {
    const hero = document.querySelector('[data-hero-scroll]')
    const header = document.querySelector('.header')
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame = null
    const render = () => {
      const rect = hero.getBoundingClientRect()
      const distance = Math.max(1, hero.offsetHeight - window.innerHeight)
      const progress = clamp(-rect.top / distance)
      const introFade = 1 - clamp((progress - 0.18) / 0.32)
      const contentReveal = clamp((progress - 0.32) / 0.24)
      const nameScale = 1 + Math.pow(progress, 2) * 12
      const roleExit = clamp((progress - 0.05) / 0.22)
      const lineOne = clamp((progress - 0.34) / 0.18)
      const lineTwo = clamp((progress - 0.41) / 0.18)
      const lineThree = clamp((progress - 0.48) / 0.18)
      const navigationReveal = clamp((progress - 0.48) / 0.12)

      hero.style.setProperty('--hero-progress', progress.toFixed(4))
      hero.style.setProperty('--hero-intro-opacity', introFade.toFixed(4))
      hero.style.setProperty('--hero-name-scale', nameScale.toFixed(4))
      hero.style.setProperty('--hero-role-opacity', (1 - roleExit).toFixed(4))
      hero.style.setProperty('--hero-role-blur', `${(roleExit * 9).toFixed(2)}px`)
      hero.style.setProperty('--hero-role-left', `${(roleExit * -90).toFixed(2)}px`)
      hero.style.setProperty('--hero-role-right', `${(roleExit * 90).toFixed(2)}px`)
      hero.style.setProperty('--hero-role-rise', `${(roleExit * -34).toFixed(2)}px`)
      hero.style.setProperty('--hero-role-drop', `${(roleExit * 28).toFixed(2)}px`)
      hero.style.setProperty('--hero-role-rotate-left', `${(roleExit * -8).toFixed(2)}deg`)
      hero.style.setProperty('--hero-role-rotate-right', `${(roleExit * 8).toFixed(2)}deg`)
      hero.style.setProperty('--hero-content-opacity', contentReveal.toFixed(4))
      hero.style.setProperty('--hero-content-shift', `${((1 - contentReveal) * 34).toFixed(2)}px`)
      hero.style.setProperty('--hero-content-scale', (0.975 + contentReveal * 0.025).toFixed(4))
      hero.style.setProperty('--hero-line-one-y', `${((1 - lineOne) * 115).toFixed(2)}%`)
      hero.style.setProperty('--hero-line-two-y', `${((1 - lineTwo) * 115).toFixed(2)}%`)
      hero.style.setProperty('--hero-line-three-y', `${((1 - lineThree) * 115).toFixed(2)}%`)
      if (header) {
        header.style.opacity = navigationReveal.toFixed(4)
        header.style.transform = `translate(-50%, ${((1 - navigationReveal) * -16).toFixed(2)}px)`
        header.style.pointerEvents = navigationReveal > 0.9 ? 'auto' : 'none'
      }
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
      if (header) {
        header.style.removeProperty('opacity')
        header.style.removeProperty('transform')
        header.style.removeProperty('pointer-events')
      }
    }
  }, [])
}
