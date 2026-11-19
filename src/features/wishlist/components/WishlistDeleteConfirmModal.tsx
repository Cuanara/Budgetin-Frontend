import Modal from '../../../components/ui/Modal'
import type { WishlistItem } from '../../../types/wishlist'

interface Props {
  item: WishlistItem | null
  onCancel: () => void
  onConfirm: (id: string) => void
}

const WishlistDeleteConfirmModal = ({ item, onCancel, onConfirm }: Props) => (
  <Modal
    open={item !== null}
    onClose={onCancel}
    labelledBy="wishlist-delete-title"
  >
    {item && (
      <>
        <h2
          id="wishlist-delete-title"
          className="text-2xl font-semibold text-[#0F1F17]"
        >
          Hapus {item.name}?
        </h2>
        <p className="mt-2 text-gray-500">
          Barang akan hilang dari sistem dan tidak bisa dikembalikan.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full bg-white py-4 text-base font-medium shadow-md ring-1 ring-gray-100"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => onConfirm(item.id)}
            className="rounded-full bg-red-600 py-4 text-base font-medium text-white"
          >
            Hapus
          </button>
        </div>
      </>
    )}
  </Modal>
)

export default WishlistDeleteConfirmModal