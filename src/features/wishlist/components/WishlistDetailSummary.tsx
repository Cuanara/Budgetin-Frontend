import type { WishlistItem } from '../../../types/wishlist'
import { formatShortDate } from '../../../utils/date'
import { formatRupiah } from '../../../utils/format'
import {
  getProgressPercent,
  getShortfall,
  getStatusText,
  isReady,
} from '../../../utils/wishlist'

interface Props {
  item: WishlistItem
}

const WishlistDetailSummary = ({ item }: Props) => {
  const percent = getProgressPercent(item)
  const ready = isReady(item)

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-[#0B3B24]">
            {item.name}
          </h2>
          {item.createdAt && (
            <p className="mt-0.5 text-[11px] text-gray-600">
              Ditambahkan {formatShortDate(item.createdAt)}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-medium ${
            ready
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {getStatusText(item)}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-2xl font-bold text-[#0B3B24]">
          {formatRupiah(item.saved)}
        </p>
        <p className="text-[11px] text-gray-600">
          terkumpul dari {formatRupiah(item.price)}
        </p>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-2 h-2.5 w-full rounded-full bg-emerald-100"
      >
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-1.5 flex justify-between text-[11px]">
        <span className="font-medium text-gray-900">{percent}%</span>
        <span className="text-gray-600">
          Kurang {formatRupiah(getShortfall(item))}
        </span>
      </div>
    </section>
  )
}

export default WishlistDetailSummary