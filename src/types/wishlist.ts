export type WishlistDecision = 'bought' | 'cancelled'

export type WishlistCategory = 'Barang' | 'Non Barang'

export interface WishlistSaving {
  id: string
  amount: number
  date: string // ISO, contoh '2026-11-14'
}

export interface WishlistItem {
  id: string
  name: string
  price: number
  saved: number // dana yang sudah terkumpul untuk barang ini
  link?: string
  category?: WishlistCategory
  delayDays: number // total masa tunda
  dayElapsed: number // sudah hari ke berapa
  createdAt?: string // ISO, tanggal wishlist ditambahkan
  savings?: WishlistSaving[] // riwayat menabung untuk barang ini
  decision?: WishlistDecision // diisi setelah masa tunda berakhir
  archivedAt?: string // ISO, diisi saat decision = 'cancelled'
  saving?: boolean // memilih Jadi tapi saldo kurang, lanjut menabung
  notifyWhenEnough?: boolean // preferensi "Kabari aku saat saldo cukup"
  notified?: boolean // notifikasi sudah terkirim
}

export interface WishlistFormValues {
  name: string
  link: string
  price: number
  category: WishlistCategory
  delayDays: number
}