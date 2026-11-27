import { Link } from 'react-router-dom'
import type { WishlistItem } from '../../../types/wishlist'
import { formatRupiah } from '../../../utils/format'
import { getDaysLeft, getProgressPercent } from '../../../utils/wishlist'

interface Props {
  item: WishlistItem
}

const WishlistListItem = ({ item }: Props) => {
  const daysLeft = getDaysLeft(item)
  const done = daysLeft <= 0 // masa tunda sudah selesai
  const percent = getProgressPercent(item)
  const badge = done ? 'Masa Tunda Selesai' : `Masa Tunda Sisa ${daysLeft} Hari`

  // hijau tua = masa tunda selesai, abu-abu = masih berjalan
  const buttonClass = `mt-4 block w-full cursor-pointer rounded-full py-3 text-center text-xs font-semibold text-white shadow-sm transition-colors ${
    done ? 'bg-[#0B3B24] hover:bg-[#08301d]' : 'bg-[#5F7367] hover:bg-[#53665b]'
  }`

  // Selesai tapi dana belum penuh -> pindahkan ke wishlist pada tabungan
  const needsMove = done && percent < 100

  return (
    <li className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <Link
          to={`/wishlist/${item.id}`}
          className="min-w-0 truncate text-sm font-medium hover:underline"
        >
          {item.name}
        </Link>
        <span className="shrink-0 rounded-full bg-[#0B3B24] px-2.5 py-1 text-[10px] font-medium text-white">
          {badge}
        </span>
      </div>

      <p className="mt-1 text-xl font-bold">{formatRupiah(item.price)}</p>

      <div className="mt-3 flex items-center gap-2">
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1.5 flex-1 rounded-full bg-emerald-100"
        >
          <div
            className="h-full rounded-full bg-[#0B3B24]"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-[11px] text-gray-500">{percent}%</span>
      </div>

      {needsMove ? (
        // TODO: sesuaikan tujuan setelah alur "pindah ke tabungan" ditentukan
        <Link to="/savings" className={buttonClass}>
          Pindahkan Ke Wishlist Pada Tabungan
        </Link>
      ) : item.link ? (
        <button
          type="button"
          onClick={() => window.open(item.link, '_blank', 'noopener')}
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