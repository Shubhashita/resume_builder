import { Phone, Mail, MapPin, Link as LinkIcon, Calendar } from 'lucide-react'
import { getTheme, themeToCssVars } from '@/data/themes'

export default function TwoColumn({ data }) {
  const { personal, experience, education, skills, projects, certifications, languages } = data
  const theme = getTheme(data.meta.themeId)
  const vars = themeToCssVars(theme, data)

  const contacts = [
    personal.phone && { Icon: Phone, text: personal.phone },
    personal.email && { Icon: Mail, text: personal.email },
    personal.website && { Icon: LinkIcon, text: personal.website },
    personal.linkedin && { Icon: LinkIcon, text: personal.linkedin },
    personal.github && { Icon: LinkIcon, text: personal.github },
    personal.location && { Icon: MapPin, text: personal.location, row: true },
  ].filter(Boolean)

  return (
    <div className="resume resume-two" style={vars}>
      <div className="tc2-header">
        <header className="rs-header rs-header--two">
          <h1 className="rs-header-name">{personal.fullName || 'Your Name'}</h1>
          {personal.jobTitle && <p className="rs-header-title">{personal.jobTitle}</p>}
          {contacts.length > 0 && (
            <div className="rs-header-contact">
              {contacts.map(({ Icon, text, row }, i) => (
                <span key={i} className={row ? 'tc2-contact-row' : undefined}>
                  <Icon className="rs-icon" />
                  {text}
                </span>
              ))}
            </div>
          )}
        </header>
      </div>

      <div className="tc2-grid">
        <div className="tc2-main">
          {experience.length > 0 && (
            <Section title="Experience">
              {experience.map((exp, idx) => (
                <div key={exp.id} className={itemClass(idx)}>
                  <strong className="tc2-item-title">{exp.role}</strong>
                  {exp.company && <div className="tc2-item-sub">{exp.company}</div>}
                  <MetaRow
                    date={exp.start ? `${exp.start} - ${exp.end}` : exp.end}
                    location={exp.location}
                  />
                  <Bullets items={exp.bullets} />
                </div>
              ))}
            </Section>
          )}

          {projects.length > 0 && (
            <Section title="Projects">
              {projects.map((p, idx) => (
                <div key={p.id} className={itemClass(idx)}>
                  <strong className="tc2-item-title">{p.name}</strong>
                  <MetaRow date={p.year} />
                  {p.tech && <div className="tc2-item-sub">{p.tech}</div>}
                  <Bullets items={p.bullets} />
                </div>
              ))}
            </Section>
          )}
        </div>

        <aside className="tc2-side">
          {education.length > 0 && (
            <div className="tc2-block">
              <h3 className="rs-section-title">Education</h3>
              {education.map((edu, idx) => (
                <div key={edu.id} className={itemClass(idx)}>
                  <div className="tc2-edu-top">
                    <strong className="tc2-item-title">{edu.degree}</strong>
                    {(edu.rightLabel || edu.rightValue) && (
                      <div className="tc2-edu-right">
                        {edu.rightLabel && (
                          <div className="tc2-edu-right-label">{edu.rightLabel}</div>
                        )}
                        {edu.rightValue && (
                          <div className="tc2-edu-right-value">{edu.rightValue}</div>
                        )}
                      </div>
                    )}
                  </div>
                  {edu.school && <div className="tc2-item-sub">{edu.school}</div>}
                  <MetaRow
                    date={edu.start ? `${edu.start} - ${edu.end}` : edu.end}
                    location={edu.location}
                  />
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div className="tc2-block">
              <h3 className="rs-section-title">Skills</h3>
              {skills.map((s, idx) => (
                <div key={s.id} className={itemClass(idx)}>
                  <strong className="tc2-skill-cat">{s.category}</strong>
                  {s.items && <p className="tc2-skill-items">{s.items}</p>}
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div className="tc2-block">
              <h3 className="rs-section-title">Certifications</h3>
              <ul className="tc2-list">
                {certifications.map((c) => (
                  <li key={c.id}>
                    <strong>{c.name}</strong>
                    <span className="rs-muted">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {languages.length > 0 && (
            <div className="tc2-block">
              <h3 className="rs-section-title">Languages</h3>
              <ul className="tc2-list">
                {languages.map((l) => (
                  <li key={l.id}>
                    {l.name}
                    {l.level && ` (${l.level})`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function itemClass(idx) {
  return idx > 0 ? 'tc2-item tc2-item--divided' : 'tc2-item'
}

function MetaRow({ date, location }) {
  if (!date && !location) return null
  return (
    <div className="tc2-meta-row">
      {date && (
        <span className="tc2-meta">
          <Calendar className="rs-icon" />
          {date}
        </span>
      )}
      {location && (
        <span className="tc2-meta">
          <MapPin className="rs-icon" />
          {location}
        </span>
      )}
    </div>
  )
}

function Bullets({ items }) {
  const list = (items || []).filter(Boolean)
  if (!list.length) return null
  return (
    <ul className="rs-bullets">
      {list.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  )
}

function Section({ title, children }) {
  return (
    <section className="tc2-section">
      <h2 className="rs-section-title">{title}</h2>
      {children}
    </section>
  )
}
