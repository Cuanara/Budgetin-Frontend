import { Link } from 'react-router-dom'
import type { WishlistItem } from '../../../types/wishlist'
import { formatRupiah } from '../../../utils/format'
import { getDaysLeft, getProgressPercent } from '../../../utils/wishlist'

interface Props {
  item: WishlistItem
}

const WishlistListItem = ({ item }: Props) => {
  const daysLeft = getDaysLeft(item)
  const done = daysLeft <= 0
  const percent = getProgressPercent(item)

  const badge = done
    ? 'Masa Tunda Selesai'
    : `Sisa ${daysLeft} Hari`

  const buttonClass = `mt-3 block w-full rounded-full py-2.5 text-center text-[10px] font-semibold text-white transition-colors sm:text-xs ${
    done
      ? 'bg-[#0B3B24] hover:bg-[#08301d]'
      : 'bg-[#888888] hover:bg-[#737373]'
  }`

  const needsMove = done && percent < 100

  return (
    <li className="min-w-0 rounded-2xl bg-white p-3.5 shadow-[0_3px_14px_rgba(0,0,0,0.06)] transition hover:shadow-md sm:rounded-3xl sm:p-5">
      <div className="flex min-w-0 items-center justify-between gap-2">
        <Link
          to={`/wishlist/${item.id}`}
          className="min-w-0 truncate text-[11px] font-medium text-[#26382D] hover:underline sm:text-sm"
        >
          {item.name}
        </Link>

        <span className="max-w-[115px] shrink-0 truncate rounded-full bg-[#0B3B24] px-2 py-1 text-center text-[8px] font-medium text-white sm:max-w-none sm:px-2.5 sm:text-[10px]">
          {badge}
        </span>
      </div>

      <p className="mt-1 text-base font-bold leading-tight text-[#101D16] sm:text-xl">
        {formatRupiah(item.price)}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <div
          role="progressbar"
          aria-label={`Progress tabungan ${item.name}`}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E5EEE8]"
        >
          <div
            className="h-full rounded-full bg-[#0B3B24] transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>

        <span className="shrink-0 text-[9px] text-[#52675A]">
          {percent}%
        </span>
      </div>

      {needsMove ? (
        <Link to="/savings" className={buttonClass}>
          Pindahkan Ke Wishlist Pada Tabungan
        </Link>
      ) : item.link ? (
        <button
          type="button"
          onClick={() => window.open(item.link, '_blank', 'noopener,noreferrer')}
          className={buttonClass}
        >
          Buka Link Pembelian
        </button>
      ) : (
        <Link to={`/wishlist/${item.id}`} className={buttonClass}>
          Lihat Detail
        </Link>
      )}
    </li>
  )
}

export default WishlistListItem
