import { Plus } from 'lucide-react'
import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import WishlistForm from '../features/wishlist/components/WishlistForm'
import WishlistList from '../features/wishlist/components/WishlistList'
import WishlistTabs from '../features/wishlist/components/WishlistTabs'
import WishlistToolbar, {
  type WishlistFilter,
  type WishlistSort,
} from '../features/wishlist/components/WishlistToolbar'
import { useWishlist } from '../features/wishlist/hooks/useWishlist'
import { formatRupiah } from '../utils/format'
import { getDaysLeft, getShortfall, isExpired } from '../utils/wishlist'

const Wishlist = () => {
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

  const isFiltered = query.trim() !== '' || filter !== 'all'

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Wishlist" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setFormOpen(true)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#0F1F17] px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-black"
        >
          <Plus size={14} />
          Tambah Wishlist
        </button>

        <WishlistTabs
          activeCount={items.length}
          archivedCount={archivedItems.length}
        />
      </div>

      <section className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 rounded-2xl bg-[#0B3B24] px-6 py-4 text-white">
        <div>
          <p className="text-[11px]">Saldo Tabungan Wishlist</p>
          <p className="text-3xl font-extrabold">{formatRupiah(totalSaved)}</p>
        </div>
        {totalShortfall > 0 && (
          <p className="max-w-64 text-xs leading-snug sm:text-right">
            Kamu masih perlu menabung {formatRupiah(totalShortfall)} lagi untuk
            mencapai semua target wishlistmu
          </p>
        )}
      </section>

      {hasExpired && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#FF1500] px-6 py-4 text-white"
        >
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wide">
              Masa tunda berakhir
            </p>
            <p className="text-sm font-medium">
              Beberapa wishlist mu sudah melalui masa tunda, apakah kamu masih
              menginginkannya?
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFilter('done')}
            className="cursor-pointer rounded-full bg-white px-5 py-2.5 text-xs font-medium text-gray-900 transition-colors hover:bg-gray-100"
          >
            Lihat Wishlist
          </button>
        </div>
      )}

      <WishlistToolbar
        query={query}
        onQueryChange={setQuery}
        filter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
      />

      <WishlistList items={visibleItems} isFiltered={isFiltered} />

      <WishlistForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={addItem}
      />
    </div>
  )
}

export default Wishlist