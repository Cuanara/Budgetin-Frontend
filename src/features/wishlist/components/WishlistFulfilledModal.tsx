import { Heart } from 'lucide-react'
import Modal from '../../../components/ui/Modal'

interface Props {
  onYes: () => void
  onNo: () => void
}

const WishlistFulfilledModal = ({ onYes, onNo }: Props) => (
  <Modal open labelledBy="fulfilled-title">
    <div className="flex flex-col items-center text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-[#0B3B24]">
        <Heart size={24} />
      </div>
      <h2
        id="fulfilled-title"
        className="mt-4 text-2xl font-semibold text-[#0F1F17]"
      >
        Sudah kamu wujudkan?
      </h2>
      <p className="mt-2 text-xs leading-relaxed text-gray-600">
        Sudah mewujudkan wishlist mu yang sudah kamu tunda selama beberapa hari
        ini?
      </p>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onNo}
        className="cursor-pointer rounded-full bg-white py-3.5 text-sm font-medium text-gray-900 ring-1 ring-gray-300 transition-colors hover:bg-gray-50"
      >
        Belum
      </button>
      <button
        type="button"
        onClick={onYes}
        className="cursor-pointer rounded-full bg-[#0B3B24] py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#08301d]"
      >
        Sudah
      </button>
    </div>
  </Modal>
)

export default WishlistFulfilledModal