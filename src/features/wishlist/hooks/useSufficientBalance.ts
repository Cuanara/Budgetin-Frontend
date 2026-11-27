import { useBalanceStore } from '../../../stores/balanceStore'
import { useWishlistStore } from '../../../stores/wishlistStore'

export const useSufficientBalance = () => {
  const item = useWishlistStore((s) =>
    s.allItems.find((i) => i.id === s.sufficientId),
  )
  const dismissSufficient = useWishlistStore((s) => s.dismissSufficient)
  const askFulfilled = useWishlistStore((s) => s.askFulfilled)
  const balance = useBalanceStore((s) => s.balance)

  const remaining = item ? balance - item.price : 0

  // "Arahkan ke Link Pembelian": buka link, lalu tanya "Sudah kamu wujudkan?"
  // saat user kembali ke aplikasi (lihat useFulfilledPrompt)
  const buy = () => {
    if (!item) return
    dismissSufficient(item.id)
    if (item.link) window.open(item.link, '_blank', 'noopener')
    askFulfilled(item.id, !item.link)
  }

  const later = () => {
    if (item) dismissSufficient(item.id)
  }

  return { item, balance, remaining, buy, later }
}