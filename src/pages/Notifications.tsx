import { ChevronLeft } from 'lucide-react'
import { NotificationItem } from '../features/notifications/components/NotificationItem'
import { useNotificationsPage } from '../features/notifications/hooks/useNotificationsPage'
import { formatToday } from '../utils/format'

const Notifications = () => {
  const { tabs, sections, unread, setActive, markAllAsRead, goBack } =
    useNotificationsPage()

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500">{formatToday()}</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Kembali"
              onClick={goBack}
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
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            aria-pressed={tab.isActive}
            onClick={() => setActive(tab.label)}
            className={`cursor-pointer rounded-full px-4 py-2 text-xs font-medium ring-1 ${
              tab.isActive
                ? 'bg-[#0B3B24] text-white ring-[#0B3B24]'
                : 'bg-white text-gray-700 ring-gray-200'
            }`}
          >
            {tab.text}
          </button>
        ))}
      </div>

      {sections.map((section) => (
        <section key={section.label}>
          <h2 className="mb-2 text-[11px] font-semibold uppercase text-gray-500">
            {section.label}
          </h2>
          <div className="flex flex-col gap-1 rounded-2xl bg-white p-2 shadow-sm">
            {section.items.map((item) => (
              <NotificationItem key={item.id} item={item} removable />
            ))}
          </div>
        </section>
      ))}

      {sections.length === 0 && (
        <p className="py-10 text-center text-sm text-gray-500">Tidak ada notifikasi</p>
      )}
    </div>
  )
}

export default Notifications