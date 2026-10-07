import { getPageSize } from './pageSizes'

export const THEMES = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    accent: '#2563eb',
    fontBody: "'Inter', sans-serif",
    fontHeading: "'Inter', sans-serif",
    headingTransform: 'uppercase',
    headingWeight: '700',
    headingSpacing: '0.06em',
    nameSize: '20pt',
  },
  {
    id: 'classic-navy',
    name: 'Classic Navy',
    accent: '#1e3a5f',
    fontBody: "'Lato', sans-serif",
    fontHeading: "'Playfair Display', serif",
    headingTransform: 'none',
    headingWeight: '700',
    headingSpacing: '0.02em',
    nameSize: '22pt',
  },
  {
    id: 'elegant-green',
    name: 'Elegant Green',
    accent: '#2f5d50',
    fontBody: "'Lato', sans-serif",
    fontHeading: "'Cormorant Garamond', serif",
    headingTransform: 'none',
    headingWeight: '600',
    headingSpacing: '0.03em',
    nameSize: '23pt',
  },
  {
    id: 'minimal-black',
    name: 'Minimal Black',
    accent: '#111111',
    fontBody: "'Source Sans 3', sans-serif",
    fontHeading: "'Source Sans 3', sans-serif",
    headingTransform: 'uppercase',
    headingWeight: '600',
    headingSpacing: '0.1em',
    nameSize: '19pt',
  },
  {
    id: 'tech-mono',
    name: 'Tech Mono',
    accent: '#0f766e',
    fontBody: "'Inter', sans-serif",
    fontHeading: "'IBM Plex Mono', monospace",
    headingTransform: 'uppercase',
    headingWeight: '600',
    headingSpacing: '0.04em',
    nameSize: '18pt',
  },
  {
    id: 'warm-serif',
    name: 'Warm Serif',
    accent: '#7c2d12',
    fontBody: "'Open Sans', sans-serif",
    fontHeading: "'Merriweather', serif",
    headingTransform: 'none',
    headingWeight: '700',
    headingSpacing: '0.01em',
    nameSize: '21pt',
  },
  {
    id: 'beige-classy',
    name: 'Beige Classy',
    accent: '#8a6a3f',
    fontBody: "'Lato', sans-serif",
    fontHeading: "'Volkhov', serif",
    headingTransform: 'none',
    headingWeight: '700',
    headingSpacing: '0.02em',
    nameSize: '22pt',
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    accent: '#1d4ed8',
    fontBody: "'Rubik', sans-serif",
    fontHeading: "'Montserrat', sans-serif",
    headingTransform: 'uppercase',
    headingWeight: '700',
    headingSpacing: '0.05em',
    nameSize: '20pt',
  },
]

export const FONTS = [
  // Sans
  { id: 'inter', name: 'Inter', css: "'Inter', sans-serif", group: 'Sans' },
  { id: 'lato', name: 'Lato', css: "'Lato', sans-serif", group: 'Sans' },
  { id: 'open-sans', name: 'Open Sans', css: "'Open Sans', sans-serif", group: 'Sans' },
  { id: 'source-sans', name: 'Source Sans 3', css: "'Source Sans 3', sans-serif", group: 'Sans' },
  { id: 'montserrat', name: 'Montserrat', css: "'Montserrat', sans-serif", group: 'Sans' },
  { id: 'rubik', name: 'Rubik', css: "'Rubik', sans-serif", group: 'Sans' },
  { id: 'arimo', name: 'Arimo', css: "'Arimo', sans-serif", group: 'Sans' },
  { id: 'exo-2', name: 'Exo 2', css: "'Exo 2', sans-serif", group: 'Sans' },
  { id: 'chivo', name: 'Chivo', css: "'Chivo', sans-serif", group: 'Sans' },
  { id: 'oswald', name: 'Oswald', css: "'Oswald', sans-serif", group: 'Sans' },
  // Serif
  { id: 'bitter', name: 'Bitter', css: "'Bitter', serif", group: 'Serif' },
  { id: 'playfair', name: 'Playfair Display', css: "'Playfair Display', serif", group: 'Serif' },
  { id: 'merriweather', name: 'Merriweather', css: "'Merriweather', serif", group: 'Serif' },
  { id: 'cormorant', name: 'Cormorant Garamond', css: "'Cormorant Garamond', serif", group: 'Serif' },
  { id: 'volkhov', name: 'Volkhov', css: "'Volkhov', serif", group: 'Serif' },
  { id: 'gelasio', name: 'Gelasio', css: "'Gelasio', serif", group: 'Serif' },
  { id: 'tinos', name: 'Tinos', css: "'Tinos', serif", group: 'Serif' },
  // Mono
  { id: 'ibm-plex-mono', name: 'IBM Plex Mono', css: "'IBM Plex Mono', monospace", group: 'Mono' },
]

export const FONT_GROUPS = ['Sans', 'Serif', 'Mono']

export function getFont(id) {
  return FONTS.find((f) => f.id === id) || null
}

export function getTheme(id) {
  return THEMES.find((t) => t.id === id) || THEMES[0]
}

export function themeToCssVars(theme, data) {
  const bodyFont = getFont(data.meta.fontBody)
  const headingFont = getFont(data.meta.fontHeading)
  const page = getPageSize(data.meta.pageSize)
  return {
    '--page-w': `${page.widthMm}mm`,
    '--page-h': `${page.heightMm}mm`,
    '--font-body': bodyFont ? bodyFont.css : theme.fontBody,
    '--font-heading': headingFont ? headingFont.css : theme.fontHeading,
    '--accent': data.meta.accent || theme.accent,
    '--heading-transform': theme.headingTransform,
    '--heading-weight': theme.headingWeight,
    '--heading-spacing': theme.headingSpacing,
    '--name-size': theme.nameSize,
    '--margin-v': `${data.meta.marginV ?? 10}mm`,
    '--margin-h': `${data.meta.marginH ?? 10}mm`,
  }
}
