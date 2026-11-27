import { useState } from 'react'
import { getDaysLeft, getShortfall, isExpired } from '../../../utils/wishlist'
import type {
  WishlistFilter,
  WishlistSort,
} from '../components/WishlistToolbar'
import { useWishlist } from './useWishlist'

export const useWishlistPage = () => {
  const { items, archivedItems, addItem } = useWishlist()

  const [formOpen, setFormOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<WishlistFilter>('all')
  const [sort, setSort] = useState<WishlistSort>('newest')

  const totalSaved = items.reduce((sum, item) => sum + item.saved, 0)
  const totalShortfall = items.reduce((sum, item) => sum + getShortfall(item), 0)
  const hasExpired = items.some(isExpired)

  const visibleItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .filter((item) => {
      if (filter === 'running') return getDaysLeft(item) > 0
      if (filter === 'done') return getDaysLeft(item) <= 0
      return true
    })
    .sort((a, b) => {
      if (sort === 'smallest') return a.price - b.price
      if (sort === 'largest') return b.price - a.price
      if (sort === 'oldest')
        return (a.createdAt ?? '').localeCompare(b.createdAt ?? '')
      return (b.createdAt ?? '').localeCompare(a.createdAt ?? '')
    })

  return {
    activeCount: items.length,
    archivedCount: archivedItems.length,
    visibleItems,
    isFiltered: query.trim() !== '' || filter !== 'all',
    totalSaved,
    totalShortfall,
    hasExpired,
    formOpen,
    openForm: () => setFormOpen(true),
    closeForm: () => setFormOpen(false),
    query,
    setQuery,
    filter,
    setFilter,
    showExpired: () => setFilter('done'),
    sort,
    setSort,
    addItem,
  }
}