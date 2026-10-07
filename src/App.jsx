import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileDown, FileJson, Upload, FileText, LayoutTemplate, Palette } from 'lucide-react'
import Form from './components/Form'
import TemplateSidebar from './components/TemplateSidebar'
import DesignSidebar from './components/DesignSidebar'
import { getTemplate } from './templates'
import { getPageSize } from './data/pageSizes'
import { DEFAULT_RESUME } from './data/defaultResume'
import { downloadJSON, loadJSONFromFile, sanitizeResume } from './utils/jsonIO'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Toaster } from './components/ui/toaster'
import { cn } from './lib/utils'

const STORAGE_KEY = 'resume-builder-data-v7'
const PAGE_STYLE_ID = 'resume-page-size-style'

const UI_THEMES = [
  { id: 'light', name: 'Light', colors: ['#ffffff', '#e8ecf2'] },
  { id: 'beige', name: 'Beige', colors: ['#fffdf6', '#e9dcbd'] },
  { id: 'blue', name: 'Blue', colors: ['#ffffff', '#c9dbf7'] },
  { id: 'dark', name: 'Dark', colors: ['#151c2f', '#0e1322'] },
]

function loadInitialData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return sanitizeResume(JSON.parse(saved))
  } catch {
    /* corrupted storage - fall through to default */
  }
  return structuredClone(DEFAULT_RESUME)
}

export default function App() {
  const [data, setData] = useState(loadInitialData)
  const [toast, setToast] = useState(null)
  const [uiTheme, setUiTheme] = useState(() => localStorage.getItem('resume-builder-ui-theme') || 'light')
  const [sidebarMode, setSidebarMode] = useState('editor')
  const fileRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  useEffect(() => {
    document.documentElement.setAttribute('data-ui-theme', uiTheme)
    localStorage.setItem('resume-builder-ui-theme', uiTheme)
  }, [uiTheme])

  // Keep the printed/PDF page size in sync with the selected document size
  useEffect(() => {
    let styleEl = document.getElementById(PAGE_STYLE_ID)
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = PAGE_STYLE_ID
      document.head.appendChild(styleEl)
    }
    styleEl.textContent = `@page { size: ${getPageSize(data.meta.pageSize).printSize}; margin: 0; }`
  }, [data.meta.pageSize])

  const showToast = useCallback((message, variant = 'default') => {
    setToast({ message, variant, id: Date.now() })
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const handleExport = useCallback(() => {
    const name = data.meta.fileName || data.personal.fullName || 'resume'
    downloadJSON(data, name)
    showToast('Resume JSON downloaded', 'success')
  }, [data, showToast])

  const handleImportClick = () => fileRef.current?.click()

  const handleImportFile = useCallback(
    async (e) => {
      const file = e.target.files?.[0]
      if (!file) return
      try {
        const raw = await loadJSONFromFile(file)
        setData(sanitizeResume(raw))
        showToast('Resume loaded from JSON', 'success')
      } catch (err) {
        showToast(err.message || 'Failed to load JSON', 'error')
      } finally {
        e.target.value = ''
      }
    },
    [showToast]
  )

  const handlePrint = () => window.print()

  const Template = getTemplate(data.meta.template).component
  const previewKey = `${data.meta.template}-${data.meta.themeId}`

  return (
    <div className="app flex h-screen flex-col bg-background text-foreground">
      <div className="app-body flex min-h-0 flex-1">
        {/* Editor */}
        <motion.aside
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="editor-pane w-[400px] min-w-[340px] shrink-0 flex flex-col border-r bg-card overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {sidebarMode === 'templates' ? (
              <motion.div
                key="templates"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col min-h-0"
              >
                <TemplateSidebar
                  data={data}
                  onChange={setData}
                  onContinue={() => setSidebarMode('editor')}
                />
              </motion.div>
            ) : sidebarMode === 'design' ? (
              <motion.div
                key="design"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col min-h-0"
              >
                <DesignSidebar
                  data={data}
                  onChange={setData}
                  onContinue={() => setSidebarMode('editor')}
                />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-1 flex-col overflow-y-auto min-h-0"
              >
                <div className="sticky top-0 z-10 shrink-0 flex items-center gap-2 border-b bg-card/95 px-4 py-3 backdrop-blur">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <h1 className="text-sm font-bold leading-tight">Resume Builder</h1>
                    <p className="text-[11px] text-muted-foreground">Edit, theme, export JSON / PDF</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="mr-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">UI</span>
                    {UI_THEMES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        title={`${t.name} UI theme`}
                        aria-label={`${t.name} UI theme`}
                        onClick={() => setUiTheme(t.id)}
                        className={cn(
                          'h-5 w-5 rounded-full border transition-transform duration-200 hover:scale-110',
                          uiTheme === t.id
                            ? 'border-primary ring-2 ring-primary ring-offset-2'
                            : 'border-border'
                        )}
                        style={{ background: `linear-gradient(135deg, ${t.colors[0]} 50%, ${t.colors[1]} 50%)` }}
                      />
                    ))}
                  </div>
                </div>
                <Form
                  data={data}
                  onChange={setData}
                  onImport={handleImportClick}
                  onExport={handleExport}
                  onOpenTemplates={() => setSidebarMode('templates')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>

        {/* Preview */}
        <main className="main-pane flex min-w-0 flex-1 flex-col">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="toolbar no-print flex items-center gap-3 border-b bg-card px-4 py-2.5"
          >
            <div className="flex flex-1 items-center gap-2">
              <FileJson className="h-4 w-4 text-muted-foreground" />
              <Input
                value={data.meta.fileName || ''}
                onChange={(e) => setData({ ...data, meta: { ...data.meta, fileName: e.target.value } })}
                placeholder="resume"
                className="max-w-[240px]"
              />
            </div>
            <div className="toolbar-actions flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setSidebarMode('templates')}>
                <LayoutTemplate className="h-4 w-4" />
                Templates
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSidebarMode('design')}>
                <Palette className="h-4 w-4" />
                Design
              </Button>
              <Button variant="outline" size="sm" onClick={handleImportClick}>
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Button variant="secondary" size="sm" onClick={handleExport}>
                <FileJson className="h-4 w-4" />
                Export
              </Button>
              <Button size="sm" onClick={handlePrint}>
                <FileDown className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </motion.div>

          <div className="preview-scroll flex-1 overflow-auto bg-background p-6">
            <div className="mx-auto flex w-fit flex-col items-center gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={previewKey}
                  initial={{ opacity: 0, y: 24, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.99 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="page-frame bg-white shadow-2xl"
                >
                  <Template data={data} onChange={setData} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".json,application/json"
        onChange={handleImportFile}
        style={{ display: 'none' }}
      />
      <Toaster toast={toast} />
    </div>
  )
}
