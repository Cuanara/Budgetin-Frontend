import { ArrowUpDown, Bell, CircleCheck, Clock, TriangleAlert, X } from 'lucide-react'
import {
  useNotificationStore,
  type AppNotification,
} from '../../../stores/notificationStore'

const icons = {
  delayEnd: Clock,
  delayReminder: Bell,
  delayStart: Bell,
  balance: CircleCheck,
  transaction: ArrowUpDown,
  budget: TriangleAlert,
}

interface Props {
  item: AppNotification
  removable?: boolean
}

export const NotificationItem = ({ item, removable }: Props) => {
  const markAsRead = useNotificationStore((s) => s.markAsRead)
  const remove = useNotificationStore((s) => s.remove)
  const Icon = icons[item.type]
  const isWarning = item.type === 'delayEnd' || item.type === 'budget'
  const timeLabel =
    item.daysAgo === 0
      ? item.time
      : item.daysAgo === 1
        ? 'Kemarin'
        : `${item.daysAgo} hari lalu`

  return (
    <div className={`flex items-start gap-2 rounded-xl p-3 ${item.read ? '' : 'bg-[#F3F8F4]'}`}>
      <button
        type="button"
        onClick={() => markAsRead(item.id)}
        className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left"
      >
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
            isWarning ? 'bg-amber-100 text-amber-600' : 'bg-emerald-50 text-[#0B3B24]'
          }`}
        >
          <Icon size={16} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-2">
            <span className="text-xs font-semibold text-gray-900">{item.title}</span>
            <span className="flex shrink-0 items-center gap-2 text-[10px] text-gray-500">
              {timeLabel}
              {!item.read && <span className="size-1.5 rounded-full bg-[#0B3B24]" />}
            </span>
          </span>
          <span className="mt-1 block text-[11px] leading-relaxed text-gray-500">
            {item.message}
          </span>
        </span>
      </button>

      {removable && (
        <button
          type="button"
          aria-label={`Hapus notifikasi ${item.title}`}
          onClick={() => remove(item.id)}
          className="cursor-pointer text-gray-500 hover:text-gray-900"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}