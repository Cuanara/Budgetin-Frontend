import type { WishlistItem } from '../types/wishlist'
import { URGENT_THRESHOLD_DAYS } from '../constants/wishlist'

export const getDaysLeft = (item: WishlistItem) =>
  item.delayDays - item.dayElapsed

export const getShortfall = (item: WishlistItem) =>
  Math.max(0, item.price - item.saved)

export const getProgressPercent = (item: WishlistItem) =>
  item.price > 0
    ? Math.min(100, Math.round((item.saved / item.price) * 100))
    : 0

// Progres masa tunda (berdasarkan hari), beda dengan progres dana di atas
export const getDayProgressPercent = (item: WishlistItem) =>
  item.delayDays > 0
    ? Math.min(
        100,
        Math.max(0, Math.round((item.dayElapsed / item.delayDays) * 100)),
      )
    : 0

export const isReady = (item: WishlistItem) =>
  item.price > 0 && item.saved >= item.price

// Item yang sedang menabung (memilih Jadi tapi saldo kurang) tidak
// memunculkan popup "Masa tunda berakhir" lagi
export const isExpired = (item: WishlistItem) =>
  getDaysLeft(item) <= 0 && !item.saving

export const isUrgent = (item: WishlistItem) => {
  const daysLeft = getDaysLeft(item)
  return !isReady(item) && daysLeft > 0 && daysLeft <= URGENT_THRESHOLD_DAYS
}

export const getStatusText = (item: WishlistItem) =>
  isReady(item) ? 'Siap dibeli' : `Tunda ${item.delayDays} hari`

export const getReminderTitle = (item: WishlistItem) => {
  const daysLeft = getDaysLeft(item)
  if (daysLeft <= 0) return 'Masa tundamu berakhir hari ini'
  if (daysLeft === 1) return 'Besok masa tundamu berakhir'
  return `Masa tundamu berakhir ${daysLeft} hari lagi`
}

export const getEndLabel = (item: WishlistItem) => {
  const daysLeft = getDaysLeft(item)
  if (daysLeft <= 0) return 'Berakhir hari ini'
  if (daysLeft === 1) return 'Berakhir besok'
  return `Berakhir ${daysLeft} hari lagi`
}

// Link dari form bisa tanpa "https://", padahal window.open butuh URL lengkap
export const normalizeLink = (link: string) => {
  if (!link) return undefined
  return /^https?:\/\//i.test(link) ? link : `https://${link}`
}

// Persen saldo terhadap harga (dipakai modal "Saldo belum cukup")
export const getBalancePercent = (balance: number, price: number) =>
  price > 0 ? Math.min(100, Math.round((balance / price) * 100)) : 0

// Pembulatan ke Rp10 rb terdekat, sesuai contoh "sekitar Rp 80 rb"
export const getSavingPerDay = (shortfall: number, days: number) =>
  days > 0 ? Math.round(shortfall / days / 10000) * 10000 : 0