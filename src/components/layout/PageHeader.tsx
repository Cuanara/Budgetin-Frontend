import { User as UserIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '../../constants/navigation'
import { NotificationBell } from '../../features/notifications/components/NotificationBell'
import { useAuthStore } from '../../stores/authStore'
import { useProfilePhotoStore } from '../../stores/profilePhotoStore'
import { formatToday } from '../../utils/format'

interface Props {
  title: string
  action?: ReactNode // tombol aksi di kanan judul (mis. "+ Tambah transaksi")
}

const PageHeader = ({ title, action }: Props) => {
  const { pathname } = useLocation()
  const user = useAuthStore((s) => s.user)
  const photoUrl = useProfilePhotoStore((s) =>
    user ? (s.photos[user.email] ?? null) : null,
  )
  const name = user?.name ?? ''

  // sub-halaman (mis. /wishlist/archive) ikut ikon menu induknya
  const navItem = NAV_ITEMS.find(
    ({ path }) => pathname === path || pathname.startsWith(`${path}/`),
  )
  // Profile tidak ada di menu sidebar, jadi pakai ikon user
  const Icon = navItem?.icon ?? (pathname === '/profile' ? UserIcon : null)

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

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500">{formatToday()}</p>
          <h1 className="flex items-center gap-2.5 text-3xl font-semibold text-[#0B3B24]">
            {Icon && <Icon size={28} aria-hidden="true" className="shrink-0" />}
            {title}
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {action}
          {/* Desktop saja: bell tetap di kanan seperti sebelumnya */}
          <div className="hidden md:block">
            <NotificationBell />
          </div>
        </div>
      </div>
    </header>
  )
}

export default PageHeader
