import { X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FONTS } from '@/data/themes'
import { cn } from '@/lib/utils'

const COLORS = [
  '#0084ff', '#5e686c', '#20a161', '#cd280b', '#1a6cd1',
  '#3552db', '#ec5b00', '#7e24a4', '#00a3ad', '#b57a17',
  '#007aff', '#19804e'
]

function CustomSlider({ label, value, min, max, onChange, leftText, rightText, leftSide = "-", rightSide = "+" }) {
  return (
    <div className="space-y-3">
      {label && <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{label}</div>}
      <div className="px-1">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium text-[11px] mb-1 leading-none whitespace-nowrap">{leftSide}</span>
          <div className="flex-1 relative h-6 flex items-center">
             <input 
              type="range" 
              min={min} 
              max={max} 
              value={value} 
              onChange={(e) => onChange(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
            />
            {/* Track base */}
            <div className="absolute left-0 right-0 h-[3px] bg-slate-600 flex overflow-hidden rounded-full">
               {Array.from({length: max - min}).map((_, i) => (
                 <div key={i} className="flex-1 border-r border-slate-50 last:border-r-0" />
               ))}
            </div>
            {/* custom thumb */}
            <div 
              className="absolute h-5 w-[14px] bg-emerald-400 rounded-full border-2 border-emerald-50 shadow-md pointer-events-none flex items-center justify-center transition-all"
              style={{ left: `calc(${((value - min) / (max - min)) * 100}%)`, transform: 'translateX(-50%)' }}
            >
              <div className="flex gap-[2px]">
                 <div className="w-[1px] h-1.5 bg-white rounded-full opacity-90" />
                 <div className="w-[1px] h-1.5 bg-white rounded-full opacity-90" />
              </div>
            </div>
          </div>
          <span className="text-slate-500 font-medium text-[11px] mb-1 leading-none whitespace-nowrap">{rightSide}</span>
        </div>
        {(leftText || rightText) && (
          <div className="flex justify-between mt-1 text-[10px] text-slate-400 font-medium">
            <span>{leftText}</span>
            <span>{rightText}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function DesignSidebar({ data, onChange, onContinue }) {
  const setTemplate = (id) => {
    onChange({ ...data, meta: { ...data.meta, template: id } })
  }

  const setAccent = (c) => {
    onChange({ ...data, meta: { ...data.meta, accent: c } })
  }

  const setFont = (v) => {
    onChange({ ...data, meta: { ...data.meta, fontBody: v, fontHeading: v } })
  }

  return (
    <div className="flex h-full flex-col bg-white overflow-hidden w-full">
      <div className="sticky top-0 z-10 flex items-center justify-center bg-white px-4 py-3">
        <h2 className="text-sm font-medium text-slate-800">Design & Font</h2>
        <Button variant="ghost" size="icon" className="absolute right-3 h-7 w-7 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100" onClick={onContinue}>
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 space-y-5 pb-10">
        
        {/* PAGE MARGINS */}
        <CustomSlider 
          label={`Page Margins: ${data.meta.marginV ? Math.min(7, Math.max(1, Math.floor(data.meta.marginV / 3))) : 4}`}
          value={data.meta.marginV ? Math.min(7, Math.max(1, Math.floor(data.meta.marginV / 3))) : 4} 
          min={1} 
          max={7} 
          onChange={(v) => onChange({ ...data, meta: { ...data.meta, marginV: v * 3, marginH: v * 3 } })}
          leftText="narrow"
          rightText="wide"
        />

        {/* SECTION SPACING */}
        <CustomSlider 
          label={`Section Spacing: ${data.meta.sectionSpacing || 3}`} 
          value={data.meta.sectionSpacing || 3} 
          min={1} 
          max={7} 
          onChange={(v) => onChange({ ...data, meta: { ...data.meta, sectionSpacing: v } })}
          leftText="compact"
          rightText="more space"
        />

        <hr className="border-slate-100" />

        {/* COLORS */}
        <div className="space-y-3">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Colors</div>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c, i) => {
              const active = data.meta.accent === c || (!data.meta.accent && i === 0);
              return (
                <button
                  key={c}
                  onClick={() => setAccent(c)}
                  className={cn(
                    "w-7 h-7 rounded-full border-[3px] border-[#1a1a1a] relative transition-transform hover:scale-105 shadow-sm",
                  )}
                  style={{ backgroundColor: c }}
                >
                  {active && (
                    <span className="absolute -top-1.5 -right-1.5 bg-white rounded-full p-[1px] shadow-sm border border-slate-100">
                      <X className="w-2.5 h-2.5 text-slate-800" strokeWidth={3}/>
                    </span>
                  )}
                </button>
              )
            })}
            <button className="w-7 h-7 rounded-full bg-emerald-400 flex items-center justify-center hover:bg-emerald-500 transition-colors shadow-sm">
               <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* FONT STYLE */}
        <div className="space-y-3">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Font Style</div>
          <Select 
            value={data.meta.fontBody || 'rubik'} 
            onValueChange={setFont}
          >
            <SelectTrigger className="w-full text-sm h-9 border-slate-200">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {FONTS.map(f => (
                <SelectItem key={f.id} value={f.id} style={{ fontFamily: f.css }} className="text-sm">
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* FONT SIZE */}
        {(() => {
          const sizes = ['Small', 'Medium-Small', 'Medium', 'Medium-Large', 'Large'];
          const val = data.meta.fontSize || 3;
          return (
            <CustomSlider 
              label={`Font Size: ${sizes[val - 1]}`} 
              value={val} 
              min={1} 
              max={5} 
              onChange={(v) => onChange({ ...data, meta: { ...data.meta, fontSize: v } })}
              leftSide="- A"
              rightSide="+ A"
            />
          )
        })()}

        {/* LINE HEIGHT */}
        <CustomSlider 
          label={`Line Height: ${data.meta.lineHeight || 2}`} 
          value={data.meta.lineHeight || 2} 
          min={1} 
          max={5} 
          onChange={(v) => onChange({ ...data, meta: { ...data.meta, lineHeight: v } })}
          leftText="condensed"
          rightText="spacious"
        />

        <hr className="border-slate-100" />

        {/* COLUMN LAYOUT */}
        <div className="space-y-3">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Column Layout:</div>
          <div className="flex gap-2">
            {/* Box 1: 75/25 */}
            <button onClick={() => setTemplate('two-column-75')} className="flex flex-col items-center gap-1 group">
              <div className={cn("w-[36px] h-[46px] border p-1 flex justify-between bg-white transition-colors", data.meta.template === 'two-column-75' ? 'border-emerald-500' : 'border-slate-200 group-hover:border-slate-300')}>
                 <div className="bg-slate-200/60 h-full rounded-[1px]" style={{ width: 18 }} />
                 <div className={cn("h-full rounded-[1px]", data.meta.template === 'two-column-75' ? 'bg-emerald-400' : 'bg-slate-300/80')} style={{ width: 6 }} />
              </div>
              <span className="text-[10px] font-medium text-slate-600">1</span>
            </button>

            {/* Box 2: 65/35 (Active Default) */}
            <button onClick={() => setTemplate('two-column')} className="flex flex-col items-center gap-1 group">
              <div className={cn("w-[36px] h-[46px] border p-1 flex justify-between bg-white transition-colors", data.meta.template === 'two-column' || !data.meta.template ? 'border-emerald-500' : 'border-slate-200 group-hover:border-slate-300')}>
                 <div className="bg-slate-200/60 h-full rounded-[1px]" style={{ width: 16 }} />
                 <div className={cn("h-full rounded-[1px]", data.meta.template === 'two-column' || !data.meta.template ? 'bg-emerald-400' : 'bg-slate-300/80')} style={{ width: 8 }} />
              </div>
              <span className="text-[10px] font-medium text-slate-600">2</span>
            </button>

            {/* Box 3: 55/45 */}
            <button onClick={() => setTemplate('two-column-55')} className="flex flex-col items-center gap-1 group">
              <div className={cn("w-[36px] h-[46px] border p-1 flex justify-between bg-white transition-colors", data.meta.template === 'two-column-55' ? 'border-emerald-500' : 'border-slate-200 group-hover:border-slate-300')}>
                 <div className="bg-slate-200/60 h-full rounded-[1px]" style={{ width: 14 }} />
                 <div className={cn("h-full rounded-[1px]", data.meta.template === 'two-column-55' ? 'bg-emerald-400' : 'bg-slate-300/80')} style={{ width: 10 }} />
              </div>
              <span className="text-[10px] font-medium text-slate-600">3</span>
            </button>

            {/* Box 4: 50/50 */}
            <button onClick={() => setTemplate('two-column-50')} className="flex flex-col items-center gap-1 group">
              <div className={cn("w-[36px] h-[46px] border p-1 flex justify-between bg-white transition-colors", data.meta.template === 'two-column-50' ? 'border-emerald-500' : 'border-slate-200 group-hover:border-slate-300')}>
                 <div className="bg-slate-200/60 h-full rounded-[1px]" style={{ width: 12 }} />
                 <div className={cn("h-full rounded-[1px]", data.meta.template === 'two-column-50' ? 'bg-emerald-400' : 'bg-slate-300/80')} style={{ width: 12 }} />
              </div>
              <span className="text-[10px] font-medium text-slate-600">4</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
