import { useState } from 'react'
import { SAVING_SUGGEST_DAYS } from '../../../constants/wishlist'
import { useBalanceStore } from '../../../stores/balanceStore'
import { useWishlistStore } from '../../../stores/wishlistStore'
import { getBalancePercent, getSavingPerDay } from '../../../utils/wishlist'

export const useInsufficientBalance = () => {
  const item = useWishlistStore((s) =>
    s.allItems.find((i) => i.id === s.insufficientId),
  )
  const startSaving = useWishlistStore((s) => s.startSaving)
  const decide = useWishlistStore((s) => s.decide)
  const balance = useBalanceStore((s) => s.balance)
  const [notify, setNotify] = useState(true)

  const shortfall = item ? Math.max(0, item.price - balance) : 0
  const percent = item ? getBalancePercent(balance, item.price) : 0
  const days = SAVING_SUGGEST_DAYS
  const perDay = getSavingPerDay(shortfall, days)

  // "Masukkan wishlist pada tabungan"
  const confirm = () => {
    if (item) startSaving(item.id, notify)
  }

  // "Batal diwujudkan": wishlist masuk arsip
  const cancel = () => {
    if (item) decide(item.id, 'cancelled')
  }

  return {
    item,
    balance,
    shortfall,
    percent,
    perDay,
    days,
    notify,
    toggleNotify: () => setNotify((v) => !v),
    confirm,
    cancel,
  }
}