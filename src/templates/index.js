import SingleColumn from './SingleColumn'
import TwoColumn from './TwoColumn'

export const TEMPLATE_CATEGORIES = ['Double column', 'Single column']

export const TEMPLATES = [
  { id: 'two-column', name: 'Double Column', category: 'Double column', component: TwoColumn },
  { id: 'single-column', name: 'Single Column', category: 'Single column', component: SingleColumn },
]

export function getTemplate(id) {
  return TEMPLATES.find((t) => t.id === id) || TEMPLATES[0]
}
