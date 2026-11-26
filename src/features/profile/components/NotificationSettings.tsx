import type { NotificationSettingsState } from '../../../types/profile'

interface NotificationSettingsProps {
  notifications: NotificationSettingsState
  onToggle: (key: keyof NotificationSettingsState) => void
}

const ITEMS: {
  key: keyof NotificationSettingsState
  title: string
  description: string
}[] = [
  {
    key: 'delayEnded',
    title: 'Masa tunda berakhir',
    description: 'Tanya jadi dibeli atau tidak',
  },
  {
    key: 'dayBeforeReminder',
    title: 'Pengingat sehari sebelumnya',
    description: 'Satu pengingat sebelum masa tunda habis',
  },
  {
    key: 'balanceSufficient',
    title: 'Saldo sudah cukup',
    description: 'Kabari saat saldo mencukupi',
  },
  {
    key: 'transactionSuccess',
    title: 'Transaksi berhasil',
    description: 'Notifikasi setelah menyimpan transaksi',
  },
]

export const NotificationSettings = ({
  notifications,
  onToggle,
}: NotificationSettingsProps) => (
  <section className="rounded-3xl bg-white p-6 shadow-sm">
    <h2 className="mb-2 text-base font-medium">Notifikasi</h2>

    <ul>
      {ITEMS.map((item) => {
        const enabled = notifications[item.key]
        return (
          <li
            key={item.key}
            className="flex items-center justify-between gap-4 border-t border-gray-100 py-3"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium">{item.title}</p>
              <p className="mt-0.5 text-[11px] text-gray-600">
                {item.description}
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={enabled}
              aria-label={item.title}
              onClick={() => onToggle(item.key)}
              className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
                enabled ? 'bg-[#0B3B24]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform ${
                  enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </li>
        )
      })}
    </ul>
  </section>
)