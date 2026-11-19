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

const WishlistExpiredModal = ({ item, onDecide }: Props) => {
  const handleBuy = () => {
    onDecide(item.id, 'bought')
  }

  return (
    <Modal open labelledBy="wishlist-expired-title">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <Bell size={28} />
        </div>
        <h2
          id="wishlist-expired-title"
          className="mt-5 text-3xl font-semibold text-[#0F1F17]"
        >
          Masa tunda berakhir
        </h2>
        <p className="mt-2 text-gray-500">
          Sudah {item.delayDays} hari sejak kamu menyimpan barang ini.
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

      <p className="mt-7 text-center font-medium">Jadi dibeli atau tidak?</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onDecide(item.id, 'cancelled')}
          className="rounded-full bg-white py-4 text-base font-medium shadow-md ring-1 ring-gray-100"
        >
          Tidak
        </button>
        <button
          type="button"
          onClick={handleBuy}
          className="rounded-full bg-[#0F1F17] py-4 text-base font-medium text-white"
        >
          Jadi
        </button>
      </div>
    </Modal>
  )
}

export default WishlistExpiredModal