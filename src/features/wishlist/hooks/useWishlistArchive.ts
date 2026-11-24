import { useCallback, useMemo, useState } from 'react'
import { useWishlistStore } from '../../../stores/wishlistStore'
import { getTotalHeld } from '../../../utils/wishlistArchive'

interface ToastState {
  message: string
  onUndo: () => void
}

export const useWishlistArchive = () => {
  const allItems = useWishlistStore((s) => s.allItems)
  const restore = useWishlistStore((s) => s.restore)
  const replace = useWishlistStore((s) => s.replace)
  const remove = useWishlistStore((s) => s.remove)
  const [toast, setToast] = useState<ToastState | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  const dismissToast = useCallback(() => setToast(null), [])

  const items = useMemo(
    () =>
      allItems
        .filter((item) => item.decision === 'cancelled')
        .sort(
          (a, b) =>
            new Date(b.archivedAt ?? 0).getTime() -
            new Date(a.archivedAt ?? 0).getTime(),
        ),
    [allItems],
  )

  const activeCount = allItems.filter((item) => !item.decision).length
  const pendingItem = items.find((item) => item.id === pendingDeleteId) ?? null

  const restoreItem = (id: string) => {
    const snapshot = items.find((item) => item.id === id)
    if (!snapshot) return

    // TODO: ganti dengan PATCH ke BE (kembalikan ke wishlist aktif)
    restore(id)
    setToast({
      message: `${snapshot.name} dikembalikan ke wishlist`,
      onUndo: () => replace(snapshot),
    })
  }

  const requestDelete = (id: string) => setPendingDeleteId(id)
  const cancelDelete = () => setPendingDeleteId(null)

  const confirmDelete = (id: string) => {
    // TODO: ganti dengan DELETE ke BE (permanen)
    remove(id)
    setPendingDeleteId(null)
  }

  return {
    items,
    activeCount,
    totalHeld: getTotalHeld(items),
    toast,
    dismissToast,
    pendingItem,
    restoreItem,
    requestDelete,
    cancelDelete,
    confirmDelete,
  }
}