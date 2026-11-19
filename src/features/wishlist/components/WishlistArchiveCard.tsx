import { ARCHIVE_REASON } from '../../../constants/wishlist'
import type { WishlistItem } from '../../../types/wishlist'
import { formatRupiah } from '../../../utils/format'
import {
  formatArchiveDate,
  isRecentlyArchived,
} from '../../../utils/wishlistArchive'

interface Props {
  item: WishlistItem
  onRestore: (id: string) => void
  onDelete: (id: string) => void
}

const WishlistArchiveCard = ({ item, onRestore, onDelete }: Props) => (
  <li className="flex flex-col rounded-3xl bg-white p-6 shadow-sm">
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg font-medium text-[#0B3B24]">
        {item.name.charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-[#0F1F17]">{item.name}</h3>
        <p className="text-sm text-gray-500">
          Harga {formatRupiah(item.price)}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        {isRecentlyArchived(item) && (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
            Baru
          </span>
        )}
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
          Diarsipkan
        </span>
      </div>
    </div>

    <dl className="mt-6 space-y-3 text-sm">
      <div className="flex justify-between gap-4">
        <dt className="text-gray-500">Alasan</dt>
        <dd className="text-right font-medium text-[#0F1F17]">
          {ARCHIVE_REASON}
        </dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="text-gray-500">Diarsipkan</dt>
        <dd className="text-right font-medium text-[#0F1F17]">
          {item.archivedAt ? formatArchiveDate(item.archivedAt) : '-'} ·{' '}
          {item.delayDays} hari
        </dd>
      </div>
    </dl>

    <div className="mt-auto flex gap-3 pt-6">
      <button
        type="button"
        onClick={() => onRestore(item.id)}
        className="flex-1 rounded-full bg-[#0F1F17] py-3 text-sm font-medium text-white"
      >
        Kembali ke wishlist
      </button>
      <button
        type="button"
        onClick={() => onDelete(item.id)}
        className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-red-700 hover:bg-red-50"
      >
        Hapus
      </button>
    </div>
  </li>
)

export default WishlistArchiveCard