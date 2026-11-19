import { useEffect } from 'react'
import { useBalanceStore } from '../../../stores/balanceStore'
import { useWishlistStore } from '../../../stores/wishlistStore'
import { sendNotification } from '../../../utils/notification'

export const useSavingNotifier = () => {
  const allItems = useWishlistStore((s) => s.allItems)
  const markNotified = useWishlistStore((s) => s.markNotified)
  const showSufficient = useWishlistStore((s) => s.showSufficient)
  const balance = useBalanceStore((s) => s.balance)

  useEffect(() => {
    const ready = allItems.find(
      (item) =>
        !item.decision &&
        item.saving &&
        item.notifyWhenEnough &&
        !item.notified &&
        balance >= item.price,
    )
    if (!ready) return

    sendNotification(
      'Saldo kamu sudah cukup',
      `Saldo sudah cukup untuk membeli ${ready.name}.`,
    )
    markNotified(ready.id)
    showSufficient(ready.id)
  }, [allItems, balance, markNotified, showSufficient])
}