import type { WishlistItem } from '../../../types/wishlist'
import { getHistory } from '../../../utils/wishlistDetail'

interface Props {
  item: WishlistItem
}

const WishlistDetailHistory = ({ item }: Props) => {
  const entries = getHistory(item)

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <h3 className="text-lg font-semibold text-[#0B3B24]">Riwayat wishlist</h3>

      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">Belum ada riwayat.</p>
      ) : (
        <ol className="mt-5">
          {entries.map((entry, index) => (
            <li key={entry.id} className="relative flex gap-4 pb-6 last:pb-0">
              {index < entries.length - 1 && (
                <span className="absolute left-[7px] top-5 h-full w-0.5 bg-emerald-100" />
              )}
              <span className="relative mt-1 size-4 shrink-0 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
              <div>
                <p className="font-medium text-gray-900">{entry.title}</p>
                <p className="text-xs text-gray-500">{entry.subtitle}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default WishlistDetailHistory