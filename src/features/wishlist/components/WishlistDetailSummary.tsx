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
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-3xl font-semibold text-[#0B3B24]">{item.name}</h2>
          {item.createdAt && (
            <p className="mt-1 text-sm text-gray-500">
              Ditambahkan {formatShortDate(item.createdAt)}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            ready ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}
        >
          {getStatusText(item)}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-4xl font-semibold text-[#0B3B24]">
          {formatRupiah(item.saved)}
        </p>
        <p className="text-sm text-gray-500">
          terkumpul dari {formatRupiah(item.price)}
        </p>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-3 h-3 w-full rounded-full bg-emerald-50"
      >
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between text-sm">
        <span className="font-medium text-gray-900">{percent}%</span>
        <span className="text-gray-500">
          Kurang {formatRupiah(getShortfall(item))}
        </span>
      </div>
    </section>
  )
}

export default WishlistDetailSummary