import { Check, X } from 'lucide-react'
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
const THUMB_WIDTH_PX = 145

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
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: `${pageSize.widthMm}mm`,
          height: `${pageSize.heightMm}mm`,
          transform: `scale(${scale})`,
        }}
      >
        <Template data={data} />
      </div>
    </div>
  )
}

function TemplateCard({ template, data, pageSize, selected, onSelect }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(); } }}
      aria-pressed={selected}
      className="group flex flex-col items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full cursor-pointer"
    >
      <div
        className={cn(
          'relative block overflow-hidden rounded-sm border-2 bg-white shadow-sm transition-colors duration-200 w-full flex justify-center',
          selected ? 'border-primary' : 'border-slate-200 group-hover:border-primary/50'
        )}
      >
        <TemplateThumb template={template} data={data} pageSize={pageSize} />
        {selected && (
          <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
            <Check className="h-3 w-3" />
          </span>
        )}
      </div>
      <span
        className={cn(
          'text-xs transition-colors',
          selected ? 'font-semibold text-primary' : 'font-medium text-slate-700 group-hover:text-foreground'
        )}
      >
        {template.name}
      </span>
    </div>
  )
}

export default function TemplateSidebar({ data, onChange, onContinue }) {
  const pageSize = getPageSize(data.meta.pageSize)

  const setPageSize = (id) => {
    onChange({ ...data, meta: { ...data.meta, pageSize: id } })
  }
  
  const setTemplate = (id) => {
    onChange({ ...data, meta: { ...data.meta, template: id } })
  }

  return (
    <div className="flex h-full flex-col bg-slate-50 w-full">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3 shadow-sm">
        <h2 className="text-sm font-bold">Templates</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100" onClick={onContinue}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {TEMPLATES.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              data={data}
              pageSize={pageSize}
              selected={data.meta.template === t.id}
              onSelect={() => setTemplate(t.id)}
            />
          ))}
        </div>
      </div>

      <div className="border-t bg-white p-4 space-y-4 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Document size</label>
          <div className="flex flex-1 rounded-md border border-slate-200 p-0.5 bg-slate-100/50">
            {PAGE_SIZES.map((p) => (
              <button
                key={p.id}
                onClick={() => setPageSize(p.id)}
                className={cn(
                  "flex-1 rounded text-[11px] font-medium py-1.5 transition-colors",
                  data.meta.pageSize === p.id 
                    ? "bg-white text-slate-800 shadow-sm border border-slate-200/50" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Resume language</label>
          <Select value="en">
            <SelectTrigger className="w-full h-8 text-[11px] bg-transparent border-slate-200">
              <SelectValue placeholder="English (US)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en" className="text-[11px]">English (US)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full bg-[#20b26f] hover:bg-[#1da064] text-white h-9 text-sm rounded-md font-medium" 
          onClick={onContinue}
        >
          Continue Editing
        </Button>
      </div>
    </div>
  )
}
