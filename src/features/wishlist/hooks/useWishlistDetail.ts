import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useWishlistStore } from '../../../stores/wishlistStore'

export const useWishlistDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const item = useWishlistStore((s) => s.allItems.find((i) => i.id === id))
  const decide = useWishlistStore((s) => s.decide)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const archive = () => {
    if (!item) return
    setConfirmOpen(false)
    // TODO: PATCH ke BE
    decide(item.id, 'cancelled')
    navigate('/wishlist')
  }

  return {
    item,
    confirmOpen,
    openConfirm: () => setConfirmOpen(true),
    closeConfirm: () => setConfirmOpen(false),
    archive,
  }
}