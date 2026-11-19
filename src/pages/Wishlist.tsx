import PageHeader from '../components/layout/PageHeader'
import WishlistArchiveLink from '../features/wishlist/components/WishlistArchiveLink'
import WishlistForm from '../features/wishlist/components/WishlistForm'
import WishlistList from '../features/wishlist/components/WishlistList'
import { useWishlist } from '../features/wishlist/hooks/useWishlist'

const Wishlist = () => {
  const { items, addItem } = useWishlist()

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-6">
      <PageHeader title="Wishlist" />

      <div className="grid items-start gap-6 lg:grid-cols-[480px_1fr]">
        <WishlistForm onSubmit={addItem} />
        <WishlistList items={items} />
      </div>

      <div className="mt-auto flex justify-end pt-6">
        <WishlistArchiveLink />
      </div>
    </div>
  )
}

export default Wishlist