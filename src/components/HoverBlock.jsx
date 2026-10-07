import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ChevronUp, ChevronDown, Trash2, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function HoverBlock({ 
  children, 
  onAdd, 
  onDelete, 
  onMoveUp, 
  onMoveDown,
  className,
  tagName: Tag = 'div'
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Tag 
      className={cn("group relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The border */}
      <div 
        className={cn(
          "absolute -inset-1.5 pointer-events-none rounded-sm border transition-colors",
          isHovered ? "border-emerald-400 border-dashed bg-emerald-50/10" : "border-transparent"
        )} 
      />

      {/* The floating toolbar */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-11 left-0 z-50 flex h-9 items-center rounded-md bg-white shadow-md border border-gray-100 overflow-hidden no-print"
          >
            {onAdd && (
              <button 
                onClick={onAdd}
                className="flex h-full items-center gap-1.5 bg-emerald-400 px-3 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Entry
              </button>
            )}
            
            <div className="flex items-center px-1">
              {onMoveUp && (
                <button 
                  onClick={onMoveUp}
                  className="flex h-7 w-7 items-center justify-center rounded text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  title="Move Up"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
              )}
              {onMoveDown && (
                <button 
                  onClick={onMoveDown}
                  className="flex h-7 w-7 items-center justify-center rounded text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  title="Move Down"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              )}
              {onDelete && (
                <button 
                  onClick={onDelete}
                  className="flex h-7 w-7 items-center justify-center rounded text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* The bottom add button (+) */}
      <AnimatePresence>
        {isHovered && onAdd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-50 no-print"
          >
            <button 
              onClick={onAdd}
              className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-400 bg-white text-emerald-500 hover:bg-emerald-50 hover:scale-110 transition-all shadow-sm"
              title="Add Below"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Tag>
  )
}
