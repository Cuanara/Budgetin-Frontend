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
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <Check size={28} />
        </div>
        <h2
          id="sufficient-title"
          className="mt-5 text-3xl font-semibold text-[#0F1F17]"
        >
          Saldo kamu cukup!
        </h2>
        <p className="mt-2 text-gray-500">
          Barang ini bisa langsung dibeli dari tabunganmu.
        </p>
      </div>

      <div className="mt-6 flex items-center gap-4 rounded-2xl bg-[#F3F8F4] p-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg font-medium text-[#0B3B24]">
          {item.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium">{item.name}</p>
          <p className="text-sm text-gray-500">
            Harga {formatRupiah(item.price)}
          </p>
        </div>
      </div>

      <dl className="mt-5 space-y-1.5 text-sm">
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
        className="mt-6 w-full rounded-full bg-[#0F1F17] py-4 text-base font-medium text-white"
      >
        Arahkan ke Link Pembelian
      </button>
      <button
        type="button"
        onClick={later}
        className="mt-3 w-full py-2 text-sm text-gray-600 hover:text-gray-900"
      >
        Nanti dulu
      </button>
    </Modal>
  )
}

export default WishlistSufficientModal
