import type { WishlistItem } from '../../../types/wishlist'
import WishlistListItem from './WishlistListItem'

interface Props {
  items: WishlistItem[]
  isFiltered?: boolean
}

const WishlistList = ({ items, isFiltered = false }: Props) => {
  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
        {isFiltered ? 'Wishlist tidak ditemukan.' : 'Belum ada wishlist.'}
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <WishlistListItem key={item.id} item={item} />
      ))}
    </ul>
  )
}

export default WishlistList