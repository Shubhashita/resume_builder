import React from 'react'
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
import EditableField from '@/components/EditableField'
import HoverBlock from '@/components/HoverBlock'

export default function SingleColumn({ data, onChange }) {
  const { personal, experience, education, skills, projects, certifications, languages } = data
  const theme = getTheme(data.meta.themeId)
  const vars = themeToCssVars(theme, data)

  const contacts = [
    personal.phone && { Icon: Phone, text: personal.phone, field: 'phone' },
    personal.email && { Icon: Mail, text: personal.email, field: 'email' },
    personal.location && { Icon: MapPin, text: personal.location, field: 'location' },
    personal.website && { Icon: Globe, text: personal.website, field: 'website' },
    personal.linkedin && { Icon: LinkedinIcon, text: personal.linkedin, field: 'linkedin' },
    personal.github && { Icon: GithubIcon, text: personal.github, field: 'github' },
  ].filter(Boolean)

  const moveItem = (section, idx, dir) => {
    const arr = [...data[section]]
    if (idx + dir < 0 || idx + dir >= arr.length) return
    const temp = arr[idx]
    arr[idx] = arr[idx + dir]
    arr[idx + dir] = temp
    onChange?.({ ...data, [section]: arr })
  }
  const deleteItem = (section, idx) => {
    const arr = data[section].filter((_, i) => i !== idx)
    onChange?.({ ...data, [section]: arr })
  }
  const addItem = (section, templateObj) => {
    const arr = [...data[section], { id: crypto.randomUUID(), ...templateObj }]
    onChange?.({ ...data, [section]: arr })
  }

  return (
    <div className="resume resume-single" style={vars}>
      <header className="rs-header">
        <EditableField
          tagName="h1"
          className="rs-header-name w-full mb-1 text-center"
          value={personal.fullName}
          onChange={(val) => onChange?.({ ...data, personal: { ...personal, fullName: val } })}
          placeholder="Your Name"
        />
        <EditableField
          tagName="p"
          className="rs-header-title w-full text-center"
          value={personal.jobTitle}
          onChange={(val) => onChange?.({ ...data, personal: { ...personal, jobTitle: val } })}
          placeholder="Job Title"
        />
        {contacts.length > 0 && (
          <div className="rs-header-contact">
            {contacts.map(({ Icon, text, field }, i) => (
              <span key={i}>
                <Icon className="rs-icon" />
                <EditableField
                  value={text}
                  onChange={(val) => onChange?.({ ...data, personal: { ...personal, [field]: val } })}
                  placeholder={field}
                />
              </span>
            ))}
          </div>
        )}
      </header>

      {personal.summary && (
        <Section title="Professional Summary" Icon={Briefcase}>
          <EditableField
            tagName="p"
            className="rs-body-text block w-full"
            value={personal.summary}
            multiline
            onChange={(val) => onChange?.({ ...data, personal: { ...personal, summary: val } })}
            placeholder="Professional Summary"
          />
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience" Icon={Briefcase}>
          {experience.map((exp, idx) => (
            <HoverBlock
              key={exp.id}
              className="rs-entry"
              onMoveUp={() => moveItem('experience', idx, -1)}
              onMoveDown={() => moveItem('experience', idx, 1)}
              onDelete={() => deleteItem('experience', idx)}
              onAdd={() => addItem('experience', { role: 'New Role', company: 'Company', start: '2023', end: 'Present', bullets: ['New achievement'] })}
            >
              <Entry
                title={exp.role} onTitleChange={(v) => { const newArr = [...experience]; newArr[idx].role = v; onChange?.({ ...data, experience: newArr }) }}
                subtitle={exp.company} onSubtitleChange={(v) => { const newArr = [...experience]; newArr[idx].company = v; onChange?.({ ...data, experience: newArr }) }}
                start={exp.start} onStartChange={(v) => { const newArr = [...experience]; newArr[idx].start = v; onChange?.({ ...data, experience: newArr }) }}
                end={exp.end} onEndChange={(v) => { const newArr = [...experience]; newArr[idx].end = v; onChange?.({ ...data, experience: newArr }) }}
                location={exp.location} onLocationChange={(v) => { const newArr = [...experience]; newArr[idx].location = v; onChange?.({ ...data, experience: newArr }) }}
                bullets={exp.bullets} onBulletsChange={(v) => { const newArr = [...experience]; newArr[idx].bullets = v; onChange?.({ ...data, experience: newArr }) }}
                wrapper={false}
              />
            </HoverBlock>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects" Icon={FolderGit2}>
          {projects.map((p, idx) => (
            <HoverBlock
              key={p.id}
              className="rs-entry"
              onMoveUp={() => moveItem('projects', idx, -1)}
              onMoveDown={() => moveItem('projects', idx, 1)}
              onDelete={() => deleteItem('projects', idx)}
              onAdd={() => addItem('projects', { name: 'New Project', tech: 'Tech Stack', year: '2023', bullets: ['Project details'] })}
            >
              <Entry
                title={p.name} onTitleChange={(v) => { const newArr = [...projects]; newArr[idx].name = v; onChange?.({ ...data, projects: newArr }) }}
                subtitle={p.tech} onSubtitleChange={(v) => { const newArr = [...projects]; newArr[idx].tech = v; onChange?.({ ...data, projects: newArr }) }}
                end={p.year} onEndChange={(v) => { const newArr = [...projects]; newArr[idx].year = v; onChange?.({ ...data, projects: newArr }) }}
                bullets={p.bullets} onBulletsChange={(v) => { const newArr = [...projects]; newArr[idx].bullets = v; onChange?.({ ...data, projects: newArr }) }}
                techStyle
                wrapper={false}
              />
            </HoverBlock>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education" Icon={GraduationCap}>
          {education.map((edu, idx) => (
            <HoverBlock
              key={edu.id}
              className="rs-entry"
              onMoveUp={() => moveItem('education', idx, -1)}
              onMoveDown={() => moveItem('education', idx, 1)}
              onDelete={() => deleteItem('education', idx)}
              onAdd={() => addItem('education', { degree: 'Degree', school: 'School', start: '2020', end: '2024' })}
            >
              <Entry
                title={edu.degree} onTitleChange={(v) => { const newArr = [...education]; newArr[idx].degree = v; onChange?.({ ...data, education: newArr }) }}
                subtitle={edu.school} onSubtitleChange={(v) => { const newArr = [...education]; newArr[idx].school = v; onChange?.({ ...data, education: newArr }) }}
                start={edu.start} onStartChange={(v) => { const newArr = [...education]; newArr[idx].start = v; onChange?.({ ...data, education: newArr }) }}
                end={edu.end} onEndChange={(v) => { const newArr = [...education]; newArr[idx].end = v; onChange?.({ ...data, education: newArr }) }}
                location={edu.location} onLocationChange={(v) => { const newArr = [...education]; newArr[idx].location = v; onChange?.({ ...data, education: newArr }) }}
                wrapper={false}
              />
            </HoverBlock>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills" Icon={Wrench}>
          <div className="rs-skills">
            {skills.map((s, idx) => (
              <HoverBlock
                key={s.id}
                className="rs-skill-row"
                onMoveUp={() => moveItem('skills', idx, -1)}
                onMoveDown={() => moveItem('skills', idx, 1)}
                onDelete={() => deleteItem('skills', idx)}
                onAdd={() => addItem('skills', { category: 'Category', items: 'Skill 1, Skill 2' })}
              >
                <EditableField
                  tagName="strong"
                  value={s.category}
                  onChange={(val) => { const newArr = [...skills]; newArr[idx].category = val; onChange?.({ ...data, skills: newArr }) }}
                />: 
                <EditableField
                  tagName="span"
                  className="ml-1"
                  value={s.items}
                  multiline
                  onChange={(val) => { const newArr = [...skills]; newArr[idx].items = val; onChange?.({ ...data, skills: newArr }) }}
                />
              </HoverBlock>
            ))}
          </div>
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications" Icon={BadgeCheck}>
          <ul className="rs-bullets">
            {certifications.map((c, idx) => (
              <HoverBlock
                key={c.id}
                tagName="li"
                onMoveUp={() => moveItem('certifications', idx, -1)}
                onMoveDown={() => moveItem('certifications', idx, 1)}
                onDelete={() => deleteItem('certifications', idx)}
                onAdd={() => addItem('certifications', { name: 'Certification', issuer: 'Issuer' })}
              >
                <EditableField
                  tagName="strong"
                  value={c.name}
                  onChange={(val) => { const newArr = [...certifications]; newArr[idx].name = val; onChange?.({ ...data, certifications: newArr }) }}
                />
                {c.issuer && (
                  <EditableField
                    tagName="span"
                    className="ml-1"
                    value={`, ${c.issuer}`}
                    onChange={(val) => { const newArr = [...certifications]; newArr[idx].issuer = val.replace(/^,\s*/, ''); onChange?.({ ...data, certifications: newArr }) }}
                  />
                )}
                {c.date && (
                  <EditableField
                    tagName="span"
                    className="rs-muted ml-1"
                    value={`(${c.date})`}
                    onChange={(val) => { const newArr = [...certifications]; newArr[idx].date = val.replace(/[()]/g, ''); onChange?.({ ...data, certifications: newArr }) }}
                  />
                )}
              </HoverBlock>
            ))}
          </ul>
        </Section>
      )}

      {languages.length > 0 && (
        <Section title="Languages" Icon={LanguagesIcon}>
          <p className="rs-body-text">
            {languages.map((l, idx) => (
              <HoverBlock
                key={l.id}
                tagName="span"
                onMoveUp={() => moveItem('languages', idx, -1)}
                onMoveDown={() => moveItem('languages', idx, 1)}
                onDelete={() => deleteItem('languages', idx)}
                onAdd={() => addItem('languages', { name: 'Language', level: 'Native' })}
              >
                <EditableField
                  value={l.name}
                  onChange={(val) => { const newArr = [...languages]; newArr[idx].name = val; onChange?.({ ...data, languages: newArr }) }}
                />
                {l.level && (
                  <EditableField
                    className="ml-1"
                    value={`(${l.level})`}
                    onChange={(val) => { const newArr = [...languages]; newArr[idx].level = val.replace(/[()]/g, ''); onChange?.({ ...data, languages: newArr }) }}
                  />
                )}
                {idx < languages.length - 1 && <span className="mx-1">|</span>}
              </HoverBlock>
            ))}
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

function Entry({ title, onTitleChange, subtitle, onSubtitleChange, start, onStartChange, end, onEndChange, location, onLocationChange, bullets, onBulletsChange, techStyle, wrapper = true }) {
  const hasDate = start || end
  const Wrapper = wrapper ? 'div' : React.Fragment
  const wrapperProps = wrapper ? { className: "rs-entry" } : {}
  return (
    <Wrapper {...wrapperProps}>
      <div className="rs-entry-top">
        <EditableField tagName="strong" value={title} onChange={onTitleChange} />
        {(hasDate || location) && (
          <div className="rs-entry-right">
            {hasDate && (
              <div className="rs-date">
                <Calendar className="rs-icon" />
                {start && (
                  <>
                    <EditableField value={start} onChange={onStartChange} />
                    <span className="mx-1">-</span>
                  </>
                )}
                <EditableField value={end} onChange={onEndChange} />
              </div>
            )}
            {location && (
              <div className="rs-loc">
                <MapPin className="rs-icon" />
                <EditableField value={location} onChange={onLocationChange} />
              </div>
            )}
          </div>
        )}
      </div>
      {subtitle && (
        <EditableField 
          tagName="div" 
          className={techStyle ? 'rs-tech' : 'rs-entry-sub'} 
          value={subtitle} 
          onChange={onSubtitleChange} 
        />
      )}
      {bullets?.length > 0 && (
        <ul className="rs-bullets">
          {bullets.map((b, i) => (
            <li key={i}>
              <EditableField
                value={b}
                multiline
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    const ul = e.target.closest('ul')
                    const newList = [...bullets]
                    newList.splice(i + 1, 0, '')
                    onBulletsChange?.(newList)
                    setTimeout(() => {
                      const el = ul?.querySelectorAll('li > span, li > div')[i + 1]
                      if (el) el.focus()
                    }, 50)
                  } else if (e.key === 'Backspace' && !e.target.textContent) {
                    e.preventDefault()
                    const ul = e.target.closest('ul')
                    const newList = [...bullets]
                    newList.splice(i, 1)
                    onBulletsChange?.(newList)
                    setTimeout(() => {
                      const el = ul?.querySelectorAll('li > span, li > div')[Math.max(0, i - 1)]
                      if (el) {
                        el.focus();
                        if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
                          const range = document.createRange();
                          range.selectNodeContents(el);
                          range.collapse(false);
                          const sel = window.getSelection();
                          sel.removeAllRanges();
                          sel.addRange(range);
                        }
                      }
                    }, 50)
                  }
                }}
                onChange={(val) => {
                  const newBullets = [...bullets];
                  newBullets[i] = val;
                  onBulletsChange?.(newBullets);
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  )
}
