import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import WishlistArchiveConfirmModal from '../features/wishlist/components/WishlistArchiveConfirmModal'
import WishlistBalanceCheck from '../features/wishlist/components/WishlistBalanceCheck'
import WishlistDelayCard from '../features/wishlist/components/WishlistDelayCard'
import WishlistDetailHistory from '../features/wishlist/components/WishlistDetailHistory'
import WishlistDetailSummary from '../features/wishlist/components/WishlistDetailSummary'
import { useWishlistDetail } from '../features/wishlist/hooks/useWishlistDetail'
import { useWishlistStore } from '../stores/wishlistStore'

const WishlistDetail = () => {
  const { item } = useWishlistDetail()
  const navigate = useNavigate()
  const decide = useWishlistStore((s) => s.decide)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleArchive = () => {
    if (!item) return
    setConfirmOpen(false)
    // TODO: PATCH ke BE
    decide(item.id, 'cancelled')
    navigate('/wishlist')
  }

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Wishlist › Detail Wishlist" />

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Link
          to="/wishlist"
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-gray-900 shadow-sm ring-1 ring-black/5 transition-colors hover:bg-gray-50"
        >
          <ArrowLeft size={14} />
          Kembali
        </Link>
        {item && (
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="cursor-pointer rounded-full bg-[#0F1F17] px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-black"
          >
            Arsipkan Wishlist Ini
          </button>
        )}
      </div>

      {!item ? (
        <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-600 shadow-sm">
          Wishlist tidak ditemukan.
        </div>
      ) : (
        <>
          <WishlistDetailSummary item={item} />

          <div className="grid items-stretch gap-5 md:grid-cols-2">
            <WishlistDelayCard item={item} />
            <WishlistBalanceCheck item={item} />
          </div>

          <WishlistDetailHistory item={item} />
        </>
      )}

      <WishlistArchiveConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleArchive}
      />
    </div>
  )
}

export default WishlistDetail