import { useEffect } from 'react'

export function useParallax() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const elements = [...document.querySelectorAll('[data-parallax]')]

    if (media.matches || elements.length === 0) return undefined

    let frame = null
    const render = () => {
      const viewportCenter = window.innerHeight / 2
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const speed = Number(element.dataset.parallax) || 0.08
        const distance = rect.top + rect.height / 2 - viewportCenter
        const offset = Math.max(-90, Math.min(90, distance * speed * -1))
        element.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`)
      })
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
