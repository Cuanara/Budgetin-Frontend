import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { NotificationItem } from '../features/notifications/components/NotificationItem'
import {
  useNotificationStore,
  type AppNotification,
} from '../stores/notificationStore'

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

const Notifications = () => {
  const navigate = useNavigate()
  const items = useNotificationStore((s) => s.items)
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead)
  const [active, setActive] = useState('Semua')

  const unread = items.filter((n) => !n.read).length
  const filtered = items.filter(filters.find((f) => f.label === active)!.match)
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500">{today}</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Kembali"
              onClick={() => navigate(-1)}
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <h1 className="text-3xl font-bold text-[#0B3B24]">Notifikasi</h1>
          </div>
        </div>
        <button
          type="button"
          onClick={markAllAsRead}
          disabled={unread === 0}
          className="cursor-pointer rounded-xl bg-[#0B3B24] px-4 py-2.5 text-xs font-medium text-white disabled:cursor-default disabled:opacity-50"
        >
          Tandai semua dibaca
        </button>
      </header>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.label}
            type="button"
            aria-pressed={active === f.label}
            onClick={() => setActive(f.label)}
            className={`cursor-pointer rounded-full px-4 py-2 text-xs font-medium ring-1 ${
              active === f.label
                ? 'bg-[#0B3B24] text-white ring-[#0B3B24]'
                : 'bg-white text-gray-700 ring-gray-200'
            }`}
          >
            {f.label}
            {f.label === 'Belum dibaca' && ` (${unread})`}
          </button>
        ))}
      </div>

      {groups.map((group) => {
        const list = filtered.filter((n) => n.daysAgo >= group.min && n.daysAgo <= group.max)
        if (list.length === 0) return null
        return (
          <section key={group.label}>
            <h2 className="mb-2 text-[11px] font-semibold uppercase text-gray-500">
              {group.label}
            </h2>
            <div className="flex flex-col gap-1 rounded-2xl bg-white p-2 shadow-sm">
              {list.map((item) => (
                <NotificationItem key={item.id} item={item} removable />
              ))}
            </div>
          </section>
        )
      })}

      {filtered.length === 0 && (
        <p className="py-10 text-center text-sm text-gray-500">Tidak ada notifikasi</p>
      )}
    </div>
  )
}

export default Notifications