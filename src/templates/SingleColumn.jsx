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

export default function SingleColumn({ data }) {
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
    <div className="resume resume-single" style={vars}>
      <header className="rs-header">
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

      {personal.summary && (
        <Section title="Professional Summary" Icon={Briefcase}>
          <p className="rs-body-text">{personal.summary}</p>
        </Section>
      )}

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

      {education.length > 0 && (
        <Section title="Education" Icon={GraduationCap}>
          {education.map((edu) => (
            <Entry
              key={edu.id}
              title={edu.degree}
              subtitle={edu.school}
              start={edu.start}
              end={edu.end}
              location={edu.location}
              detail={edu.details}
            />
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills" Icon={Wrench}>
          <div className="rs-skills">
            {skills.map((s) => (
              <div key={s.id} className="rs-skill-row">
                <strong>{s.category}:</strong> <span>{s.items}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications" Icon={BadgeCheck}>
          <ul className="rs-bullets">
            {certifications.map((c) => (
              <li key={c.id}>
                <strong>{c.name}</strong>
                {c.issuer && `, ${c.issuer}`}
                {c.date && <span className="rs-muted"> ({c.date})</span>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {languages.length > 0 && (
        <Section title="Languages" Icon={LanguagesIcon}>
          <p className="rs-body-text">
            {languages.map((l) => `${l.name}${l.level ? ` (${l.level})` : ''}`).join(' | ')}
          </p>
        </Section>
      )}
    </div>
  )
}

function Section({ title, Icon, children }) {
  return (
    <section className="rs-section">
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

function Entry({ title, subtitle, start, end, location, bullets, detail, techStyle }) {
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
      {detail && <p className="rs-body-text rs-muted">{detail}</p>}
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
