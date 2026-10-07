import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  BadgeCheck,
  Languages,
  Palette,
  Ruler,
  Plus,
  Trash2,
  Sparkles,
  Type,
  LayoutTemplate,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { THEMES, FONTS, FONT_GROUPS, getTheme } from '@/data/themes'
import { getTemplate } from '@/templates'
import { MARGIN_OPTIONS } from '@/data/defaultResume'
import { cn } from '@/lib/utils'

const sectionIcons = {
  experience: Briefcase,
  education: GraduationCap,
  skills: Code2,
  projects: FolderGit2,
  certifications: BadgeCheck,
  languages: Languages,
}

const SECTION_DEFS = {
  experience: {
    title: 'Experience',
    addLabel: 'Add Experience',
    empty: 'No experience added yet.',
    fields: (v, i, onChange) => (
      <>
        <Field label="Role" value={v.role} onChange={(val) => onChange(i, 'role', val)} />
        <Field label="Company" value={v.company} onChange={(val) => onChange(i, 'company', val)} />
        <Field label="Location" value={v.location} onChange={(val) => onChange(i, 'location', val)} />
        <div className="grid grid-cols-2 gap-2">
          <Field label="Start" value={v.start} onChange={(val) => onChange(i, 'start', val)} />
          <Field label="End" value={v.end} onChange={(val) => onChange(i, 'end', val)} />
        </div>
        <BulletsField
          label="Achievements (one per line)"
          value={v.bullets}
          onChange={(val) => onChange(i, 'bullets', val)}
        />
      </>
    ),
    template: () => ({ company: '', role: '', location: '', start: '', end: '', bullets: [''] }),
  },
  education: {
    title: 'Education',
    addLabel: 'Add Education',
    empty: 'No education added yet.',
    fields: (v, i, onChange) => (
      <>
        <Field label="Degree" value={v.degree} onChange={(val) => onChange(i, 'degree', val)} />
        <Field label="School / University" value={v.school} onChange={(val) => onChange(i, 'school', val)} />
        <Field label="Location" value={v.location} onChange={(val) => onChange(i, 'location', val)} />
        <div className="grid grid-cols-2 gap-2">
          <Field label="Start" value={v.start} onChange={(val) => onChange(i, 'start', val)} />
          <Field label="End" value={v.end} onChange={(val) => onChange(i, 'end', val)} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field
            label="Right Label (e.g. CGPA)"
            value={v.rightLabel}
            onChange={(val) => onChange(i, 'rightLabel', val)}
          />
          <Field
            label="Right Value (e.g. 8.94 / 10.00)"
            value={v.rightValue}
            onChange={(val) => onChange(i, 'rightValue', val)}
          />
        </div>
        <Field label="Details (optional)" value={v.details} onChange={(val) => onChange(i, 'details', val)} />
      </>
    ),
    template: () => ({
      degree: '',
      school: '',
      location: '',
      start: '',
      end: '',
      rightLabel: '',
      rightValue: '',
      details: '',
    }),
  },
  skills: {
    title: 'Skills',
    addLabel: 'Add Skill Group',
    empty: 'No skills added yet.',
    fields: (v, i, onChange) => (
      <>
        <Field label="Category (e.g. Languages)" value={v.category} onChange={(val) => onChange(i, 'category', val)} />
        <Field label="Items (comma separated)" value={v.items} onChange={(val) => onChange(i, 'items', val)} />
      </>
    ),
    template: () => ({ category: '', items: '' }),
  },
  projects: {
    title: 'Projects',
    addLabel: 'Add Project',
    empty: 'No projects added yet.',
    fields: (v, i, onChange) => (
      <>
        <Field label="Project Name" value={v.name} onChange={(val) => onChange(i, 'name', val)} />
        <Field label="Year" value={v.year} onChange={(val) => onChange(i, 'year', val)} />
        <Field label="Tech Stack (comma separated)" value={v.tech} onChange={(val) => onChange(i, 'tech', val)} />
        <BulletsField
          label="Highlights (one per line)"
          value={v.bullets}
          onChange={(val) => onChange(i, 'bullets', val)}
        />
      </>
    ),
    template: () => ({ name: '', year: '', tech: '', bullets: [''] }),
  },
  certifications: {
    title: 'Certifications',
    addLabel: 'Add Certification',
    empty: 'No certifications added yet.',
    fields: (v, i, onChange) => (
      <>
        <Field label="Name" value={v.name} onChange={(val) => onChange(i, 'name', val)} />
        <Field label="Issuer" value={v.issuer} onChange={(val) => onChange(i, 'issuer', val)} />
        <Field label="Date" value={v.date} onChange={(val) => onChange(i, 'date', val)} />
      </>
    ),
    template: () => ({ name: '', issuer: '', date: '' }),
  },
  languages: {
    title: 'Languages',
    addLabel: 'Add Language',
    empty: 'No languages added yet.',
    fields: (v, i, onChange) => (
      <>
        <Field label="Language" value={v.name} onChange={(val) => onChange(i, 'name', val)} />
        <Field label="Level" value={v.level} onChange={(val) => onChange(i, 'level', val)} />
      </>
    ),
    template: () => ({ name: '', level: '' }),
  },
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

function FontGroup({ group }) {
  return (
    <>
      <div className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {group}
      </div>
      {FONTS.filter((f) => f.group === group).map((f) => (
        <SelectItem key={f.id} value={f.id}>
          <span style={{ fontFamily: f.css }}>{f.name}</span>
        </SelectItem>
      ))}
    </>
  )
}

export default function Form({ data, onChange, onImport, onExport, onOpenTemplates }) {
  const [openSections, setOpenSections] = useState(() =>
    Object.keys(SECTION_DEFS).reduce((acc, k) => ({ ...acc, [k]: true }), { personal: true, style: true })
  )

  const toggle = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))

  const setPersonal = (key, value) => onChange({ ...data, personal: { ...data.personal, [key]: value } })
  const setMeta = (key, value) => onChange({ ...data, meta: { ...data.meta, [key]: value } })
  const setItem = (section, index, key, value) => {
    const arr = data[section].map((it, i) => (i === index ? { ...it, [key]: value } : it))
    onChange({ ...data, [section]: arr })
  }
  const removeItem = (section, index) => {
    onChange({ ...data, [section]: data[section].filter((_, i) => i !== index) })
  }
  const addItem = (section) => {
    const def = SECTION_DEFS[section]
    const newItem = { ...def.template(), id: crypto.randomUUID() }
    onChange({ ...data, [section]: [...data[section], newItem] })
  }

  const activeTheme = getTheme(data.meta.themeId)

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-3 p-4"
    >
      {/* Import / Export */}
      <motion.div variants={item} className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={onImport} className="w-full">
          Import JSON
        </Button>
        <Button variant="secondary" onClick={onExport} className="w-full">
          Export JSON
        </Button>
      </motion.div>

      {/* Template, theme, style */}
      <motion.div variants={item}>
        <CollapsibleSection
          title="Template & Style"
          icon={Sparkles}
          open={openSections.style}
          onToggle={() => toggle('style')}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3 rounded-md border border-input bg-card px-3 py-2.5 shadow-sm">
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Template
                </div>
                <div className="truncate text-sm font-semibold">
                  {getTemplate(data.meta.template).name}
                </div>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={onOpenTemplates}>
                <LayoutTemplate className="h-4 w-4" />
                Browse
              </Button>
            </div>

            <FieldLabel label="Theme" icon={Palette}>
              <Select
                value={data.meta.themeId}
                onValueChange={(v) => {
                  const theme = getTheme(v)
                  onChange({
                    ...data,
                    meta: { ...data.meta, themeId: v, accent: theme.accent },
                  })
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pick a theme" />
                </SelectTrigger>
                <SelectContent>
                  {THEMES.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-block h-3 w-3 rounded-full border"
                          style={{ background: t.accent }}
                        />
                        {t.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldLabel>

            <div className="grid grid-cols-2 gap-2">
              <FieldLabel label="Heading Font" icon={Type}>
                <Select
                  value={data.meta.fontHeading || '__theme__'}
                  onValueChange={(v) => setMeta('fontHeading', v === '__theme__' ? '' : v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__theme__">Theme default</SelectItem>
                    {FONT_GROUPS.map((group) => (
                      <FontGroup key={group} group={group} />
                    ))}
                  </SelectContent>
                </Select>
              </FieldLabel>
              <FieldLabel label="Body Font">
                <Select
                  value={data.meta.fontBody || '__theme__'}
                  onValueChange={(v) => setMeta('fontBody', v === '__theme__' ? '' : v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__theme__">Theme default</SelectItem>
                    {FONT_GROUPS.map((group) => (
                      <FontGroup key={group} group={group} />
                    ))}
                  </SelectContent>
                </Select>
              </FieldLabel>
            </div>

            <FieldLabel label={`Accent override (theme: ${activeTheme.name})`}>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.meta.accent || activeTheme.accent}
                  onChange={(e) => setMeta('accent', e.target.value)}
                  className="h-9 w-14 cursor-pointer rounded-md border border-input bg-card p-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setMeta('accent', activeTheme.accent)}
                >
                  Reset
                </Button>
              </div>
            </FieldLabel>

            <div className="grid grid-cols-2 gap-2">
              <FieldLabel label="Vertical" icon={Ruler}>
                <Select
                  value={String(data.meta.marginV ?? 10)}
                  onValueChange={(v) => setMeta('marginV', Number(v))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MARGIN_OPTIONS.map((m) => (
                      <SelectItem key={m} value={String(m)}>
                        {m === 0 ? 'None' : `${m} mm`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldLabel>
              <FieldLabel label="Horizontal">
                <Select
                  value={String(data.meta.marginH ?? 10)}
                  onValueChange={(v) => setMeta('marginH', Number(v))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MARGIN_OPTIONS.map((m) => (
                      <SelectItem key={m} value={String(m)}>
                        {m === 0 ? 'None' : `${m} mm`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldLabel>
            </div>
          </div>
        </CollapsibleSection>
      </motion.div>

      {/* Personal */}
      <motion.div variants={item}>
        <CollapsibleSection
          title="Personal Details"
          icon={User}
          open={openSections.personal}
          onToggle={() => toggle('personal')}
        >
          <div className="space-y-2.5">
            <Field label="Full Name" value={data.personal.fullName} onChange={(v) => setPersonal('fullName', v)} />
            <Field label="Job Title" value={data.personal.jobTitle} onChange={(v) => setPersonal('jobTitle', v)} />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Email" value={data.personal.email} onChange={(v) => setPersonal('email', v)} />
              <Field label="Phone" value={data.personal.phone} onChange={(v) => setPersonal('phone', v)} />
            </div>
            <Field label="Location" value={data.personal.location} onChange={(v) => setPersonal('location', v)} />
            <Field label="Website" value={data.personal.website} onChange={(v) => setPersonal('website', v)} />
            <div className="grid grid-cols-2 gap-2">
              <Field label="LinkedIn" value={data.personal.linkedin} onChange={(v) => setPersonal('linkedin', v)} />
              <Field label="GitHub" value={data.personal.github} onChange={(v) => setPersonal('github', v)} />
            </div>
            <FieldTextArea
              label="Professional Summary"
              value={data.personal.summary}
              onChange={(v) => setPersonal('summary', v)}
              rows={3}
            />
          </div>
        </CollapsibleSection>
      </motion.div>

      {/* Repeating sections */}
      {Object.entries(SECTION_DEFS).map(([key, def]) => {
        const Icon = sectionIcons[key]
        return (
          <motion.div variants={item} key={key}>
            <CollapsibleSection
              title={def.title}
              icon={Icon}
              badge={data[key].length}
              open={openSections[key]}
              onToggle={() => toggle(key)}
            >
              <div className="space-y-2.5">
                <AnimatePresence initial={false}>
                  {data[key].length === 0 && (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-muted-foreground italic"
                    >
                      {def.empty}
                    </motion.p>
                  )}
                  {data[key].map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      layout
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -24, scale: 0.96 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="rounded-lg border bg-muted/40 p-3"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold">
                          {entry.role || entry.degree || entry.category || entry.name || `${def.title} ${index + 1}`}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(key, index)}
                          aria-label="Remove"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      {def.fields(entry, index, (i, field, value) => setItem(key, i, field, value))}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => addItem(key)}>
                  <Plus className="h-4 w-4" />
                  {def.addLabel}
                </Button>
              </div>
            </CollapsibleSection>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function CollapsibleSection({ title, icon: Icon, badge, open, onToggle, children }) {
  return (
    <Card>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-2 p-3 text-left transition-colors hover:bg-accent/50 rounded-lg"
      >
        {Icon && <Icon className="h-4 w-4 text-primary" />}
        <span className="flex-1 text-sm font-semibold">{title}</span>
        {badge != null && (
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
            {badge}
          </span>
        )}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-muted-foreground">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <CardContent className="pt-0">{children}</CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

function FieldLabel({ label, icon: Icon, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </span>
      {children}
    </label>
  )
}

function Field({ label, value, onChange }) {
  return <FieldLabel label={label}>
    <Input value={value || ''} onChange={(e) => onChange(e.target.value)} />
  </FieldLabel>
}

function FieldTextArea({ label, value, onChange, rows = 3 }) {
  return <FieldLabel label={label}>
    <Textarea rows={rows} value={value || ''} onChange={(e) => onChange(e.target.value)} />
  </FieldLabel>
}

function BulletsField({ label, value, onChange }) {
  const lines = Array.isArray(value) ? value : []
  return <FieldLabel label={label}>
    <Textarea
      rows={Math.max(3, lines.length + 1)}
      value={lines.join('\n')}
      onChange={(e) => onChange(e.target.value.split('\n'))}
    />
  </FieldLabel>
}
