import { X } from 'lucide-react'
import Modal from '../../../components/ui/Modal'
import type { WishlistItem } from '../../../types/wishlist'
import { formatRupiah } from '../../../utils/format'
import {
  getProgressPercent,
  getShortfall,
  isReady,
  normalizeLink,
} from '../../../utils/wishlist'

interface Props {
  open: boolean
  items: WishlistItem[]
  onClose: () => void
}

const SavingsWishlistModal = ({ open, items, onClose }: Props) => (
  <Modal open={open} onClose={onClose} labelledBy="savings-wishlist-title" size="sm">
    <div className="mb-5 flex items-center justify-between">
      <h2 id="savings-wishlist-title" className="text-lg font-semibold">
        Daftar Wishlist
      </h2>
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="grid size-9 cursor-pointer place-items-center rounded-full bg-[#F3F8F4]"
      >
        <X size={16} />
      </button>
    </div>

    {items.length === 0 && (
      <p className="py-6 text-center text-sm text-gray-500">Belum ada wishlist.</p>
    )}

        <ul className="-mr-4 max-h-[60vh] space-y-3 overflow-y-auto overscroll-contain pr-4 [scrollbar-color:#cbd5d1_transparent] [scrollbar-width:thin]">
      {items.map((item) => {
        const percent = getProgressPercent(item)
        const link = normalizeLink(item.link ?? '')

        return (
          <li key={item.id} className="rounded-2xl bg-[#F3F8F4] p-3">
            <p className="text-sm font-medium">{item.name}</p>

            {isReady(item) ? (
              <>
                <div className="mt-1 flex justify-between gap-2 text-xs">
                  <span>Saldo kamu sudah cukup</span>
                  <span>{formatRupiah(item.price)}</span>
                </div>
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block rounded-full bg-black py-2 text-center text-xs text-white"
                  >
                    Arahkan ke Link Pembelian
                  </a>
                ) : (
                  <p className="mt-2 text-xs text-gray-500">Link pembelian belum diisi</p>
                )}
              </>
            ) : (
              <>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-1.5 flex-1 rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-xs">{percent}%</span>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Kurang {formatRupiah(getShortfall(item))} dari{' '}
                  {formatRupiah(item.price)}
                </p>
              </>
            )}
          </li>
        )
      })}
    </ul>
  </Modal>
)

export default SavingsWishlistModal