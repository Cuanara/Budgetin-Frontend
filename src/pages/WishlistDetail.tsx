import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import WishlistBalanceCheck from '../features/wishlist/components/WishlistBalanceCheck'
import WishlistDelayCard from '../features/wishlist/components/WishlistDelayCard'
import WishlistDetailHistory from '../features/wishlist/components/WishlistDetailHistory'
import WishlistDetailSummary from '../features/wishlist/components/WishlistDetailSummary'
import { useWishlistDetail } from '../features/wishlist/hooks/useWishlistDetail'

const WishlistDetail = () => {
  const { item } = useWishlistDetail()

  return (
    <div className="space-y-6">
      <PageHeader title="Detail Wishlist" />

      <Link
        to="/wishlist"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#0B3B24] hover:underline"
      >
        <ChevronLeft size={16} />
        Kembali ke Wishlist
      </Link>

      {!item ? (
        <div className="rounded-3xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
          Wishlist tidak ditemukan.
        </div>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(340px,1fr)]">
          <div className="space-y-6">
            <WishlistDetailSummary item={item} />
            <WishlistDetailHistory item={item} />
          </div>
          <div className="space-y-6">
            <WishlistDelayCard item={item} />
            <WishlistBalanceCheck item={item} />
          </div>
        </div>
      )}
    </div>
  )
}

export default WishlistDetail