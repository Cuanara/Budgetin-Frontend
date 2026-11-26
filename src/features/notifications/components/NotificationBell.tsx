import { useEffect, useRef, useState } from 'react'
import { Bell, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useNotificationStore } from '../../../stores/notificationStore'
import { NotificationItem } from './NotificationItem'

export const NotificationBell = () => {
  const items = useNotificationStore((s) => s.items)
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const unread = items.filter((n) => !n.read).length

  // tutup popup saat klik di luar atau tekan Esc
  useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Notifikasi"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative flex size-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm"
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[#0B3B24] text-[9px] text-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-4 top-20 z-40 rounded-3xl bg-white p-3 shadow-xl ring-1 ring-black/5 md:absolute md:inset-x-auto md:right-0 md:top-full md:mt-3 md:w-80">
          <div className="flex items-center justify-between px-2 py-2">
            <h2 className="text-base font-bold">Notifikasi</h2>
            <button
              type="button"
              onClick={markAllAsRead}
              className="cursor-pointer text-[11px] font-medium text-[#0B3B24]"
            >
              Tandai semua dibaca
            </button>
          </div>

          <div className="flex flex-col gap-1">
            {items.slice(0, 4).map((item) => (
              <NotificationItem key={item.id} item={item} />
            ))}
            {items.length === 0 && (
              <p className="py-6 text-center text-xs text-gray-500">Belum ada notifikasi</p>
            )}
          </div>

          <Link
            to="/notifikasi"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-1 border-t border-gray-100 pt-3 text-[11px] font-medium text-[#0B3B24]"
          >
            Lihat semua notifikasi <ChevronRight size={14} />
          </Link>
        </div>
      )}
    </div>
  )
}