import { useState } from 'react'
import { useBalanceStore } from '../../../stores/balanceStore'
import { useWishlistStore } from '../../../stores/wishlistStore'
import type {
  WishlistDecision,
  WishlistFormValues,
} from '../../../types/wishlist'
import {
  getDaysLeft,
  isExpired,
  isUrgent,
  normalizeLink,
} from '../../../utils/wishlist'

export const useWishlist = () => {
  const allItems = useWishlistStore((s) => s.allItems)
  const insufficientId = useWishlistStore((s) => s.insufficientId)
  const sufficientId = useWishlistStore((s) => s.sufficientId)
  const add = useWishlistStore((s) => s.add)
  const extend = useWishlistStore((s) => s.extend)
  const decide = useWishlistStore((s) => s.decide)
  const showInsufficient = useWishlistStore((s) => s.showInsufficient)
  const showSufficient = useWishlistStore((s) => s.showSufficient)
  const balance = useBalanceStore((s) => s.balance)
  const [isReminderOpen, setIsReminderOpen] = useState(false)

  const items = allItems.filter((item) => !item.decision)
  const archivedItems = allItems.filter((item) => item.decision === 'cancelled')
  const expiredItem = items.find(isExpired)
  const urgentItem = items
    .filter(isUrgent)
    .sort((a, b) => getDaysLeft(a) - getDaysLeft(b))[0]
  const hasInsufficient = insufficientId !== null
  const hasSufficient = sufficientId !== null

  const openReminder = () => setIsReminderOpen(true)
  const closeReminder = () => setIsReminderOpen(false)

  const addItem = (values: WishlistFormValues) => {
    // TODO: ganti dengan POST ke BE; price & saved nanti dari response
    add({
      id: crypto.randomUUID(),
      name: values.name,
      link: normalizeLink(values.link),
      price: 0,
      saved: 0,
      delayDays: values.delayDays,
      dayElapsed: 0,
      createdAt: new Date().toISOString(),
    })
  }

  const extendItem = (id: string) => {
    // TODO: ganti dengan PATCH ke BE
    extend(id)
    setIsReminderOpen(false)
  }

  const decideItem = (id: string, decision: WishlistDecision) => {
    // TODO: PATCH ke BE
    if (decision === 'bought') {
      const item = allItems.find((i) => i.id === id)
      if (item) {
        if (balance < item.price) {
          showInsufficient(id) // saldo kurang -> "Saldo belum cukup"
        } else {
          showSufficient(id) // saldo cukup -> "Saldo kamu cukup!"
        }
        return
      }
    }
    decide(id, decision)
  }

  return {
    items,
    archivedItems,
    urgentItem,
    expiredItem,
    hasInsufficient,
    hasSufficient,
    isReminderOpen,
    openReminder,
    closeReminder,
    addItem,
    extendItem,
    decideItem,
  }
}