import { SectionLabel } from '../../../components/ui/SectionLabel.jsx'

export function Capabilities({ items, toolkit }) {
  return (
    <section className="capabilities" id="expertise">
      <SectionLabel index="01">What I can do</SectionLabel>
      <div className="capabilities__intro" data-reveal><h2>Strong products need more than clean code.</h2><p>I bring product judgment, visual care and robust engineering into one focused process.</p></div>
      <div className="service-list">{items.map((item) => <article className="service" key={item.number} data-reveal><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      <div className="toolkit" data-reveal><p>Core toolkit</p><div>{toolkit.map((item) => <span key={item}>{item}</span>)}</div></div>
    </section>
  )
}
