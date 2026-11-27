import { Bell } from 'lucide-react'
import Modal from '../../../components/ui/Modal'
import type {
  WishlistDecision,
  WishlistItem,
} from '../../../types/wishlist'
import { formatRupiah } from '../../../utils/format'

interface Props {
  item: WishlistItem
  onDecide: (id: string, decision: WishlistDecision) => void
}

const WishlistExpiredModal = ({ item, onDecide }: Props) => (
  <Modal open labelledBy="wishlist-expired-title">
    <div className="flex flex-col items-center text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <Bell size={24} />
      </div>
      <h2
        id="wishlist-expired-title"
        className="mt-4 text-2xl font-semibold text-[#0F1F17]"
      >
        Masa tunda berakhir
      </h2>
      <p className="mt-2 text-xs text-gray-600">
        Sudah {item.delayDays} hari sejak kamu menyimpan barang ini.
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

    <p className="mt-5 text-center text-xs text-gray-700">
      Setelah masa tunda untuk memutuskan, apa kamu masih menginginkannya?
    </p>

    <div className="mt-4 grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onDecide(item.id, 'cancelled')}
        className="cursor-pointer rounded-full bg-white py-3.5 text-sm font-medium shadow-md ring-1 ring-gray-100 transition-colors hover:bg-gray-50"
      >
        Tidak
      </button>
      <button
        type="button"
        onClick={() => onDecide(item.id, 'bought')}
        className="cursor-pointer rounded-full bg-[#0F1F17] py-3.5 text-sm font-medium text-white transition-colors hover:bg-black"
      >
        Masih
      </button>
    </div>
  </Modal>
)

export default WishlistExpiredModal