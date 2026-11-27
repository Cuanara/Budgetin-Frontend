import { useEffect, useState } from 'react'
import { useWishlistStore } from '../../../stores/wishlistStore'

// Popup "Sudah kamu wujudkan?" muncul setelah user membuka link pembelian
// lalu kembali ke aplikasi (tab kembali aktif).
export const useFulfilledPrompt = () => {
  const fulfillId = useWishlistStore((s) => s.fulfillId)
  const fulfillReady = useWishlistStore((s) => s.fulfillReady)
  const item = useWishlistStore((s) =>
    s.allItems.find((i) => i.id === s.fulfillId),
  )
  const clearFulfill = useWishlistStore((s) => s.clearFulfill)
  const decide = useWishlistStore((s) => s.decide)
  const [returned, setReturned] = useState(false)

  useEffect(() => {
    if (!fulfillId) return

    let left = false
    const onLeave = () => {
      left = true
    }
    const onBack = () => {
      if (left) setReturned(true)
    }
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') onLeave()
      else onBack()
    }

    window.addEventListener('blur', onLeave)
    window.addEventListener('focus', onBack)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('blur', onLeave)
      window.removeEventListener('focus', onBack)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [fulfillId])

  const show = fulfillId !== null && (fulfillReady || returned)

  // "Sudah": wishlist dianggap terwujud dan keluar dari daftar aktif
  const answerYes = () => {
    if (item) decide(item.id, 'bought')
    setReturned(false)
  }

  // "Belum": wishlist tetap ada
  const answerNo = () => {
    clearFulfill()
    setReturned(false)
  }

  return { fulfillItem: show ? item : undefined, answerYes, answerNo }
}