import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Calendar,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Wrench,
  BadgeCheck,
  Languages as LanguagesIcon,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { getTheme, themeToCssVars } from '@/data/themes'

export default function TwoColumn({ data }) {
  const { personal, experience, education, skills, projects, certifications, languages } = data
  const theme = getTheme(data.meta.themeId)
  const vars = themeToCssVars(theme, data)

  const contacts = [
    personal.phone && { Icon: Phone, text: personal.phone },
    personal.email && { Icon: Mail, text: personal.email },
    personal.location && { Icon: MapPin, text: personal.location },
    personal.website && { Icon: Globe, text: personal.website },
    personal.linkedin && { Icon: LinkedinIcon, text: personal.linkedin },
    personal.github && { Icon: GithubIcon, text: personal.github },
  ].filter(Boolean)

  return (
    <div className="resume resume-two" style={vars}>
      <div className="tc2-header">
        <header className="rs-header rs-header--two">
          <h1 className="rs-header-name">{personal.fullName || 'Your Name'}</h1>
          {personal.jobTitle && <p className="rs-header-title">{personal.jobTitle}</p>}
          {contacts.length > 0 && (
            <div className="rs-header-contact">
              {contacts.map(({ Icon, text }, i) => (
                <span key={i}>
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
            <Section title="Experience" Icon={Briefcase}>
              {experience.map((exp) => (
                <Entry
                  key={exp.id}
                  title={exp.role}
                  subtitle={exp.company}
                  start={exp.start}
                  end={exp.end}
                  location={exp.location}
                  bullets={exp.bullets}
                />
              ))}
            </Section>
          )}

          {projects.length > 0 && (
            <Section title="Projects" Icon={FolderGit2}>
              {projects.map((p) => (
                <Entry
                  key={p.id}
                  title={p.name}
                  subtitle={p.tech}
                  end={p.year}
                  bullets={p.bullets}
                  techStyle
                />
              ))}
            </Section>
          )}
        </div>

        <aside className="tc2-side">
          {education.length > 0 && (
            <div className="tc2-block">
              <h3 className="rs-section-title">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <GraduationCap className="rs-icon" />
                  Education
                </span>
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="tc2-edu">
                  <strong>{edu.degree}</strong>
                  <p>{edu.school}</p>
                  <p className="rs-muted" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar className="rs-icon" />
                    {edu.start} - {edu.end}
                  </p>
                  {edu.location && (
                    <p className="rs-muted" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin className="rs-icon" />
                      {edu.location}
                    </p>
                  )}
                  {edu.details && <p>{edu.details}</p>}
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div className="tc2-block">
              <h3 className="rs-section-title">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Wrench className="rs-icon" />
                  Skills
                </span>
              </h3>
              {skills.map((s) => (
                <div key={s.id} className="tc2-skill">
                  <strong>{s.category}</strong>
                  <p>{s.items}</p>
                </div>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div className="tc2-block">
              <h3 className="rs-section-title">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <BadgeCheck className="rs-icon" />
                  Certifications
                </span>
              </h3>
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
              <h3 className="rs-section-title">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <LanguagesIcon className="rs-icon" />
                  Languages
                </span>
              </h3>
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

function Section({ title, Icon, children }) {
  return (
    <section className="tc2-section">
      <h2 className="rs-section-title">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          {Icon && <Icon className="rs-icon" />}
          {title}
        </span>
      </h2>
      {children}
    </section>
  )
}

function Entry({ title, subtitle, start, end, location, bullets, techStyle }) {
  const hasDate = start || end
  return (
    <div className="rs-entry">
      <div className="rs-entry-top">
        <strong>{title}</strong>
        {(hasDate || location) && (
          <div className="rs-entry-right">
            {hasDate && (
              <div className="rs-date">
                <Calendar className="rs-icon" />
                {start ? `${start} - ${end}` : end}
              </div>
            )}
            {location && (
              <div className="rs-loc">
                <MapPin className="rs-icon" />
                {location}
              </div>
            )}
          </div>
        )}
      </div>
      {subtitle && <div className={techStyle ? 'rs-tech' : 'rs-entry-sub'}>{subtitle}</div>}
      {bullets?.length > 0 && (
        <ul className="rs-bullets">
          {bullets.filter(Boolean).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
