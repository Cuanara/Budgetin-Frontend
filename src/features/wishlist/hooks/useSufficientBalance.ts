import { useBalanceStore } from '../../../stores/balanceStore'
import { useWishlistStore } from '../../../stores/wishlistStore'

export const useSufficientBalance = () => {
  const item = useWishlistStore((s) =>
    s.allItems.find((i) => i.id === s.sufficientId),
  )
  const decide = useWishlistStore((s) => s.decide)
  const dismissSufficient = useWishlistStore((s) => s.dismissSufficient)
  const balance = useBalanceStore((s) => s.balance)

  const remaining = balance - (item?.price ?? 0)

  // Arahkan ke Link Pembelian: buka link, tandai sudah dibeli
  const buy = () => {
    if (!item) return
    if (item.link) window.open(item.link, '_blank', 'noopener')
    // TODO: BE membuat transaksi pengeluaran dan mengurangi saldo
    decide(item.id, 'bought')
  }

  // Nanti dulu: kembali ke Wishlist tanpa membeli
  const later = () => {
    if (!item) return
    dismissSufficient(item.id)
  }

  return { item, balance, remaining, buy, later }
}
