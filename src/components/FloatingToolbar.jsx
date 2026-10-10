import { Eye, FileDown, Link2 } from 'lucide-react'

export default function FloatingToolbar({ onTogglePreview, onDownload, onShare }) {
  return (
    <div className="floating-toolbar absolute right-6 top-6 z-20 flex flex-col gap-3">
      <button
        className="w-12 h-12 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-md transition-all duration-200"
        title="Toggle Preview"
        onClick={onTogglePreview}
      >
        <Eye className="w-5 h-5" />
      </button>
      <button
        className="w-12 h-12 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-md transition-all duration-200"
        title="Download PDF"
        onClick={onDownload}
      >
        <FileDown className="w-5 h-5" />
      </button>
      <button
        className="w-12 h-12 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-md transition-all duration-200"
        title="Copy Shareable Link"
        onClick={onShare}
      >
        <Link2 className="w-5 h-5" />
      </button>
    </div>
  )
}
