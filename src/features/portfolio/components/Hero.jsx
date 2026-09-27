import { Arrow } from '../../../components/ui/Arrow.jsx'

export function Hero({ config, identity }) {
  return (
    <section className="hero" id="top">
      <div className="hero__ambient" aria-hidden="true"><span>{identity.initials}</span></div>
      <div className="hero__eyebrow" data-reveal><p>{config.eyebrow}</p><p className="availability"><span />{config.availability}</p></div>
      <div className="hero__title" data-reveal><h1><span>{config.lead}</span><em>{config.emphasis}</em><span>{config.closing}</span></h1></div>
      <div className="hero__bottom" data-reveal><a className="round-link" href="#work" aria-label="View selected work"><Arrow direction="down" /></a><p>{config.introduction}</p></div>
      <div className="hero__stats" data-reveal>{config.statistics.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
    </section>
  )
}
