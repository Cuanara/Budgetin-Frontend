import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { TakeFromOption } from '../../../types/budget'
import { formatRupiah } from '../../../utils/format'

interface Props {
  id: string
  options: TakeFromOption[]
  value: string
  percent: number
  hasError?: boolean
  onChange: (id: string) => void
}

const TakeFromSelect = ({
  id,
  options,
  value,
  percent,
  hasError,
  onChange,
}: Props) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.id === value)

  useEffect(() => {
    if (!open) return
    const handlePointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
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
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={hasError}
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          'flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 text-left text-sm outline-none transition',
          'focus:border-primary focus:ring-2 focus:ring-primary/20',
          hasError ? 'border-danger' : 'border-line',
        )}
      >
        <span className={selected ? 'text-[#0F1F17]' : 'text-gray-400'}>
          {selected
            ? `${selected.name} · jatah ${selected.currentPercent}%`
            : 'Pilih kategori'}
        </span>
        <ChevronDown
          className={clsx('size-4 text-gray-500 transition', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-10 mt-2 rounded-2xl border border-line bg-white p-2 shadow-lg">
          <div className="flex justify-between px-2 pb-1 text-[10px] text-gray-400">
            <span>Kategori</span>
            <span>Jatah setelah dikurang {percent}%</span>
          </div>
          <ul
            role="listbox"
            aria-labelledby={id}
            className="max-h-56 overflow-y-auto"
          >
            {options.map((o) => (
              <li key={o.id} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={o.id === value}
                  disabled={!o.isEnabled}
                  onClick={() => {
                    onChange(o.id)
                    setOpen(false)
                  }}
                  className={clsx(
                    'flex w-full items-center justify-between rounded-xl px-2 py-2 text-left',
                    'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent',
                    o.id === value ? 'bg-emerald-50' : 'hover:bg-gray-50',
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-xs font-medium text-[#0B3B24]">
                      {o.name.charAt(0).toUpperCase()}
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-[#0F1F17]">
                        {o.name}
                      </span>
                      <span className="block text-[10px] text-gray-500">
                        Jatah sekarang {o.currentPercent}%
                      </span>
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block text-xs font-medium text-[#0F1F17]">
                      {o.currentPercent}% → {o.nextPercent}%
                    </span>
                    <span className="block text-[10px] text-gray-500">
                      {!o.isEnabled
                        ? 'Tidak cukup'
                        : o.nextPercent === 0
                          ? 'habis'
                          : `sisa ${formatRupiah(o.remainingAmount)}`}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TakeFromSelect