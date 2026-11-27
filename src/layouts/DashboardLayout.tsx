
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Sidebar } from '../components/Sidebar'
import ExpiredWishlistGate from '../features/wishlist/components/ExpiredWishlistGate'
import { useProfile } from '../hooks/useProfile'
import type { UserProfile } from '../types/profile'

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const profile = useProfile()

  const handleOpenLogoutModal = () => {
    // Logika modal keluar / logout
  }

  // Menyiapkan data profil untuk Sidebar
  const defaultProfile: UserProfile & { photoUrl: string | null } = {
    name: profile.name || 'Pengguna',
    email: profile.email || '',
    joinedDate: profile.joinedDate || '',
    avatarLetter:
      profile.name?.trim().charAt(0).toUpperCase() || 'N',
    photoUrl: profile.photoUrl,
  }

  return (
    <div className="flex min-h-screen bg-[linear-gradient(to_bottom_left,#d1fae5,#ecfdf5_40%,#ffffff)]">

      {/* Sidebar Responsive */}
      <Sidebar
        profile={defaultProfile}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenLogoutModal={handleOpenLogoutModal}
      />

      <div className="flex min-w-0 flex-1 flex-col">

        {/* Mobile Header */}
        <header className="flex items-center justify-between px-4 pt-6 pb-2 md:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0B3B24] shadow-sm transition hover:bg-gray-50 focus:outline-none"
            aria-label="Buka Menu"
          >
            <Menu className="size-5" />
          </button>

          <span className="text-sm font-bold text-[#0B3B24]">
            Budgetin
          </span>

          <div className="w-10" />
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 pt-4 pb-8 md:p-8 md:pt-8">
          <Outlet />
        </main>
      </div>

      {/* Wishlist Expiration Gate */}
      <ExpiredWishlistGate />
    </div>
  )
}

export default DashboardLayout
