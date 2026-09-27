import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const projectShells = document.querySelectorAll('[data-project-reveal]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      projectShells.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting)
      })
    }, { threshold: 0.08, rootMargin: '-8% 0px -8% 0px' })
    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.12) entry.target.classList.add('is-visible')
        else if (!entry.isIntersecting) entry.target.classList.remove('is-visible')
      })
    }, { threshold: [0, 0.12], rootMargin: '-4% 0px -4% 0px' })
    elements.forEach((element) => observer.observe(element))
    projectShells.forEach((element) => projectObserver.observe(element))
    return () => {
      observer.disconnect()
      projectObserver.disconnect()
    }
  }, [])
}
