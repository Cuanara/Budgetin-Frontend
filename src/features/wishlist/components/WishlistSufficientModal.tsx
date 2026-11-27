import { Check } from 'lucide-react'
import Modal from '../../../components/ui/Modal'
import { formatRupiah } from '../../../utils/format'
import { useSufficientBalance } from '../hooks/useSufficientBalance'

const WishlistSufficientModal = () => {
  const { item, balance, remaining, buy, later } = useSufficientBalance()

  if (!item) return null

  return (
    <Modal open labelledBy="sufficient-title">
      <div className="flex flex-col items-center text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <Check size={24} />
        </div>
        <h2
          id="sufficient-title"
          className="mt-4 text-2xl font-semibold text-[#0F1F17]"
        >
          Saldo kamu cukup!
        </h2>
        <p className="mt-2 text-xs text-gray-600">
          Wishlist {item.name} ini bisa langsung terwujud.
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#F3F8F4] p-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-medium text-[#0B3B24]">
          {item.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{item.name}</p>
          <p className="text-[11px] text-gray-600">
            Harga {formatRupiah(item.price)}
          </p>
        </div>
      </div>

      <dl className="mt-4 space-y-1.5 text-xs">
        <div className="flex justify-between">
          <dt className="text-gray-600">Saldo tabungan</dt>
          <dd className="font-medium">{formatRupiah(balance)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Sisa setelah beli</dt>
          <dd className="font-medium text-emerald-700">
            {formatRupiah(remaining)}
          </dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={buy}
        className="mt-5 w-full cursor-pointer rounded-full bg-[#0F1F17] py-3.5 text-sm font-medium text-white transition-colors hover:bg-black"
      >
        Arahkan ke Link Pembelian
      </button>
      <button
        type="button"
        onClick={later}
        className="mt-2 w-full cursor-pointer py-2 text-xs text-gray-700 hover:text-gray-900"
      >
        Nanti dulu
      </button>
    </Modal>
  )
}

export default WishlistSufficientModal