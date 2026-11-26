import { useState } from 'react'
import { useWishlistStore } from '../../../stores/wishlistStore'

export const useSavingsModals = () => {
  const [modal, setModal] = useState<'add' | 'wishlist' | null>(null)
  const allItems = useWishlistStore((s) => s.allItems)

  return {
    modal,
    wishlistItems: allItems.filter((item) => !item.decision),
    openAddTarget: () => setModal('add'),
    openWishlist: () => setModal('wishlist'),
    closeModal: () => setModal(null),
  }
}