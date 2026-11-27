import type { WishlistItem } from '../../../types/wishlist'
import { formatRupiah } from '../../../utils/format'
import { getShortfall, isReady } from '../../../utils/wishlist'

interface Props {
  item: WishlistItem
}

const WishlistBalanceCheck = ({ item }: Props) => {
  const ready = isReady(item)

  return (
    <section className="h-full rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-[#0B3B24]">Kecukupan saldo</h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
            ready ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-600'
          }`}
        >
          {ready ? 'Cukup' : 'Belum cukup'}
        </span>
      </div>

      <dl className="mt-3 space-y-1.5 text-[11px]">
        <div className="flex justify-between">
          <dt className="text-gray-700">Dana terkumpul</dt>
          <dd className="font-medium text-gray-900">
            {formatRupiah(item.saved)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-700">Harga barang</dt>
          <dd className="font-medium text-gray-900">
            {formatRupiah(item.price)}
          </dd>
        </div>
        <div className="flex justify-between border-t border-gray-100 pt-2">
          <dt className="text-gray-700">Kekurangan</dt>
          <dd className="font-semibold text-gray-900">
            {formatRupiah(getShortfall(item))}
          </dd>
        </div>
      </dl>
    </section>
  )
}

export default WishlistBalanceCheck