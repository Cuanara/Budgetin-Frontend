import { Link } from 'react-router-dom'
import type { WishlistItem } from '../../../types/wishlist'
import { formatRupiah } from '../../../utils/format'
import {
  getProgressPercent,
  getShortfall,
  getStatusText,
  isReady,
} from '../../../utils/wishlist'
import WishlistProgress from './WishlistProgress'

interface Props {
  item: WishlistItem
}

const WishlistListItem = ({ item }: Props) => {
  const ready = isReady(item)
  const percent = getProgressPercent(item)
  const infoText = ready
    ? `Progress ${percent}% dari ${formatRupiah(item.price)}`
    : `Kurang ${formatRupiah(getShortfall(item))} dari ${formatRupiah(item.price)}`

  return (
    <li className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-medium">{item.name}</h3>
        <span className="shrink-0 text-sm text-gray-500">
          {getStatusText(item)}
        </span>
      </div>

      <WishlistProgress percent={percent} />
      <p className="mt-3 text-sm text-gray-500">{infoText}</p>

      {ready ? (
        <button
          type="button"
          disabled={!item.link}
          onClick={() =>
            item.link && window.open(item.link, '_blank', 'noopener')
          }
          className="mt-5 w-full rounded-full bg-[#0B3B24] py-3.5 text-base font-medium text-white disabled:opacity-50"
        >
          Buka Link Pembelian
        </button>
      ) : (
        <Link
          to={`/wishlist/${item.id}`}
          className="mt-5 block w-full rounded-full border border-gray-200 bg-white py-3.5 text-center text-base font-medium text-gray-900 hover:bg-gray-50"
        >
          Lihat detail
        </Link>
      )}
    </li>
  )
}

export default WishlistListItem