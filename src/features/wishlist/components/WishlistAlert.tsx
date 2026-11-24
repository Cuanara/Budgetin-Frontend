import type { WishlistDecision, WishlistItem } from '../../../types/wishlist'

interface Props {
  item: WishlistItem
  onDecide: (id: string, decision: WishlistDecision) => void
}

const WishlistAlert = ({ item, onDecide }: Props) => (
  <div
    role="alert"
    className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-[#FF1500] px-6 py-5 text-white"
  >
    <div className="min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-wide">
        Masa tunda berakhir
      </p>
      <p className="text-xl font-semibold">{item.name}, jadi dibeli?</p>
    </div>

    <div className="flex shrink-0 gap-3">
      <button
        type="button"
        onClick={() => onDecide(item.id, 'bought')}
        className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-gray-900"
      >
        Jadi
      </button>
      <button
        type="button"
        onClick={() => onDecide(item.id, 'cancelled')}
        className="rounded-full bg-black/25 px-6 py-2.5 text-sm font-medium text-white hover:bg-black/35"
      >
        Tidak jadi
      </button>
    </div>
  </div>
)

export default WishlistAlert