import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import Toast from '../components/ui/Toast'
import WishlistArchiveCard from '../features/wishlist/components/WishlistArchiveCard'
import WishlistArchiveSummary from '../features/wishlist/components/WishlistArchiveSummary'
import WishlistDeleteConfirmModal from '../features/wishlist/components/WishlistDeleteConfirmModal'
import WishlistTabs from '../features/wishlist/components/WishlistTabs'
import { useWishlistArchive } from '../features/wishlist/hooks/useWishlistArchive'

const WishlistArchive = () => {
  const {
    items,
    activeCount,
    totalHeld,
    toast,
    dismissToast,
    restoreItem,
    deleteItem,
  } = useWishlistArchive()
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  const pendingItem = items.find((item) => item.id === pendingDeleteId) ?? null

  const handleConfirmDelete = (id: string) => {
    deleteItem(id)
    setPendingDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Arsip Wishlist" />

      <div className="flex justify-end">
        <WishlistTabs activeCount={activeCount} archivedCount={items.length} />
      </div>

      <WishlistArchiveSummary total={totalHeld} count={items.length} />

      {items.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
          Belum ada barang di arsip.
        </div>
      ) : (
        <>
          <ul className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <WishlistArchiveCard
                key={item.id}
                item={item}
                onRestore={restoreItem}
                onDelete={setPendingDeleteId}
              />
            ))}
          </ul>
          <p className="text-center text-xs text-gray-500">
            Hapus permanen akan menghilangkan barang dari sistem dan tidak bisa
            dikembalikan.
          </p>
        </>
      )}

      <WishlistDeleteConfirmModal
        item={pendingItem}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />

      {toast && (
        <Toast
          message={toast.message}
          actionLabel="Urungkan"
          onAction={() => {
            toast.onUndo()
            dismissToast()
          }}
          onClose={dismissToast}
        />
      )}
    </div>
  )
}

export default WishlistArchive