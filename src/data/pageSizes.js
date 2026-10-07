export const PAGE_SIZES = [
  { id: 'a4', name: 'A4', widthMm: 210, heightMm: 297, printSize: 'A4' },
  { id: 'letter', name: 'US Letter', widthMm: 215.9, heightMm: 279.4, printSize: 'US-Letter' },
]

export const DEFAULT_PAGE_SIZE = 'a4'

export function getPageSize(id) {
  return PAGE_SIZES.find((p) => p.id === id) || PAGE_SIZES[0]
}

export function clampPageSize(id, fallback = DEFAULT_PAGE_SIZE) {
  return PAGE_SIZES.some((p) => p.id === id) ? id : fallback
}
