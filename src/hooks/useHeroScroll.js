import { useLayoutEffect } from 'react'
import { gsap } from '../lib/gsap.js'

export function useHeroScroll() {
  useLayoutEffect(() => {
    const hero = document.querySelector('[data-hero-scroll]')
    const header = document.querySelector('.header')
    if (!hero || !header) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(header, { clearProps: 'opacity,pointerEvents', '--header-y': '0px' })
      return undefined
    }

    const context = gsap.context(() => {
      gsap.set(hero, {
        '--hero-intro-opacity': 1,
        '--hero-name-scale': 1,
        '--hero-role-opacity': 1,
        '--hero-role-blur': '0px',
        '--hero-role-left': '0px',
        '--hero-role-right': '0px',
        '--hero-role-rise': '0px',
        '--hero-role-drop': '0px',
        '--hero-role-rotate-left': '0deg',
        '--hero-role-rotate-right': '0deg',
        '--hero-content-opacity': 0,
        '--hero-content-shift': '34px',
        '--hero-content-scale': 0.975,
        '--hero-line-one-y': '115%',
        '--hero-line-two-y': '115%',
        '--hero-line-three-y': '115%',
      })
      gsap.set(header, { opacity: 0, pointerEvents: 'none', '--header-y': '-16px' })

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            header.style.pointerEvents = progress > 0.6 ? 'auto' : 'none'
          },
        },
      })

      timeline
        .to(hero, { '--hero-name-scale': 13, duration: 1, ease: 'power2.in' }, 0)
        .to(hero, {
          '--hero-role-opacity': 0,
          '--hero-role-blur': '9px',
          '--hero-role-left': '-90px',
          '--hero-role-right': '90px',
          '--hero-role-rise': '-34px',
          '--hero-role-drop': '28px',
          '--hero-role-rotate-left': '-8deg',
          '--hero-role-rotate-right': '8deg',
          duration: 0.22,
        }, 0.05)
        .to(hero, { '--hero-intro-opacity': 0, duration: 0.32 }, 0.18)
        .to(hero, {
          '--hero-content-opacity': 1,
          '--hero-content-shift': '0px',
          '--hero-content-scale': 1,
          duration: 0.24,
        }, 0.32)
        .to(hero, { '--hero-line-one-y': '0%', duration: 0.18 }, 0.34)
        .to(hero, { '--hero-line-two-y': '0%', duration: 0.18 }, 0.41)
        .to(hero, { '--hero-line-three-y': '0%', duration: 0.18 }, 0.48)
        .to(header, { opacity: 1, '--header-y': '0px', duration: 0.12 }, 0.48)
    }, hero)

    return () => {
      context.revert()
      header.style.removeProperty('pointer-events')
    }
  }, [])
}
