import { Clock } from 'lucide-react'
import Modal from '../../../components/ui/Modal'
import type { WishlistItem } from '../../../types/wishlist'
import { EXTEND_DAYS } from '../../../constants/wishlist'
import { formatRupiah } from '../../../utils/format'
import {
  getDayProgressPercent,
  getEndLabel,
  getReminderTitle,
  getShortfall,
} from '../../../utils/wishlist'

interface Props {
  item: WishlistItem
  open: boolean
  onClose: () => void
  onExtend: (id: string) => void
}

const WishlistReminderModal = ({ item, open, onClose, onExtend }: Props) => {
  const percent = getDayProgressPercent(item)

  const handleExtend = () => {
    onExtend(item.id)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="wishlist-reminder-title">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <Clock size={28} />
        </div>
        <h2
          id="wishlist-reminder-title"
          className="mt-5 text-3xl font-semibold text-[#0F1F17]"
        >
          {getReminderTitle(item)}
        </h2>
        <p className="mt-2 text-gray-500">Masih ada waktu buat mikir lagi.</p>
      </div>

      <div className="mt-6 flex items-center gap-4 rounded-2xl bg-[#F3F8F4] p-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg font-medium text-[#0B3B24]">
          {item.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium">{item.name}</p>
          <p className="text-sm text-gray-500">
            Harga {formatRupiah(item.price)} · kurang{' '}
            {formatRupiah(getShortfall(item))}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <div
          tabIndex={0}
          className="group relative cursor-pointer py-2 outline-none"
        >
          <span
            className="pointer-events-none absolute -top-6 whitespace-nowrap rounded-full bg-[#0F1F17] px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100"
            style={{
              left: `${percent}%`,
              transform: `translateX(-${percent}%)`,
            }}
          >
            Hari ke-{Math.max(1, item.dayElapsed)}
          </span>
          <div
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Hari ke-${Math.max(1, item.dayElapsed)} dari ${item.delayDays}`}
            className="h-2.5 w-full rounded-full bg-gray-100"
          >
            <div
              className="h-full rounded-full bg-amber-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
        <div className="mt-1 flex justify-between text-sm text-gray-500">
          <span>Mulai hari ke-1</span>
          <span>{getEndLabel(item)}</span>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleExtend}
          className="rounded-full bg-white py-4 text-base font-medium shadow-md ring-1 ring-gray-100"
        >
          Tambah {EXTEND_DAYS} hari
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-[#0F1F17] py-4 text-base font-medium text-white"
        >
          Oke
        </button>
      </div>
    </Modal>
  )
}

export default WishlistReminderModal