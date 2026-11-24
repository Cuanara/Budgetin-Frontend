import type { WishlistItem } from '../types/wishlist'
import { addDaysToDate, formatShortDate } from './date'
import { formatRupiah } from './format'

export interface HistoryEntry {
  id: string
  title: string
  subtitle: string
}

export const getEndDateLabel = (item: WishlistItem) =>
  item.createdAt
    ? formatShortDate(addDaysToDate(item.createdAt, item.delayDays))
    : undefined

export const getHistory = (item: WishlistItem): HistoryEntry[] => {
  const entries: HistoryEntry[] = []

  if (item.createdAt) {
    entries.push({
      id: 'created',
      title: 'Wishlist ditambahkan',
      subtitle: `${formatShortDate(item.createdAt)} · masa tunda ${item.delayDays} hari dimulai`,
    })
  }

  ;(item.savings ?? []).forEach((saving) => {
    entries.push({
      id: saving.id,
      title: `Menabung ${formatRupiah(saving.amount)}`,
      subtitle: formatShortDate(saving.date),
    })
  })

  return entries
}