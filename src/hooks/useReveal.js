import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap.js'

const revealTrigger = (element, start = 'top 88%') => ({
  trigger: element,
  start,
  end: 'bottom 8%',
  toggleActions: 'play none none reverse',
})

export function useReveal() {
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const elements = gsap.utils.toArray('[data-reveal]')
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduceMotion) {
        gsap.set(elements, { autoAlpha: 1, y: 0, filter: 'blur(0px)' })
        gsap.set('.project > *', { autoAlpha: 1, y: 0, scale: 1 })
        gsap.set('.work__headline b', { '--work-line-y': '0%', '--work-line-rotate': '0deg' })
        return
      }

      elements.forEach((element) => {
        if (element.classList.contains('project')) {
          const details = element.querySelectorAll('.project__top, .project__category, h3, .project__summary, .project__meta')
          const graphic = element.querySelector('.project__graphic')
          gsap.set(element, { autoAlpha: 0, '--project-reveal-y': '140px' })
          gsap.set(details, { autoAlpha: 0, y: 24 })
          gsap.set(graphic, { autoAlpha: 0, scale: 0.92 })

          gsap.to(element, {
            autoAlpha: 1,
            '--project-reveal-y': '0px',
            duration: 1.05,
            ease: 'power4.out',
            scrollTrigger: revealTrigger(element, 'top 90%'),
            onStart: () => {
              gsap.to(graphic, { autoAlpha: 1, scale: 1, duration: 0.72, delay: 0.08, ease: 'power3.out' })
              gsap.to(details, { autoAlpha: 1, y: 0, duration: 0.68, delay: 0.14, stagger: 0.065, ease: 'power3.out' })
            },
            onReverseComplete: () => {
              gsap.set(graphic, { autoAlpha: 0, scale: 0.92 })
              gsap.set(details, { autoAlpha: 0, y: 24 })
            },
          })
          return
        }

        const headlineLines = element.querySelectorAll('.work__headline b')

        gsap.fromTo(element,
          { autoAlpha: 0, y: 48, filter: 'blur(7px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: revealTrigger(element),
            onStart: () => {
              if (headlineLines.length) {
                gsap.to(headlineLines, { '--work-line-y': '0%', '--work-line-rotate': '0deg', duration: 0.9, delay: 0.08, stagger: 0.1, ease: 'power4.out' })
              }
            },
            onReverseComplete: () => {
              if (headlineLines.length) gsap.set(headlineLines, { '--work-line-y': '115%', '--work-line-rotate': '2deg' })
            },
          },
        )
      })
    })

    return () => context.revert()
  }, [])
}
