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
    <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
      <PageHeader title="Wishlist" />

      {/* Tombol tambah dan tab */}
      <div className="flex w-full items-center justify-between gap-3">
        <button
          type="button"
          onClick={page.openForm}
          aria-label="Tambah wishlist"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#0B1720] text-white shadow-sm transition hover:bg-[#173D2B] sm:size-12"
        >
          <Plus size={21} />
        </button>

        <WishlistTabs
          activeCount={page.activeCount}
          archivedCount={page.archivedCount}
        />
      </div>

      {/* Reminder masa tunda */}
      {page.hasExpired && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-2xl bg-[#E9230B] p-4 text-white sm:p-5"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide">
              Masa tunda berakhir
            </p>
            <p className="mt-1 text-xs leading-relaxed sm:text-sm">
              Beberapa wishlist mu sudah melalui masa tunda, apakah kamu masih
              menginginkannya?
            </p>
          </div>

          <button
            type="button"
            onClick={page.showExpired}
            className="w-full rounded-full bg-white py-2.5 text-xs font-semibold text-[#0B3B24] transition hover:bg-emerald-50"
          >
            Lihat Wishlist
          </button>
        </div>
      )}

      {/* Ringkasan saldo tabungan */}
      <section className="flex min-w-0 flex-col gap-2 rounded-2xl bg-[#0B3B24] p-4 text-white sm:p-5">
        <p className="text-[10px] font-medium">
          Saldo Tabungan Wishlist
        </p>

        <p className="text-2xl font-bold leading-tight sm:text-3xl">
          {formatRupiah(page.totalSaved)}
        </p>

        {page.totalShortfall > 0 && (
          <p className="max-w-sm text-[10px] leading-relaxed text-emerald-100 sm:text-xs">
            Kamu masih perlu menabung {formatRupiah(page.totalShortfall)} lagi
            untuk mencapai semua target wishlistmu
          </p>
        )}
      </section>

      {/* Pencarian, filter, sorting */}
      <WishlistToolbar
        query={page.query}
        onQueryChange={page.setQuery}
        filter={page.filter}
        onFilterChange={page.setFilter}
        sort={page.sort}
        onSortChange={page.setSort}
      />

      {/* Daftar wishlist */}
      <WishlistList
        items={page.visibleItems}
        isFiltered={page.isFiltered}
      />

      <WishlistForm
        open={page.formOpen}
        onClose={page.closeForm}
        onSubmit={page.addItem}
      />
    </div>
  )
}

export default Wishlist
