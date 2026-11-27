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
    cancel,
  } = useInsufficientBalance()

  if (!item) return null

  return (
    <Modal open labelledBy="insufficient-title">
      <div className="flex flex-col items-center text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <Coins size={24} />
        </div>
        <h2
          id="insufficient-title"
          className="mt-4 text-2xl font-semibold text-[#0F1F17]"
        >
          Saldo belum cukup
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-gray-600">
          Saldo di tabungan belum cukup untuk mewujudkan wishlistmu ini
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#F3F8F4] p-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-medium text-[#0B3B24]">
          {item.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{item.name}</p>
          <p className="text-[11px] text-gray-600">
            {formatRupiah(item.price)}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2">
          <div
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-2 flex-1 rounded-full bg-emerald-100"
          >
            <div
              className="h-full rounded-full bg-[#0B3B24]"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-[11px] text-gray-600">{percent}%</span>
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] text-gray-700">
          <span>Saldo {formatRupiah(balance)}</span>
          <span className="font-medium">Kurang {formatRupiah(shortfall)}</span>
        </div>
      </div>

      <p className="mt-3 rounded-xl bg-[#F3F8F4] px-4 py-3 text-center text-[11px] text-gray-700">
        Saran : sisihkan sekitar {formatRupiah(perDay)} per hari selama {days}{' '}
        hari.
      </p>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium">Kabari aku saat saldo cukup</p>
          <p className="text-[11px] text-gray-600">
            Notifikasi muncul begitu saldomu mencukupi.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={notify}
          aria-label="Kabari aku saat saldo cukup"
          onClick={toggleNotify}
          className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
            notify ? 'bg-[#0B3B24]' : 'bg-gray-200'
          }`}
        >
          <span
            className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform ${
              notify ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      <button
        type="button"
        onClick={confirm}
        className="mt-4 w-full cursor-pointer rounded-full bg-[#0F1F17] py-3.5 text-sm font-medium text-white transition-colors hover:bg-black"
      >
        Masukkan wishlist pada tabungan
      </button>
      <button
        type="button"
        onClick={cancel}
        className="mt-2 w-full cursor-pointer rounded-full bg-white py-3.5 text-sm font-medium text-gray-900 ring-1 ring-gray-300 transition-colors hover:bg-gray-50"
      >
        Batal diwujudkan
      </button>
    </Modal>
  )
}

export default WishlistInsufficientModal