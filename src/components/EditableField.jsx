import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function EditableField({ 
  value, 
  onChange, 
  tagName: Tag = 'span', 
  className, 
  placeholder,
  multiline = false,
  onKeyDown
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value || '')

  useEffect(() => {
    if (!isEditing) setLocalValue(value || '')
  }, [value, isEditing])

  const handleBlur = (e) => {
    setIsEditing(false)
    const newValue = e.currentTarget.textContent
    if (newValue !== value) {
      onChange(newValue)
    }
  }

  const handleKeyDown = (e) => {
    if (onKeyDown) {
      onKeyDown(e)
      if (e.defaultPrevented) return
    }
    if (!multiline && e.key === 'Enter') {
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  return (
    <Tag
      className={cn(
        className,
        "outline-none cursor-text",
        isEditing ? "bg-blue-50/30" : ""
      )}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      data-placeholder={placeholder}
      style={{
        minWidth: '1em',
        ...(!localValue ? { emptyCells: 'show' } : {})
      }}
    >
      {isEditing ? localValue : (value || <span className="opacity-40">{placeholder || 'Empty'}</span>)}
    </Tag>
  )
}
