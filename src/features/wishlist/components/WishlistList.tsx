import type { WishlistItem } from '../../../types/wishlist'
import WishlistListItem from './WishlistListItem'

interface Props {
  items: WishlistItem[]
}

const WishlistList = ({ items }: Props) => (
  <section>
    <h2 className="mb-4 text-2xl font-medium">Wishlist kamu</h2>
    {items.length === 0 ? (
      <div className="rounded-3xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
        Belum ada wishlist.
      </div>
    ) : (
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,420px),1fr))] items-start gap-5">
        {items.map((item) => (
          <WishlistListItem key={item.id} item={item} />
        ))}
      </ul>
    )}
  </section>
)

export default WishlistList