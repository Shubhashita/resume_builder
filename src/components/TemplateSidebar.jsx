import { Check, X, Info } from 'lucide-react'
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
const THUMB_WIDTH_PX = 100

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
      className="group flex flex-col items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20b26f] w-full cursor-pointer"
    >
      <div
        className={cn(
          'relative block overflow-hidden border-2 transition-colors duration-200 w-full flex justify-center bg-white',
          selected ? 'border-[#20b26f]' : 'border-transparent hover:border-slate-200'
        )}
      >
        <div className={cn("overflow-hidden w-full h-full", !selected && "border border-slate-100 shadow-sm")}>
          <TemplateThumb template={template} data={data} pageSize={pageSize} />
        </div>
        {selected && (
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-[#20b26f] rotate-45 flex items-start justify-center pt-[6px]">
            <Check className="h-3.5 w-3.5 text-white -rotate-45 ml-[1px]" strokeWidth={4} />
          </div>
        )}
      </div>
      <span
        className={cn(
          'text-xs font-medium transition-colors',
          selected ? 'text-[#20b26f]' : 'text-slate-700 group-hover:text-slate-900'
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
    <div className="flex h-full flex-col bg-white w-full">
      <div className="sticky top-0 z-10 flex items-center justify-center bg-white px-4 py-3">
        <h2 className="text-sm font-medium text-slate-800">Select a template</h2>
        <Button variant="ghost" size="icon" className="absolute right-3 h-7 w-7 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100" onClick={onContinue}>
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
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

      <div className="bg-white px-4 py-4 space-y-5 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <Button 
          className="w-full bg-[#20b26f] hover:bg-[#1da064] text-white h-9 text-[13px] rounded-md font-semibold transition-colors" 
          onClick={onContinue}
        >
          Continue Editing
        </Button>

        <div className="flex items-center justify-between">
          <label className="text-xs text-slate-700">Document size:</label>
          <div className="flex rounded-md border border-slate-200 p-0.5 bg-slate-100/50 w-[140px]">
            {PAGE_SIZES.map((p) => (
              <button
                key={p.id}
                onClick={() => setPageSize(p.id)}
                className={cn(
                  "flex-1 rounded text-xs font-medium py-1 transition-colors",
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
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-slate-700">Resume<br/>language:</label>
            <Info className="h-3 w-3 text-slate-400 mt-2" />
          </div>
          <Select value="en">
            <SelectTrigger className="w-[140px] h-8 text-xs bg-transparent border-slate-200 font-medium text-[#7c6ce2]">
              <SelectValue placeholder="English (US)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en" className="text-xs">English (US)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
