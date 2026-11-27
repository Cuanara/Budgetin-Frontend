import type { WishlistItem } from '../../../types/wishlist'
import { getDaysLeft } from '../../../utils/wishlist'
import { getEndDateLabel } from '../../../utils/wishlistDetail'

interface Props {
  item: WishlistItem
}

const WishlistDelayCard = ({ item }: Props) => {
  const daysLeft = getDaysLeft(item)
  const endDate = getEndDateLabel(item)
  const filled = Math.min(item.delayDays, Math.max(0, item.dayElapsed))

  return (
    <section className="h-full rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="text-sm font-bold text-[#0B3B24]">Masa tunda</h3>

      <div className="mt-3 flex gap-1.5" aria-hidden>
        {Array.from({ length: item.delayDays }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < filled ? 'bg-emerald-500' : 'bg-emerald-100'
            }`}
          />
        ))}
      </div>

      <p className="mt-2 text-[11px] text-gray-800">
        {daysLeft > 0 ? (
          <>
            <strong>Sisa {daysLeft} hari.</strong>
            {endDate && ` Berakhir pada ${endDate}.`}
          </>
        ) : (
          <strong>Masa tunda sudah berakhir.</strong>
        )}
      </p>
      <p className="mt-2 text-[10px] leading-relaxed text-gray-600">
        Masa tunda membantu memastikan barang ini memang kamu butuhkan, bukan
        sekadar belanja impulsif.
      </p>
    </section>
  )
}

export default WishlistDelayCard