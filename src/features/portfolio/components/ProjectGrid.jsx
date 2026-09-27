import { SectionLabel } from '../../../components/ui/SectionLabel.jsx'

export function ProjectGrid({ projects }) {
  return (
    <section className="work" id="work">
      <SectionLabel index="02" light>Selected work</SectionLabel>
      <div className="work__heading" data-reveal><h2>Built for impact.<br />Presented with discretion.</h2><p>Many projects are protected by NDA. These summaries show the kind of problems I solve while keeping client details private.</p></div>
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
