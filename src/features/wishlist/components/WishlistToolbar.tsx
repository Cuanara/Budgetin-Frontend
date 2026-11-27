import { ArrowDownUp, Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

export type WishlistFilter = 'all' | 'running' | 'done'
export type WishlistSort = 'smallest' | 'largest' | 'oldest' | 'newest'

const FILTER_OPTIONS: { value: WishlistFilter; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'running', label: 'Masa tunda berjalan' },
  { value: 'done', label: 'Masa tunda selesai' },
]

const SORT_OPTIONS: { value: WishlistSort; label: string }[] = [
  { value: 'smallest', label: 'Budget Terkecil' },
  { value: 'largest', label: 'Budget Terbesar' },
  { value: 'oldest', label: 'Terlama' },
  { value: 'newest', label: 'Terbaru' },
]

interface MenuProps<T extends string> {
  icon: ReactNode
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  align?: 'left' | 'right'
}

function MenuButton<T extends string>({
  icon,
  label,
  options,
  value,
  onChange,
  align = 'left',
}: MenuProps<T>) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#0B3B24] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#08301d]"
      >
        {icon}
        {label}
      </button>

      {open && (
        <ul
          role="menu"
          className={`absolute top-full z-20 mt-2 min-w-52 rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-black/5 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="menuitemradio"
                aria-checked={option.value === value}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={`w-full cursor-pointer rounded-xl px-3 py-2 text-left text-xs ${
                  option.value === value
                    ? 'bg-emerald-100 font-medium text-gray-900'
                    : 'text-gray-600 hover:bg-emerald-50'
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

interface Props {
  query: string
  onQueryChange: (value: string) => void
  filter: WishlistFilter
  onFilterChange: (value: WishlistFilter) => void
  sort: WishlistSort
  onSortChange: (value: WishlistSort) => void
}

const WishlistToolbar = ({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  sort,
  onSortChange,
}: Props) => (
  <div className="flex flex-wrap items-center gap-3">
    <label className="flex w-full max-w-60 items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm ring-1 ring-black/5 focus-within:ring-emerald-500">
      <Search size={14} className="shrink-0 text-gray-400" />
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Cari"
        aria-label="Cari wishlist"
        className="w-full bg-transparent text-xs outline-none"
      />
    </label>

    <MenuButton
      icon={<SlidersHorizontal size={14} />}
      label="Filter"
      options={FILTER_OPTIONS}
      value={filter}
      onChange={onFilterChange}
    />

    <div className="ml-auto">
      <MenuButton
        icon={<ArrowDownUp size={14} />}
        label="Urutkan Dari"
        options={SORT_OPTIONS}
        value={sort}
        onChange={onSortChange}
        align="right"
      />
    </div>
  </div>
)

export default WishlistToolbar