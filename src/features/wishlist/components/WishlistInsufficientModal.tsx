import { Coins } from 'lucide-react'
import Modal from '../../../components/ui/Modal'
import { formatRupiah } from '../../../utils/format'
import { useInsufficientBalance } from '../hooks/useInsufficientBalance'

const WishlistInsufficientModal = () => {
  const {
    item,
    balance,
    shortfall,
    percent,
    perDay,
    days,
    notify,
    toggleNotify,
    confirm,
  } = useInsufficientBalance()

  if (!item) return null

  return (
    <Modal open labelledBy="insufficient-title">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <Coins size={28} />
        </div>
        <h2
          id="insufficient-title"
          className="mt-5 text-3xl font-semibold text-[#0F1F17]"
        >
          Saldo belum cukup
        </h2>
        <p className="mt-2 text-gray-500">
          Nabung dulu ya, sebentar lagi kamu sampai.
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

      <div className="relative mt-9">
        <span
          className="absolute -top-7 rounded-full bg-[#0F1F17] px-2.5 py-1 text-xs font-medium text-white"
          style={{
            left: `${percent}%`,
            transform: `translateX(-${percent}%)`,
          }}
        >
          {percent}%
        </span>
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2.5 w-full rounded-full bg-gray-100"
        >
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>Saldo {formatRupiah(balance)}</span>
          <span className="font-medium text-gray-900">
            Kurang {formatRupiah(shortfall)}
          </span>
        </div>
      </div>

      <p className="mt-4 rounded-2xl bg-[#F3F8F4] px-4 py-3 text-sm text-gray-700">
        Saran: sisihkan sekitar Rp {perDay / 1000} rb per hari selama {days} hari.
      </p>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Kabari aku saat saldo cukup</p>
          <p className="text-xs text-gray-500">
            Notifikasi muncul begitu saldomu mencukupi.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={notify}
          aria-label="Kabari aku saat saldo cukup"
          onClick={toggleNotify}
          className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${
            notify ? 'bg-emerald-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${
              notify ? 'left-7' : 'left-1'
            }`}
          />
        </button>
      </div>

      <button
        type="button"
        onClick={confirm}
        className="mt-5 w-full rounded-full bg-[#0F1F17] py-4 text-base font-medium text-white"
      >
        Oke, Nabung Dulu !
      </button>
    </Modal>
  )
}

export default WishlistInsufficientModal
