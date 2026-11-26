import { LogOut, User as UserIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../features/auth/hooks/useLogout'
import { useAuthStore } from '../../stores/authStore'
import { useProfilePhotoStore } from '../../stores/profilePhotoStore'
import { LogoutModal } from '../LogoutModal'

const SidebarUser = () => {
  const user = useAuthStore((s) => s.user)
  const photoUrl = useProfilePhotoStore((s) =>
    user ? (s.photos[user.email] ?? null) : null,
  )
  const navigate = useNavigate()
  const logout = useLogout()

  const [menuOpen, setMenuOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const name = user?.name ?? ''
  const email = user?.email ?? ''

  // tutup popup saat klik di luar atau tekan Esc
  useEffect(() => {
    if (!menuOpen) return

    const onMouseDown = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const goToProfile = () => {
    setMenuOpen(false)
    navigate('/profile')
  }

  const askLogout = () => {
    setMenuOpen(false)
    setLogoutOpen(true)
  }

  const confirmLogout = async () => {
    setLogoutOpen(false)
    await logout()
  }

  return (
    <>
      <div ref={wrapperRef} className="relative">
        {menuOpen && (
          <div
            role="menu"
            className="absolute bottom-full left-0 mb-2 w-full rounded-2xl bg-white p-2 shadow-lg ring-1 ring-black/5"
          >
            <button
              type="button"
              role="menuitem"
              onClick={goToProfile}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-gray-700 transition-colors hover:bg-emerald-50"
            >
              <UserIcon size={16} />
              Pengaturan Akun
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={askLogout}
              className="mt-1 flex w-full cursor-pointer items-center gap-3 rounded-xl bg-red-50 px-3 py-2.5 text-left text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              <LogOut size={16} />
              Keluar
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-emerald-50 p-3 text-left transition-colors hover:bg-emerald-100"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-100 font-medium uppercase text-[#0B3B24]">
            {photoUrl ? (
              <img src={photoUrl} alt="" className="size-full object-cover" />
            ) : (
              name.charAt(0)
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{name}</p>
            <p className="truncate text-xs text-gray-500">{email}</p>
          </div>
        </button>
      </div>

      <LogoutModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={confirmLogout}
      />
    </>
  )
}

export default SidebarUser