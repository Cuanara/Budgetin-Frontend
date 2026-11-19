import type { WishlistItem } from '../../../types/wishlist'
import { formatRupiah } from '../../../utils/format'
import { getShortfall, isReady } from '../../../utils/wishlist'

interface Props {
  item: WishlistItem
}

const WishlistBalanceCheck = ({ item }: Props) => {
  const ready = isReady(item)

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-[#0B3B24]">
          Cek kecukupan saldo
        </h3>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            ready ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
          }`}
        >
          {ready ? 'Cukup' : 'Belum cukup'}
        </span>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-600">Dana terkumpul</dt>
          <dd className="font-semibold">{formatRupiah(item.saved)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Harga barang</dt>
          <dd className="font-semibold">{formatRupiah(item.price)}</dd>
        </div>
        <div className="flex justify-between border-t border-gray-100 pt-3">
          <dt className="text-gray-600">Kekurangan</dt>
          <dd className="font-semibold">{formatRupiah(getShortfall(item))}</dd>
        </div>
      </dl>
    </section>
  )
}

export default WishlistBalanceCheck