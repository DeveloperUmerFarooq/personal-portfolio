import { Arrow } from '../../../components/ui/Arrow.jsx'

export function Hero({ config, identity }) {
  return (
    <section className="hero" id="top" data-hero-scroll>
      <div className="hero__stage">
        <div className="hero__ambient" data-parallax="0.055" aria-hidden="true"><span>{identity.initials}</span></div>
        <div className="hero__content">
          <div className="hero__eyebrow"><p>{config.eyebrow}</p><p className="availability"><span />{config.availability}</p></div>
          <div className="hero__title"><h1>
            <span className="text-mask"><span className="text-mask__line text-mask__line--one">{config.lead}</span></span>
            <span className="text-mask"><em className="text-mask__line text-mask__line--two">{config.emphasis}</em></span>
            <span className="text-mask"><span className="text-mask__line text-mask__line--three">{config.closing}</span></span>
          </h1></div>
          <div className="hero__bottom"><a className="round-link" href="#work" aria-label="View selected work"><Arrow direction="down" /></a><p>{config.introduction}</p></div>
          <div className="hero__stats">{config.statistics.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
        </div>
        <div className="hero__intro" aria-hidden="true">
          <div className="hero__intro-lockup">
            <span className="hero__name" aria-label={identity.name}>
              {Array.from(identity.name).map((character, index) => (
                <span
                  className={`hero__name-letter${character === ' ' ? ' hero__name-letter--space' : ''}`}
                  style={{ '--char-delay': `${80 + index * 45}ms` }}
                  key={`${character}-${index}`}
                >
                  {character === ' ' ? '\u00a0' : character}
                </span>
              ))}
            </span>
            <p>{config.introTitle.split(' ').map((word) => <span key={word}>{word}</span>)}</p>
          </div>
          <small><i /> Scroll to discover <i /></small>
        </div>
      </div>
    </section>
  )
}
