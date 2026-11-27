import { Plus } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import WishlistForm from '../features/wishlist/components/WishlistForm'
import WishlistList from '../features/wishlist/components/WishlistList'
import WishlistTabs from '../features/wishlist/components/WishlistTabs'
import WishlistToolbar from '../features/wishlist/components/WishlistToolbar'
import { useWishlistPage } from '../features/wishlist/hooks/useWishlistPage'
import { formatRupiah } from '../utils/format'

const Wishlist = () => {
  const page = useWishlistPage()

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Wishlist" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={page.openForm}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#0F1F17] px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-black"
        >
          <Plus size={14} />
          Tambah Wishlist
        </button>

        <WishlistTabs
          activeCount={page.activeCount}
          archivedCount={page.archivedCount}
        />
      </div>

      <section className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 rounded-2xl bg-[#0B3B24] px-6 py-4 text-white">
        <div>
          <p className="text-[11px]">Saldo Tabungan Wishlist</p>
          <p className="text-3xl font-extrabold">
            {formatRupiah(page.totalSaved)}
          </p>
        </div>
        {page.totalShortfall > 0 && (
          <p className="max-w-64 text-xs leading-snug sm:text-right">
            Kamu masih perlu menabung {formatRupiah(page.totalShortfall)} lagi
            untuk mencapai semua target wishlistmu
          </p>
        )}
      </section>

      {page.hasExpired && (
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
            onClick={page.showExpired}
            className="cursor-pointer rounded-full bg-white px-5 py-2.5 text-xs font-medium text-gray-900 transition-colors hover:bg-gray-100"
          >
            Lihat Wishlist
          </button>
        </div>
      )}

      <WishlistToolbar
        query={page.query}
        onQueryChange={page.setQuery}
        filter={page.filter}
        onFilterChange={page.setFilter}
        sort={page.sort}
        onSortChange={page.setSort}
      />

      <WishlistList items={page.visibleItems} isFiltered={page.isFiltered} />

      <WishlistForm
        open={page.formOpen}
        onClose={page.closeForm}
        onSubmit={page.addItem}
      />
    </div>
  )
}

export default Wishlist