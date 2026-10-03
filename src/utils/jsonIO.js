import { DEFAULT_RESUME, clampMargin } from '../data/defaultResume'
import { THEMES, FONTS } from '../data/themes'

export function downloadJSON(data, fileName = 'resume') {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName || 'resume'}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function loadJSONFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result)
        if (!data || typeof data !== 'object' || !data.personal) {
          reject(new Error('Invalid resume JSON file'))
          return
        }
        resolve(data)
      } catch {
        reject(new Error('Could not parse JSON file'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

// Merge imported data over defaults so missing keys don't break templates
export function sanitizeResume(raw) {
  const base = structuredClone(DEFAULT_RESUME)
  return {
    meta: {
      ...base.meta,
      ...(raw.meta || {}),
      themeId: THEMES.some((t) => t.id === raw.meta?.themeId) ? raw.meta.themeId : base.meta.themeId,
      accent: typeof raw.meta?.accent === 'string' ? raw.meta.accent : base.meta.accent,
      fontHeading: FONTS.some((f) => f.id === raw.meta?.fontHeading) ? raw.meta.fontHeading : '',
      fontBody: FONTS.some((f) => f.id === raw.meta?.fontBody) ? raw.meta.fontBody : '',
      marginV: clampMargin(raw.meta?.marginV, base.meta.marginV),
      marginH: clampMargin(raw.meta?.marginH, base.meta.marginH),
    },
    personal: { ...base.personal, ...(raw.personal || {}) },
    experience: Array.isArray(raw.experience) ? raw.experience : [],
    education: Array.isArray(raw.education) ? raw.education : [],
    skills: Array.isArray(raw.skills) ? raw.skills : [],
    projects: Array.isArray(raw.projects) ? raw.projects : [],
    certifications: Array.isArray(raw.certifications) ? raw.certifications : [],
    languages: Array.isArray(raw.languages) ? raw.languages : [],
  }
}

