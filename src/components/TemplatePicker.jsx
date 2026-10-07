import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TEMPLATES, TEMPLATE_CATEGORIES } from '@/templates'
import { PAGE_SIZES, getPageSize } from '@/data/pageSizes'
import { cn } from '@/lib/utils'

const PX_PER_MM = 96 / 25.4
const THUMB_WIDTH_PX = 190

function TemplateThumb({ template, data, pageSize }) {
  const Template = template.component
  const scale = THUMB_WIDTH_PX / (pageSize.widthMm * PX_PER_MM)
  const height = Math.round(THUMB_WIDTH_PX * (pageSize.heightMm / pageSize.widthMm))

  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{ width: THUMB_WIDTH_PX, height }}
      aria-hidden="true"
    >
      <div
        style={{
          width: `${pageSize.widthMm}mm`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <Template data={data} />
      </div>
    </div>
  )
}

function TemplateCard({ template, data, pageSize, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="group flex flex-col items-center gap-3 rounded-lg p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <span
        className={cn(
          'relative block overflow-hidden rounded-sm border-2 bg-white shadow-lg transition-colors duration-200',
          selected ? 'border-blue-600' : 'border-slate-200 group-hover:border-blue-400'
        )}
      >
        <TemplateThumb template={template} data={data} pageSize={pageSize} />
        {selected && (
          <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
            <Check className="h-4 w-4" />
          </span>
        )}
      </span>
      <span
        className={cn(
          'text-sm transition-colors',
          selected ? 'font-semibold text-blue-600' : 'font-medium text-slate-700 group-hover:text-slate-900'
        )}
      >
        {template.name}
      </span>
    </button>
  )
}

export default function TemplatePicker({ open, data, onChange, onClose }) {
  const [pending, setPending] = useState(data.meta.template)
  const pageSize = getPageSize(data.meta.pageSize)

  useEffect(() => {
    if (open) setPending(data.meta.template)
  }, [open, data.meta.template])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  const handleContinue = () => {
    if (pending !== data.meta.template) {
      onChange({ ...data, meta: { ...data.meta, template: pending } })
    }
    onClose()
  }

  const setPageSize = (id) => {
    onChange({ ...data, meta: { ...data.meta, pageSize: id } })
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Select a template"
        >
          <motion.div
            className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-slate-900">Select a template</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto bg-slate-100 px-6 py-6">
              <div className="mx-auto max-w-3xl space-y-8">
                {TEMPLATE_CATEGORIES.map((category) => (
                  <section key={category}>
                    <h3 className="mb-4 text-base font-semibold text-slate-900">{category}</h3>
                    <div className="flex flex-wrap gap-6">
                      {TEMPLATES.filter((t) => t.category === category).map((t) => (
                        <TemplateCard
                          key={t.id}
                          template={t}
                          data={data}
                          pageSize={pageSize}
                          selected={pending === t.id}
                          onSelect={() => setPending(t.id)}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-slate-200 bg-white px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Document size:</span>
                <Select value={data.meta.pageSize} onValueChange={setPageSize}>
                  <SelectTrigger className="h-9 w-[132px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGE_SIZES.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Resume language:</span>
                <div className="flex h-9 w-[132px] items-center rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground">
                  English (US)
                </div>
              </div>

              <Button className="ml-auto" onClick={handleContinue}>
                Continue Editing
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
