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
        <div className="flex items-center gap-3">
          <span className="text-slate-500 font-medium text-sm mb-1 leading-none whitespace-nowrap">{leftSide}</span>
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
              className="absolute h-6 w-[18px] bg-emerald-400 rounded-full border-[3px] border-emerald-50 shadow-md pointer-events-none flex items-center justify-center transition-all"
              style={{ left: `calc(${((value - min) / (max - min)) * 100}%)`, transform: 'translateX(-50%)' }}
            >
              <div className="flex gap-[2px]">
                 <div className="w-[1px] h-2 bg-white rounded-full opacity-90" />
                 <div className="w-[1px] h-2 bg-white rounded-full opacity-90" />
              </div>
            </div>
          </div>
          <span className="text-slate-500 font-medium text-sm mb-1 leading-none whitespace-nowrap">{rightSide}</span>
        </div>
        {(leftText || rightText) && (
          <div className="flex justify-between mt-1 text-xs text-slate-500 font-medium">
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
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-5 py-4">
        <h2 className="text-[15px] font-medium text-slate-800">Design & Font</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100" onClick={onContinue}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-5 space-y-6 pb-20">
        
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
          label="Section Spacing: 1" 
          value={1} 
          min={1} 
          max={7} 
          onChange={(v) => {}}
          leftText="compact"
          rightText="more space"
        />

        <hr className="border-slate-100" />

        {/* COLORS */}
        <div className="space-y-3">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Colors</div>
          <div className="flex flex-wrap gap-2.5">
            {COLORS.map((c, i) => {
              const active = data.meta.accent === c || (!data.meta.accent && i === 0);
              return (
                <button
                  key={c}
                  onClick={() => setAccent(c)}
                  className={cn(
                    "w-9 h-9 rounded-full border-[5px] border-[#1a1a1a] relative transition-transform hover:scale-105 shadow-sm",
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
            <button className="w-9 h-9 rounded-full bg-emerald-400 flex items-center justify-center hover:bg-emerald-500 transition-colors shadow-sm">
               <Plus className="w-5 h-5 text-white" />
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
            <SelectTrigger className="w-full text-base h-11 border-slate-200">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {FONTS.map(f => (
                <SelectItem key={f.id} value={f.id} style={{ fontFamily: f.css }}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* FONT SIZE */}
        <CustomSlider 
          label="Font Size: Medium" 
          value={3} 
          min={1} 
          max={5} 
          onChange={(v) => {}}
          leftSide="- A"
          rightSide="+ A"
        />

        {/* LINE HEIGHT */}
        <CustomSlider 
          label="Line Height: 1" 
          value={2} 
          min={1} 
          max={5} 
          onChange={(v) => {}}
          leftText="condensed"
          rightText="spacious"
        />

        <hr className="border-slate-100" />

        {/* COLUMN LAYOUT */}
        <div className="space-y-3">
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Column Layout:</div>
          <div className="flex gap-2.5">
            {/* Box 1: Single */}
            <button onClick={() => setTemplate('single-column')} className="flex flex-col items-center gap-1.5 group">
              <div className={cn("w-[42px] h-[52px] border p-1 flex gap-1 bg-white transition-colors", data.meta.template === 'single-column' ? 'border-emerald-500' : 'border-slate-200 group-hover:border-slate-300')}>
                 <div className="bg-slate-200 h-full flex-1 rounded-[1px]" />
              </div>
              <span className="text-[11px] font-medium text-slate-600">1</span>
            </button>

            {/* Box 2: Two Column (active style) */}
            <button onClick={() => setTemplate('two-column')} className="flex flex-col items-center gap-1.5 group">
              <div className={cn("w-[42px] h-[52px] border p-1 flex gap-1 bg-white transition-colors", data.meta.template === 'two-column' ? 'border-emerald-500' : 'border-slate-200 group-hover:border-slate-300')}>
                 <div className="bg-slate-100 h-full w-[60%] rounded-[1px]" />
                 <div className="bg-emerald-400 h-full w-[40%] rounded-[1px] flex flex-col gap-[2px] p-[1.5px]">
                     <div className="bg-emerald-600 h-1.5 w-full rounded-[0.5px] opacity-70" />
                 </div>
              </div>
              <span className="text-[11px] font-medium text-slate-600">2</span>
            </button>

            {/* Box 3: Three Dummy */}
            <button className="flex flex-col items-center gap-1.5 group opacity-60">
              <div className="w-[42px] h-[52px] border border-slate-200 p-1 flex gap-1 bg-white">
                 <div className="bg-slate-100 h-full w-[40%] rounded-[1px]" />
                 <div className="bg-slate-200 h-full w-[60%] rounded-[1px]" />
              </div>
              <span className="text-[11px] font-medium text-slate-600">3</span>
            </button>

            {/* Box 4: Four Dummy */}
            <button className="flex flex-col items-center gap-1.5 group opacity-60">
              <div className="w-[42px] h-[52px] border border-slate-200 p-1 flex gap-1 bg-white">
                 <div className="bg-slate-100 h-full w-[50%] rounded-[1px]" />
                 <div className="bg-slate-200 h-full w-[50%] rounded-[1px]" />
              </div>
              <span className="text-[11px] font-medium text-slate-600">4</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
