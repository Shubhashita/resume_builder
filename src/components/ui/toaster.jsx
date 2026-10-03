import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

const variants = {
  success: { icon: CheckCircle2, className: 'border-green-200 bg-green-50 text-green-900' },
  error: { icon: AlertCircle, className: 'border-red-200 bg-red-50 text-red-900' },
  default: { icon: Info, className: 'border-border bg-card text-foreground' },
}

export function Toaster({ toast }) {
  return (
    <div className="toast no-print pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={cn(
              'pointer-events-auto flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium shadow-lg',
              (variants[toast.variant] || variants.default).className
            )}
          >
            {(() => {
              const Icon = (variants[toast.variant] || variants.default).icon
              return <Icon className="h-4 w-4 shrink-0" />
            })()}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
