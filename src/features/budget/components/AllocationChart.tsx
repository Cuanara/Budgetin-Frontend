import clsx from 'clsx'
import { useState } from 'react'
import type { PointerEvent } from 'react'
import type { BudgetCategory } from '../../../types/budget'
import { amountFromPercent, formatRupiahShort } from '../../../utils/budget'
import { formatRupiah } from '../../../utils/format'

interface Props {
  income: number
  categories: BudgetCategory[]
  className?: string
}

interface TooltipPos {
  x: number
  y: number
}

const SIZE = 160
const STROKE = 24
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const AllocationChart = ({ income, categories, className }: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [pos, setPos] = useState<TooltipPos | null>(null)

  const segments = categories.map((category, index) => ({
    category,
    length: (category.percent / 100) * CIRCUMFERENCE,
    start:
      (categories.slice(0, index).reduce((sum, c) => sum + c.percent, 0) / 100) *
      CIRCUMFERENCE,
  }))

  const activeCategory = categories.find((c) => c.id === activeId)

  const handleSegmentMove = (
    event: PointerEvent<SVGCircleElement>,
    id: string,
  ) => {
    const rect = event.currentTarget.ownerSVGElement?.getBoundingClientRect()
    if (!rect) return
    setActiveId(id)
    setPos({ x: event.clientX - rect.left, y: event.clientY - rect.top })
  }

  const clearActive = () => {
    setActiveId(null)
    setPos(null)
  }

  return (
    // wrapper kosong di desktop: tingginya ikut area grid, bukan isi kartu
    <div className={clsx('lg:relative', className)}>
      <section className="rounded-3xl bg-white p-5 shadow-sm lg:absolute lg:inset-0 lg:flex lg:flex-col">
        <h2 className="mb-3 text-base font-semibold text-[#0F1F17] lg:shrink-0">
          Alokasi budget
        </h2>

        <div className="relative mx-auto h-32 w-32 shrink-0">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="h-full w-full -rotate-90"
            role="img"
            aria-label="Diagram alokasi budget per kategori"
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#eef5f1"
              strokeWidth={STROKE}
            />
            {segments.map(({ category, length, start }) => (
              <circle
                key={category.id}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke={category.color}
                strokeWidth={STROKE}
                strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
                strokeDashoffset={-start}
                opacity={activeId && activeId !== category.id ? 0.35 : 1}
                className="cursor-pointer transition-opacity"
                onPointerEnter={(e) => handleSegmentMove(e, category.id)}
                onPointerMove={(e) => handleSegmentMove(e, category.id)}
                onPointerLeave={clearActive}
              />
            ))}
          </svg>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] text-gray-500">Pemasukan</span>
            <span className="text-sm font-semibold text-[#0F1F17]">
              {formatRupiahShort(income)}
            </span>
          </div>

          {activeCategory && pos && (
            <div
              role="tooltip"
              className="pointer-events-none absolute z-20 whitespace-nowrap rounded-xl bg-[#0F1F17] px-3 py-2 text-xs text-white shadow-lg"
              style={{
                left: pos.x,
                top: pos.y,
                transform: 'translate(-50%, calc(-100% - 12px))',
              }}
            >
              <span className="flex items-center gap-2 font-medium">
                <span
                  className="h-2 w-2 rounded-full ring-1 ring-white/60"
                  style={{ backgroundColor: activeCategory.color }}
                  aria-hidden="true"
                />
                {activeCategory.name}
              </span>
              <span className="mt-0.5 block text-white/80">
                {activeCategory.percent}% ·{' '}
                {formatRupiah(amountFromPercent(income, activeCategory.percent))}
              </span>
            </div>
          )}
        </div>

        <ul className="mt-4 space-y-0.5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
          {categories.map((c) => (
            <li
              key={c.id}
              onMouseEnter={() => setActiveId(c.id)}
              onMouseLeave={clearActive}
              className={clsx(
                'flex items-center justify-between rounded-lg px-2 py-1 text-xs transition-colors',
                activeId === c.id && 'bg-emerald-50',
              )}
            >
              <span className="flex items-center gap-2 text-gray-600">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: c.color }}
                  aria-hidden="true"
                />
                {c.name}
              </span>
              <span className="font-medium text-[#0F1F17]">{c.percent}%</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default AllocationChart