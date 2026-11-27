import { ArrowDownUp, Search, SlidersHorizontal } from 'lucide-react'
import { createPortal } from 'react-dom'
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
}

function MenuButton<T extends string>({
  icon,
  label,
  options,
  value,
  onChange,
}: MenuProps<T>) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)

  const updatePosition = () => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return

    const menuWidth = Math.min(192, window.innerWidth - 32)

    const left = Math.max(
      16,
      Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - 16),
    )

    setPosition({
      top: rect.bottom + 8,
      left,
    })
  }

  useEffect(() => {
    if (!open) return

    updatePosition()

    const handleOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node

      if (
        !buttonRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    const handleViewportChange = () => {
      updatePosition()
    }

    document.addEventListener('pointerdown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    window.addEventListener('resize', handleViewportChange)
    window.addEventListener('scroll', handleViewportChange, true)

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
      window.removeEventListener('resize', handleViewportChange)
      window.removeEventListener('scroll', handleViewportChange, true)
    }
  }, [open])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
        className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#0B3B24] px-3 text-white shadow-sm transition hover:bg-[#08301d] sm:px-4"
      >
        {icon}
        <span className="hidden text-[11px] sm:inline">
          {label}
        </span>
      </button>

      {open &&
        createPortal(
          <ul
            ref={menuRef}
            role="menu"
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              width: '192px',
              maxWidth: 'calc(100vw - 32px)',
              zIndex: 9999,
            }}
            className="rounded-2xl border border-[#E5EEE8] bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
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
                  className={`w-full rounded-xl px-3 py-2.5 text-left text-[11px] leading-relaxed transition ${
                    option.value === value
                      ? 'bg-[#D1FAE5] font-semibold text-[#0B3B24]'
                      : 'text-gray-600 hover:bg-[#F0F6F1]'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </>
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
}: Props) => {
  return (
    <div className="relative flex w-full min-w-0 items-center gap-2">
      {/* Search */}
      <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full border border-[#E5EEE8] bg-white px-3 shadow-sm focus-within:border-[#0B3B24]">
        <Search
          size={14}
          className="shrink-0 text-gray-400"
        />

        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Cari"
          aria-label="Cari wishlist"
          className="w-full min-w-0 bg-transparent text-[11px] outline-none placeholder:text-gray-400"
        />
      </label>

      {/* Filter */}
      <MenuButton
        icon={<SlidersHorizontal size={15} />}
        label="Filter"
        options={FILTER_OPTIONS}
        value={filter}
        onChange={onFilterChange}
      />

      {/* Sorting */}
      <MenuButton
        icon={<ArrowDownUp size={15} />}
        label="Urutkan"
        options={SORT_OPTIONS}
        value={sort}
        onChange={onSortChange}
      />
    </div>
  )
}

export default WishlistToolbar
