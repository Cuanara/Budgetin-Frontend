import { ARCHIVE_NEW_DAYS } from '../constants/wishlist'
import type { WishlistItem } from '../types/wishlist'

const DAY_MS = 24 * 60 * 60 * 1000

// Total uang yang batal dibelanjakan
export const getTotalHeld = (items: WishlistItem[]) =>
  items.reduce((sum, item) => sum + item.price, 0)

export const formatArchiveDate = (iso: string) =>
  new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

export const isRecentlyArchived = (item: WishlistItem) => {
  if (!item.archivedAt) return false
  return Date.now() - new Date(item.archivedAt).getTime() <= ARCHIVE_NEW_DAYS * DAY_MS
}