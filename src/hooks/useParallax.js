import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap.js'

export function useParallax() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      gsap.utils.toArray('[data-parallax]').forEach((element) => {
        const speed = Number(element.dataset.parallax) || 0.08
        const distance = Math.min(90, Math.max(28, speed * 1100))

        gsap.fromTo(element,
          { '--parallax-y': `${distance}px` },
          {
            '--parallax-y': `${-distance}px`,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.75,
            },
          },
        )
      })
    })

    return () => context.revert()
  }, [])
}
