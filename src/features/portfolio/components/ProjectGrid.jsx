import { SectionLabel } from '../../../components/ui/SectionLabel.jsx'

const workSignals = ['Built for impact', 'Protected by NDA', 'Designed to scale', 'Measured in outcomes']

export function ProjectGrid({ projects }) {
  return (
    <section className="work" id="work">
      <SectionLabel index="02" light>Selected work</SectionLabel>
      <div className="work__heading" data-reveal>
        <div className="work__title">
          <p className="work__overline">Selected cases · 2024—2026</p>
          <h2 className="work__headline" aria-label="Quiet work. Loud outcomes.">
            <span><b>Quiet work.</b></span>
            <span><b><em>Loud</em> outcomes.</b></span>
          </h2>
        </div>
        <div className="work__note">
          <div className="work__signal" aria-hidden="true"><span /><strong>NDA</strong></div>
          <p>Many projects are protected by NDA. These summaries reveal the problems, thinking and contribution while keeping client details private.</p>
          <small><i /> Confidential by default</small>
        </div>
      </div>
      <div className="work__rail" aria-hidden="true">
        <div className="work__rail-track">
          {[...workSignals, ...workSignals].map((signal, index) => <span key={`${signal}-${index}`}>{signal}<i>↗</i></span>)}
        </div>
      </div>
      <div className="projects">{projects.map((project) => (
        <article className={`project project--${project.accent}`} key={project.index} data-reveal>
          <div className="project__top"><span>{project.index} / {project.year}</span>{project.confidential && <span className="nda">NDA protected</span>}</div>
          <div className="project__graphic" data-parallax="0.035" aria-hidden="true"><span className="project__ring" /><span className="project__code">{project.index}</span></div>
          <p className="project__category">{project.category}</p><h3>{project.title}</h3><p className="project__summary">{project.summary}</p>
          <div className="project__meta"><p>{project.contribution}</p><div>{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
        </article>
      ))}</div>
    </section>
  )
}
