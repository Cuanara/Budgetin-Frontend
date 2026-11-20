import type { BudgetCategory } from '../../../types/budget'
import { amountFromPercent, formatRupiahShort } from '../../../utils/budget'
import { formatRupiah } from '../../../utils/format'
import clsx from 'clsx'

interface Props {
  category: BudgetCategory
  income: number
  onDelete: (category: BudgetCategory) => void
  className?: string
}interface Props {
  category: BudgetCategory
  income: number
  onDelete: (category: BudgetCategory) => void
  canDelete: boolean
  className?: string
}

const CategoryCard = ({
  category,
  income,
  onDelete,
  canDelete,
  className,
}: Props) => {
  const allocation = amountFromPercent(income, category.percent)
  const progress =
    allocation > 0 ? Math.min(100, (category.spent / allocation) * 100) : 0
  const isOver = allocation > 0 && category.spent > allocation

  return (
       <article
      className={clsx(
        'rounded-3xl border border-transparent bg-white p-5 shadow-sm transition hover:border-emerald-400',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-medium text-[#0B3B24]">
            {category.name.charAt(0).toUpperCase()}
          </span>
          <h3 className="truncate text-sm font-semibold text-[#0F1F17]">
            {category.name}
          </h3>
        </div>
        <button
            type="button"
            onClick={() => onDelete(category)}
            disabled={!canDelete}
            aria-label={`Hapus kategori ${category.name}`}
            title={canDelete ? undefined : 'Minimal harus ada 1 kategori'}
            className={clsx(
                'shrink-0 text-xs text-gray-500',
                canDelete ? 'hover:text-danger' : 'cursor-not-allowed opacity-40',
            )}
        >
        Hapus
        </button>
      </div>

      <p className="mt-4 text-xs text-gray-600">
        Alokasi {formatRupiah(allocation)} · {category.percent}%
      </p>

      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-emerald-50"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label={`Pemakaian ${category.name}`}
      >
        <div
          className={`h-full rounded-full ${isOver ? 'bg-danger' : 'bg-emerald-500'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Terpakai {formatRupiahShort(category.spent)}
      </p>
    </article>
  )
}

export default CategoryCard