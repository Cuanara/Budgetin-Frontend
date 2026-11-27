import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { FIELD_BASE, fieldTone } from './fieldStyles'

interface Props {
  label: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
  required?: boolean
  placeholder?: string
  error?: string
}

const Select = ({
  label,
  value,
  options,
  onChange,
  required,
  placeholder = 'Pilih',
  error,
}: Props) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonId = useId()
  const labelId = useId()
  const listId = useId()

  useEffect(() => {
    if (!open) return

    const handlePointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    // Esc menutup dropdown saja, tidak ikut menutup modal di belakangnya
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('keydown', handleKey, true)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('keydown', handleKey, true)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <label
        id={labelId}
        htmlFor={buttonId}
        className="mb-1.5 block text-xs font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-danger">*</span>}
      </label>

      <button
        id={buttonId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={Boolean(error)}
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          'flex h-12 items-center justify-between text-left',
          FIELD_BASE,
          fieldTone(Boolean(error)),
        )}
      >
        <span className={value ? 'text-[#0F1F17]' : 'text-gray-400'}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={clsx(
            'size-4 shrink-0 text-gray-500 transition',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          className="absolute left-0 right-0 z-20 mt-2 max-h-56 overflow-y-auto rounded-2xl border border-line bg-white p-1.5 shadow-lg"
        >
          {options.map((option) => (
            <li key={option} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                onClick={() => {
                  onChange(option)
                  setOpen(false)
                }}
                className={clsx(
                  'w-full rounded-xl px-3 py-2 text-left text-sm transition',
                  option === value
                    ? 'bg-emerald-50 font-medium text-[#0B3B24]'
                    : 'text-gray-600 hover:bg-gray-50',
                )}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  )
}

export default Select
