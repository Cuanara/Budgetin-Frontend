import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useNotificationStore,
  type AppNotification,
} from '../../../stores/notificationStore'

const filters: { label: string; match: (n: AppNotification) => boolean }[] = [
  { label: 'Semua', match: () => true },
  { label: 'Belum dibaca', match: (n) => !n.read },
  { label: 'Masa Tunda', match: (n) => n.type.startsWith('delay') },
  { label: 'Saldo', match: (n) => n.type === 'balance' },
  { label: 'Transaksi', match: (n) => n.type === 'transaction' },
]

const groups = [
  { label: 'Hari ini', min: 0, max: 0 },
  { label: 'Kemarin', min: 1, max: 1 },
  { label: 'Minggu ini', min: 2, max: 6 },
  { label: 'Minggu lalu', min: 7, max: 13 },
  { label: 'Lebih lama', min: 14, max: Infinity },
]

export const useNotificationsPage = () => {
  const navigate = useNavigate()
  const items = useNotificationStore((s) => s.items)
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead)
  const [active, setActive] = useState('Semua')

  const unread = items.filter((n) => !n.read).length
  const activeFilter = filters.find((f) => f.label === active) ?? filters[0]
  const filtered = items.filter(activeFilter.match)

  const sections = groups
    .map((g) => ({
      label: g.label,
      items: filtered.filter((n) => n.daysAgo >= g.min && n.daysAgo <= g.max),
    }))
    .filter((section) => section.items.length > 0)

  const tabs = filters.map(({ label }) => ({
    label,
    text: label === 'Belum dibaca' ? `${label} (${unread})` : label,
    isActive: label === active,
  }))

  return {
    tabs,
    sections,
    unread,
    setActive,
    markAllAsRead,
    goBack: () => navigate(-1),
  }
}