import { Arrow } from '../../../components/ui/Arrow.jsx'
import { SectionLabel } from '../../../components/ui/SectionLabel.jsx'

export function Profile({ config, identity }) {
  return (
    <section className="profile" id="about">
      <SectionLabel index="03">{config.kicker}</SectionLabel>
      <div className="profile__grid">
        <div className="profile__statement" data-reveal><h2>{config.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2><div className="profile__monogram" aria-hidden="true">{identity.initials}</div></div>
        <div className="profile__copy" data-reveal>{config.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<ul>{config.principles.map((principle) => <li key={principle}>{principle}</li>)}</ul></div>
      </div>
      <div className="contact" data-reveal><p>Have a serious idea?</p><a href={`mailto:${identity.email}`}>Let&apos;s make it real <Arrow /></a><span>{identity.email}</span></div>
    </section>
  )
}
