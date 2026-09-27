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
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        projectObserver.unobserve(entry.target)
      })
    }, { threshold: 0, rootMargin: '0px 0px -4% 0px' })
    elements.forEach((element) => observer.observe(element))
    projectShells.forEach((element) => {
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) element.classList.add('is-visible')
      else projectObserver.observe(element)
    })
    return () => {
      observer.disconnect()
      projectObserver.disconnect()
    }
  }, [])
}
