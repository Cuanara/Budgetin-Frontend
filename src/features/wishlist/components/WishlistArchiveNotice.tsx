import Toast from '../../../components/ui/Toast'
import { useWishlistStore } from '../../../stores/wishlistStore'

const WishlistArchiveNotice = () => {
  const item = useWishlistStore((s) =>
    s.allItems.find((i) => i.id === s.lastArchivedId),
  )
  const restore = useWishlistStore((s) => s.restore)
  const clear = useWishlistStore((s) => s.clearArchiveNotice)

  if (!item) return null

  return (
    <Toast
      message={`${item.name} diarsipkan`}
      actionLabel="Urungkan"
      onAction={() => restore(item.id)}
      onClose={clear}
    />
  )
}

export default WishlistArchiveNotice