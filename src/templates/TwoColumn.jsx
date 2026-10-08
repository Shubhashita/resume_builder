import { Phone, Mail, MapPin, Link as LinkIcon, Calendar } from 'lucide-react'
import { getTheme, themeToCssVars } from '@/data/themes'
import EditableField from '@/components/EditableField'
import HoverBlock from '@/components/HoverBlock'

export default function TwoColumn({ data, onChange }) {
  const { personal, experience, education, skills, projects, certifications, languages } = data
  const theme = getTheme(data.meta.themeId)
  const vars = themeToCssVars(theme, data)

  const contacts = [
    personal.phone && { Icon: Phone, text: personal.phone, field: 'phone' },
    personal.email && { Icon: Mail, text: personal.email, field: 'email' },
    personal.website && { Icon: LinkIcon, text: personal.website, field: 'website' },
    personal.linkedin && { Icon: LinkIcon, text: personal.linkedin, field: 'linkedin' },
    personal.github && { Icon: LinkIcon, text: personal.github, field: 'github' },
    personal.location && { Icon: MapPin, text: personal.location, row: true, field: 'location' },
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
    <div className="resume resume-two" style={vars}>
      <div className="tc2-header">
        <header className="rs-header rs-header--two">
          <EditableField 
            tagName="h1" 
            className="rs-header-name mb-1" 
            value={personal.fullName} 
            onChange={(val) => onChange?.({ ...data, personal: { ...personal, fullName: val } })}
            placeholder="Your Name"
          />
          <EditableField
            tagName="p"
            className="rs-header-title"
            value={personal.jobTitle}
            onChange={(val) => onChange?.({ ...data, personal: { ...personal, jobTitle: val } })}
            placeholder="Job Title"
          />
          {contacts.length > 0 && (
            <div className="rs-header-contact">
              {contacts.map(({ Icon, text, row, field }, i) => (
                <span key={i} className={row ? 'tc2-contact-row' : undefined}>
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
      </div>

      <div className="tc2-grid" style={{ gridTemplateColumns: vars['--col-layout'] }}>
        <div className="tc2-main">
          {experience.length > 0 && (
            <Section title="Experience">
              {experience.map((exp, idx) => (
                <HoverBlock
                  key={exp.id}
                  className={itemClass(idx)}
                  onMoveUp={() => moveItem('experience', idx, -1)}
                  onMoveDown={() => moveItem('experience', idx, 1)}
                  onDelete={() => deleteItem('experience', idx)}
                  onAdd={() => addItem('experience', { role: 'New Role', company: 'Company', start: '2023', end: 'Present', bullets: ['New achievement'] })}
                >
                  <EditableField
                    tagName="strong"
                    className="tc2-item-title"
                    value={exp.role}
                    onChange={(val) => {
                      const newExp = [...experience]; newExp[idx].role = val;
                      onChange?.({ ...data, experience: newExp })
                    }}
                  />
                  {exp.company && (
                    <EditableField
                      tagName="div"
                      className="tc2-item-sub"
                      value={exp.company}
                      onChange={(val) => {
                        const newExp = [...experience]; newExp[idx].company = val;
                        onChange?.({ ...data, experience: newExp })
                      }}
                    />
                  )}
                  <MetaRow
                    start={exp.start} onStartChange={(v) => { const newArr = [...experience]; newArr[idx].start = v; onChange?.({ ...data, experience: newArr }) }}
                    end={exp.end} onEndChange={(v) => { const newArr = [...experience]; newArr[idx].end = v; onChange?.({ ...data, experience: newArr }) }}
                    location={exp.location} onLocationChange={(v) => { const newArr = [...experience]; newArr[idx].location = v; onChange?.({ ...data, experience: newArr }) }}
                  />
                  <Bullets 
                    items={exp.bullets} 
                    onChange={(newBullets) => {
                      const newExp = [...experience]; newExp[idx].bullets = newBullets;
                      onChange?.({ ...data, experience: newExp })
                    }}
                  />
                </HoverBlock>
              ))}
            </Section>
          )}

          {projects.length > 0 && (
            <Section title="Projects">
              {projects.map((p, idx) => (
                <HoverBlock
                  key={p.id}
                  className={itemClass(idx)}
                  onMoveUp={() => moveItem('projects', idx, -1)}
                  onMoveDown={() => moveItem('projects', idx, 1)}
                  onDelete={() => deleteItem('projects', idx)}
                  onAdd={() => addItem('projects', { name: 'New Project', tech: 'Tech Stack', year: '2023', bullets: ['Project details'] })}
                >
                  <EditableField
                    tagName="strong"
                    className="tc2-item-title"
                    value={p.name}
                    onChange={(val) => {
                      const newProj = [...projects]; newProj[idx].name = val;
                      onChange?.({ ...data, projects: newProj })
                    }}
                  />
                  <MetaRow 
                    end={p.year} onEndChange={(v) => { const newArr = [...projects]; newArr[idx].year = v; onChange?.({ ...data, projects: newArr }) }} 
                  />
                  {p.tech && (
                    <EditableField
                      tagName="div"
                      className="tc2-item-tech"
                      value={p.tech}
                      onChange={(val) => {
                        const newProj = [...projects]; newProj[idx].tech = val;
                        onChange?.({ ...data, projects: newProj })
                      }}
                    />
                  )}
                  <Bullets 
                    items={p.bullets} 
                    onChange={(newBullets) => {
                      const newProj = [...projects]; newProj[idx].bullets = newBullets;
                      onChange?.({ ...data, projects: newProj })
                    }}
                  />
                </HoverBlock>
              ))}
            </Section>
          )}
        </div>

        <aside className="tc2-side">
          {education.length > 0 && (
            <div className="tc2-block">
              <h3 className="rs-section-title">Education</h3>
              {education.map((edu, idx) => (
                <HoverBlock
                  key={edu.id}
                  className={itemClass(idx)}
                  onMoveUp={() => moveItem('education', idx, -1)}
                  onMoveDown={() => moveItem('education', idx, 1)}
                  onDelete={() => deleteItem('education', idx)}
                  onAdd={() => addItem('education', { degree: 'Degree', school: 'School', start: '2020', end: '2024' })}
                >
                  <EditableField
                    tagName="strong"
                    className="tc2-item-title"
                    value={edu.degree}
                    onChange={(val) => {
                      const newEdu = [...education]; newEdu[idx].degree = val;
                      onChange?.({ ...data, education: newEdu })
                    }}
                  />
                  <div className="flex justify-between items-center gap-3 mt-0.5">
                    <div className="flex-1">
                      {edu.school && (
                        <EditableField
                          tagName="div"
                          className="tc2-item-sub"
                          value={edu.school}
                          onChange={(val) => {
                            const newEdu = [...education]; newEdu[idx].school = val;
                            onChange?.({ ...data, education: newEdu })
                          }}
                        />
                      )}
                    </div>
                    {(edu.rightLabel || edu.rightValue) && (
                      <div className="tc2-edu-right">
                        {edu.rightLabel && (
                          <EditableField
                            tagName="div"
                            className="tc2-edu-right-label"
                            value={edu.rightLabel}
                            onChange={(val) => {
                              const newEdu = [...education]; newEdu[idx].rightLabel = val;
                              onChange?.({ ...data, education: newEdu })
                            }}
                          />
                        )}
                        {edu.rightValue && (
                          <EditableField
                            tagName="div"
                            className="tc2-edu-right-value"
                            value={edu.rightValue}
                            onChange={(val) => {
                              const newEdu = [...education]; newEdu[idx].rightValue = val;
                              onChange?.({ ...data, education: newEdu })
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                  <MetaRow
                    start={edu.start} onStartChange={(v) => { const newArr = [...education]; newArr[idx].start = v; onChange?.({ ...data, education: newArr }) }}
                    end={edu.end} onEndChange={(v) => { const newArr = [...education]; newArr[idx].end = v; onChange?.({ ...data, education: newArr }) }}
                    location={edu.location} onLocationChange={(v) => { const newArr = [...education]; newArr[idx].location = v; onChange?.({ ...data, education: newArr }) }}
                    stacked={true}
                  />
                </HoverBlock>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div className="tc2-block">
              <h3 className="rs-section-title">Skills</h3>
              {skills.map((s, idx) => (
                <HoverBlock
                  key={s.id}
                  className={itemClass(idx)}
                  onMoveUp={() => moveItem('skills', idx, -1)}
                  onMoveDown={() => moveItem('skills', idx, 1)}
                  onDelete={() => deleteItem('skills', idx)}
                  onAdd={() => addItem('skills', { category: 'Category', items: 'Skill 1, Skill 2' })}
                >
                  <EditableField
                    tagName="strong"
                    className="tc2-skill-cat block"
                    value={s.category}
                    onChange={(val) => {
                      const newSkills = [...skills]; newSkills[idx].category = val;
                      onChange?.({ ...data, skills: newSkills })
                    }}
                  />
                  {s.items && (
                    <EditableField
                      tagName="p"
                      className="tc2-skill-items"
                      value={s.items}
                      multiline
                      onChange={(val) => {
                        const newSkills = [...skills]; newSkills[idx].items = val;
                        onChange?.({ ...data, skills: newSkills })
                      }}
                    />
                  )}
                </HoverBlock>
              ))}
            </div>
          )}

          {certifications.length > 0 && (
            <div className="tc2-block">
              <h3 className="rs-section-title">Certifications</h3>
              <ul className="tc2-list">
                {certifications.map((c, idx) => (
                  <HoverBlock
                    key={c.id}
                    tagName="li"
                    className={itemClass(idx)}
                    onMoveUp={() => moveItem('certifications', idx, -1)}
                    onMoveDown={() => moveItem('certifications', idx, 1)}
                    onDelete={() => deleteItem('certifications', idx)}
                    onAdd={() => addItem('certifications', { name: 'Certification', issuer: 'Issuer' })}
                  >
                    <EditableField
                      tagName="strong"
                      value={c.name}
                      onChange={(val) => {
                        const newCerts = [...certifications]; newCerts[idx].name = val;
                        onChange?.({ ...data, certifications: newCerts })
                      }}
                    />
                    <EditableField
                      tagName="span"
                      className="rs-muted ml-1"
                      value={c.issuer}
                      onChange={(val) => {
                        const newCerts = [...certifications]; newCerts[idx].issuer = val;
                        onChange?.({ ...data, certifications: newCerts })
                      }}
                    />
                  </HoverBlock>
                ))}
              </ul>
            </div>
          )}

          {languages.length > 0 && (
            <div className="tc2-block">
              <h3 className="rs-section-title">Languages</h3>
              <ul className="tc2-list">
                {languages.map((l, idx) => (
                  <HoverBlock
                    key={l.id}
                    tagName="li"
                    className={itemClass(idx)}
                    onMoveUp={() => moveItem('languages', idx, -1)}
                    onMoveDown={() => moveItem('languages', idx, 1)}
                    onDelete={() => deleteItem('languages', idx)}
                    onAdd={() => addItem('languages', { name: 'Language', level: 'Native' })}
                  >
                    <EditableField
                      tagName="span"
                      value={l.name}
                      onChange={(val) => {
                        const newLangs = [...languages]; newLangs[idx].name = val;
                        onChange?.({ ...data, languages: newLangs })
                      }}
                    />
                    {l.level && (
                      <EditableField
                        tagName="span"
                        className="ml-1"
                        value={`(${l.level})`}
                        onChange={(val) => {
                          const newLangs = [...languages]; newLangs[idx].level = val.replace(/[()]/g, '');
                          onChange?.({ ...data, languages: newLangs })
                        }}
                      />
                    )}
                  </HoverBlock>
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

function MetaRow({ start, onStartChange, end, onEndChange, location, onLocationChange, stacked }) {
  const hasDate = start || end
  if (!hasDate && !location) return null
  return (
    <div className={`tc2-meta-row flex ${stacked ? 'flex-col gap-1' : 'gap-3'} text-[9pt] text-[#555] mb-2`}>
      {hasDate && (
        <span className="tc2-meta flex items-center gap-1">
          <Calendar className="rs-icon w-3 h-3" />
          {start && (
            <>
              <EditableField value={start} onChange={onStartChange} />
              <span className="mx-0.5">-</span>
            </>
          )}
          <EditableField value={end} onChange={onEndChange} />
        </span>
      )}
      {location && (
        <span className="tc2-meta flex items-center gap-1">
          <MapPin className="rs-icon w-3 h-3" />
          <EditableField value={location} onChange={onLocationChange} />
        </span>
      )}
    </div>
  )
}

function Bullets({ items, onChange }) {
  const list = items || []
  if (!list.length) return null
  return (
    <ul className="rs-bullets">
      {list.map((b, i) => (
        <li key={i}>
          <EditableField
            value={b}
            multiline
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                const ul = e.target.closest('ul')
                const newList = [...list]
                newList.splice(i + 1, 0, '')
                onChange?.(newList)
                setTimeout(() => {
                  const el = ul?.querySelectorAll('li > span, li > div')[i + 1]
                  if (el) el.focus()
                }, 50)
              } else if (e.key === 'Backspace' && !e.target.textContent) {
                e.preventDefault()
                const ul = e.target.closest('ul')
                const newList = [...list]
                newList.splice(i, 1)
                onChange?.(newList)
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
              const newList = [...list];
              newList[i] = val;
              onChange?.(newList);
            }}
          />
        </li>
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
