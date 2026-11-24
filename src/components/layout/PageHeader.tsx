import { Bell } from 'lucide-react'
import { formatToday } from '../../utils/format'
import { useAuthStore } from '../../stores/authStore'

interface Props {
  title: string
}

const NotificationButton = () => (
  <button
    type="button"
    aria-label="Notifikasi"
    className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
  >
    <Bell size={18} />
  </button>
)

const PageHeader = ({ title }: Props) => {
  const name = useAuthStore((s) => s.user?.name ?? '')

  return (
    <header>
      {/* Mobile saja: logo, notifikasi, dan avatar */}
      <div className="mb-4 flex items-center justify-between md:hidden">
        <img src="/images/logo-dark.png" alt="Budgetin" className="h-14 w-auto" />
        <div className="flex items-center gap-3">
          <NotificationButton />
          <div
            aria-label="Profil"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B3B24] font-medium uppercase text-white"
          >
            {name.charAt(0)}
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500">{formatToday()}</p>
          <h1 className="text-3xl font-semibold text-[#0B3B24]">{title}</h1>
        </div>
        {/* Desktop saja: bell tetap di kanan seperti sebelumnya */}
        <div className="hidden md:block">
          <NotificationButton />
        </div>
      </div>
    </header>
  )
}

export default PageHeader