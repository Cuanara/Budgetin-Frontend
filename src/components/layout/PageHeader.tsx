import { NotificationBell } from '../../features/notifications/components/NotificationBell'
import { useAuthStore } from '../../stores/authStore'
import { useProfilePhotoStore } from '../../stores/profilePhotoStore'
import { formatToday } from '../../utils/format'

interface Props {
  title: string
}

const PageHeader = ({ title }: Props) => {
  const user = useAuthStore((s) => s.user)
  const photoUrl = useProfilePhotoStore((s) =>
    user ? (s.photos[user.email] ?? null) : null,
  )
  const name = user?.name ?? ''

  return (
    <header>
      {/* Mobile saja: logo, notifikasi, dan avatar */}
      <div className="mb-4 flex items-center justify-between md:hidden">
        <img src="/images/logo-dark.png" alt="Budgetin" className="h-14 w-auto" />
        <div className="flex items-center gap-3">
          <NotificationBell />
          <div
            aria-label="Profil"
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#0B3B24] font-medium uppercase text-white"
          >
            {photoUrl ? (
              <img src={photoUrl} alt="" className="size-full object-cover" />
            ) : (
              name.charAt(0)
            )}
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
          <NotificationBell />
        </div>
      </div>
    </header>
  )
}

export default PageHeader