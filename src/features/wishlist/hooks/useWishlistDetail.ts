import { useParams } from 'react-router-dom'
import { useWishlistStore } from '../../../stores/wishlistStore'

export const useWishlistDetail = () => {
  const { id } = useParams<{ id: string }>()
  const item = useWishlistStore((s) => s.allItems.find((i) => i.id === id))

  return { item }
}