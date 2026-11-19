import { useState } from 'react'
import { SAVING_SUGGEST_DAYS } from '../../../constants/wishlist'
import { useBalanceStore } from '../../../stores/balanceStore'
import { useWishlistStore } from '../../../stores/wishlistStore'
import { requestNotifyPermission } from '../../../utils/notification'
import { getBalancePercent, getSavingPerDay } from '../../../utils/wishlist'

export const useInsufficientBalance = () => {
  const item = useWishlistStore((s) =>
    s.allItems.find((i) => i.id === s.insufficientId),
  )
  const startSaving = useWishlistStore((s) => s.startSaving)
  const balance = useBalanceStore((s) => s.balance)
  const [notify, setNotify] = useState(true)

  const price = item?.price ?? 0
  const shortfall = Math.max(0, price - balance)

  const toggleNotify = () => setNotify((prev) => !prev)

  const confirm = async () => {
    if (!item) return
    // izin notifikasi harus diminta dari klik user
    const allowed = notify ? await requestNotifyPermission() : false
    // TODO: simpan preferensi ke BE
    startSaving(item.id, allowed)
  }

  return {
    item,
    balance,
    shortfall,
    percent: getBalancePercent(balance, price),
    perDay: getSavingPerDay(shortfall, SAVING_SUGGEST_DAYS),
    days: SAVING_SUGGEST_DAYS,
    notify,
    toggleNotify,
    confirm,
  }
}
