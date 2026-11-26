import { create } from 'zustand'

export type NotificationType =
  | 'delayEnd'
  | 'delayReminder'
  | 'delayStart'
  | 'balance'
  | 'transaction'
  | 'budget'

export interface AppNotification {
  id: number
  type: NotificationType
  title: string
  message: string
  daysAgo: number
  time?: string
  read: boolean
}

// TODO: ganti dengan data dari BE
const mocks: AppNotification[] = [
  { id: 1, type: 'delayEnd', title: 'Masa Tunda Berakhir', message: 'Masa tunda untuk “Headphone Nirkabel” sudah habis nih, kira-kira kamu jadi tetep mau beli ga nih?', daysAgo: 0, time: '10.24', read: false },
  { id: 2, type: 'balance', title: 'Saldo Sudah Cukup', message: 'Saldo kamu udah cukup nih buat checkout “Sepatu Lari”. Checkout sekarang!', daysAgo: 1, read: false },
  { id: 3, type: 'delayReminder', title: 'Pengingat Masa Tunda', message: 'Masa tunda buat check out “Tas Ransel” sisa 1 hari lagi nih. Masih ada waktu buat mikir lagi.', daysAgo: 1, read: true },
  { id: 4, type: 'transaction', title: 'Transaksi Berhasil', message: 'Pemasukan Rp 100.000 (Bonus Januari) sudah ditambahkan ke Budget bulanan. Saldo budget bulanan sudah diperbarui.', daysAgo: 2, read: true },
  { id: 5, type: 'budget', title: 'Budget Makan Hampir Habis', message: 'Pengeluaran kategori Makan udah 80% dari budget bulan ini. Yuk, lebih hemat di sisa bulan ini.', daysAgo: 4, read: true },
  { id: 6, type: 'transaction', title: 'Transaksi Berhasil', message: 'Pengeluaran Rp 15.000 (Beli Boba) sudah dicatat ke kategori Jajan.', daysAgo: 5, read: true },
  { id: 7, type: 'delayStart', title: 'Masa Tunda Dimulai', message: '“Tas Ransel” masuk wishlist dengan masa tunda 7 hari. Kami ingatkan lagi sebelum masa tunda habis.', daysAgo: 8, read: true },
]

interface NotificationState {
  items: AppNotification[]
  markAsRead: (id: number) => void
  markAllAsRead: () => void
  remove: (id: number) => void
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  items: mocks,
  markAsRead: (id) =>
    set((s) => ({
      items: s.items.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  markAllAsRead: () =>
    set((s) => ({ items: s.items.map((n) => ({ ...n, read: true })) })),
  remove: (id) => set((s) => ({ items: s.items.filter((n) => n.id !== id) })),
}))