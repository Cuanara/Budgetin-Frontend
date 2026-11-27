import { Archive } from 'lucide-react'
import Modal from '../../../components/ui/Modal'

interface Props {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

const WishlistArchiveConfirmModal = ({ open, onCancel, onConfirm }: Props) => (
  <Modal open={open} onClose={onCancel} labelledBy="archive-confirm-title">
    <div className="flex flex-col items-center text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-[#0B3B24]">
        <Archive size={24} />
      </div>
      <h2
        id="archive-confirm-title"
        className="mt-4 text-xl font-semibold text-[#0F1F17]"
      >
        Yakin Ingin Mengarsipkan Wishlist ini?
      </h2>
      <p className="mt-2 text-xs leading-relaxed text-gray-600">
        Wishlist yang diarsipkan masa tundanya akan terjeda, dan hanya akan
        berada di arsip selama 30 hari.
      </p>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="cursor-pointer rounded-full bg-white py-3.5 text-sm font-medium text-gray-900 ring-1 ring-gray-300 transition-colors hover:bg-gray-50"
      >
        Belum
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="cursor-pointer rounded-full bg-[#0B3B24] py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#08301d]"
      >
        Yakin
      </button>
    </div>
  </Modal>
)

export default WishlistArchiveConfirmModal