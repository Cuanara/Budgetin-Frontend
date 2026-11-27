import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EXTEND_DAYS } from '../constants/wishlist'
import { WISHLIST_MOCK } from '../features/wishlist/mocks'
import type { WishlistDecision, WishlistItem } from '../types/wishlist'

interface WishlistState {
  allItems: WishlistItem[]
  insufficientId: string | null
  sufficientId: string | null
  lastArchivedId: string | null
  fulfillId: string | null // item yang ditanya "Sudah kamu wujudkan?"
  fulfillReady: boolean // true = langsung tanya (tanpa menunggu user kembali)
  add: (item: WishlistItem) => void
  extend: (id: string) => void
  decide: (id: string, decision: WishlistDecision) => void
  restore: (id: string) => void
  replace: (item: WishlistItem) => void
  remove: (id: string) => void
  clearArchiveNotice: () => void
  showInsufficient: (id: string) => void
  showSufficient: (id: string) => void
  dismissSufficient: (id: string) => void
  startSaving: (id: string, notify: boolean) => void
  markNotified: (id: string) => void
  askFulfilled: (id: string, ready: boolean) => void
  clearFulfill: () => void
}

const patch = (
  items: WishlistItem[],
  id: string,
  changes: Partial<WishlistItem>,
) => items.map((item) => (item.id === id ? { ...item, ...changes } : item))

// MOCK: persist ke localStorage hanya selama development.
// Hapus saat data wishlist sudah datang dari BE.
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      allItems: WISHLIST_MOCK,
      insufficientId: null,
      sufficientId: null,
      lastArchivedId: null,
      fulfillId: null,
      fulfillReady: false,
      add: (item) => set((s) => ({ allItems: [...s.allItems, item] })),
      extend: (id) =>
        set((s) => ({
          allItems: s.allItems.map((item) =>
            item.id === id
              ? { ...item, delayDays: item.delayDays + EXTEND_DAYS }
              : item,
          ),
        })),
      decide: (id, decision) =>
        set((s) => ({
          sufficientId: null,
          insufficientId: null,
          fulfillId: null,
          fulfillReady: false,
          lastArchivedId: decision === 'cancelled' ? id : s.lastArchivedId,
          allItems: patch(s.allItems, id, {
            decision,
            archivedAt:
              decision === 'cancelled' ? new Date().toISOString() : undefined,
          }),
        })),
      // Kembali ke wishlist aktif dengan masa tunda diulang dari awal
      restore: (id) =>
        set((s) => ({
          lastArchivedId: s.lastArchivedId === id ? null : s.lastArchivedId,
          allItems: patch(s.allItems, id, {
            decision: undefined,
            archivedAt: undefined,
            dayElapsed: 0,
            saving: undefined,
            notifyWhenEnough: undefined,
            notified: undefined,
          }),
        })),
      // Pasang kembali snapshot item (dipakai untuk "Urungkan")
      replace: (item) =>
        set((s) => ({
          allItems: s.allItems.map((i) => (i.id === item.id ? item : i)),
        })),
      remove: (id) =>
        set((s) => ({
          lastArchivedId: s.lastArchivedId === id ? null : s.lastArchivedId,
          allItems: s.allItems.filter((item) => item.id !== id),
        })),
      clearArchiveNotice: () => set({ lastArchivedId: null }),
      showInsufficient: (id) => set({ insufficientId: id }),
      showSufficient: (id) => set({ sufficientId: id }),
      // "Nanti dulu": item tetap di Wishlist, popup masa tunda tidak muncul lagi
      dismissSufficient: (id) =>
        set((s) => ({
          sufficientId: null,
          allItems: patch(s.allItems, id, { saving: true, notified: true }),
        })),
      startSaving: (id, notify) =>
        set((s) => ({
          insufficientId: null,
          allItems: patch(s.allItems, id, {
            saving: true,
            notifyWhenEnough: notify,
            notified: false,
          }),
        })),
      markNotified: (id) =>
        set((s) => ({ allItems: patch(s.allItems, id, { notified: true }) })),
      askFulfilled: (id, ready) =>
        set({ fulfillId: id, fulfillReady: ready, sufficientId: null }),
      clearFulfill: () => set({ fulfillId: null, fulfillReady: false }),
    }),
    {
      name: 'wishlist-store',
      partialize: (s) => ({ allItems: s.allItems }),
    },
  ),
)