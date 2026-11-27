
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import {
  HomeIcon,
  WishlistIcon,
  BudgetIcon,
  SavingsIcon,
  HistoryIcon,
  SettingsIcon,
  LogoutIcon,
} from './icons'
import type { UserProfile } from '../types/profile'

interface SidebarProps {
  profile: UserProfile & {
    photoUrl?: string | null
  }
  isOpen: boolean
  onClose: () => void
  onOpenLogoutModal: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  profile,
  isOpen,
  onClose,
  onOpenLogoutModal,
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)

  const isHomeActive = location.pathname === '/dashboard'
  const isWishlistActive = location.pathname.startsWith('/wishlist')
  const isBudgetActive = location.pathname.startsWith('/budget')
  const isSavingsActive = location.pathname.startsWith('/savings')
  const isTransactionsActive = location.pathname.startsWith('/transactions')
  const isProfileActive = location.pathname === '/profile'

  const menuItemClass = (active: boolean) =>
    `flex w-full items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
      active
        ? 'bg-[#185C3B] text-white font-semibold shadow-sm'
        : 'text-[#26382D] font-medium hover:bg-[#EEF5F0] hover:text-[#185C3B]'
    }`

  const handleProfileClick = () => {
    setIsAccountMenuOpen((previous) => !previous)
  }

  const handleProfileSettings = () => {
    setIsAccountMenuOpen(false)
    onClose()
    navigate('/profile')
  }

  const handleLogout = () => {
    setIsAccountMenuOpen(false)
    onClose()
    onOpenLogoutModal()
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          role="presentation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col justify-between border-r border-[#E5EDE7] bg-white p-5 shadow-[2px_0_12px_rgba(0,0,0,0.05)] select-none transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Branding and Navigation */}
        <div className="space-y-7">

          {/* Logo Budgetin Asli */}
          <div className="flex items-center justify-between">
            <Link
              to="/dashboard"
              onClick={onClose}
              className="flex items-center px-2"
            >
              <img
                src="/images/logo-dark.png"
                alt="Budgetin"
                className="h-auto w-[150px] object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-[#647568] hover:bg-[#EEF5F0] hover:text-[#185C3B] md:hidden"
              aria-label="Tutup Menu"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[#738078]">
              MENU
            </p>

            <Link
              to="/dashboard"
              onClick={onClose}
              className={menuItemClass(isHomeActive)}
            >
              <HomeIcon className="w-5 h-5" />
              <span>Beranda</span>
            </Link>

            <Link
              to="/wishlist"
              onClick={onClose}
              className={menuItemClass(isWishlistActive)}
            >
              <WishlistIcon className="w-5 h-5" />
              <span>Wishlist</span>
            </Link>

            <Link
              to="/budget"
              onClick={onClose}
              className={menuItemClass(isBudgetActive)}
            >
              <BudgetIcon className="w-5 h-5" />
              <span>Budget</span>
            </Link>

            <Link
              to="/savings"
              onClick={onClose}
              className={menuItemClass(isSavingsActive)}
            >
              <SavingsIcon className="w-5 h-5" />
              <span>Tabungan</span>
            </Link>

            <Link
              to="/transactions"
              onClick={onClose}
              className={menuItemClass(isTransactionsActive)}
            >
              <HistoryIcon className="w-5 h-5" />
              <span>Riwayat Transaksi</span>
            </Link>
          </nav>
        </div>

        {/* Bottom User Area */}
        <div className="space-y-2 pt-6">

          {/* Pengaturan Akun dan Keluar */}
          {isAccountMenuOpen && (
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={handleProfileSettings}
                className={`flex w-full items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  isProfileActive
                    ? 'bg-[#E7F2EA] text-[#185C3B]'
                    : 'text-[#26382D] hover:bg-[#EEF5F0]'
                }`}
              >
                <SettingsIcon className="w-5 h-5" />
                <span>Pengaturan Akun</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3.5 rounded-xl bg-[#FFF0EF] px-4 py-2.5 text-sm font-semibold text-[#E54848] transition-colors hover:bg-[#FFE5E3]"
              >
                <LogoutIcon className="w-5 h-5" />
                <span>Keluar</span>
              </button>
            </div>
          )}

          {/* User Profile */}
          <button
            type="button"
            onClick={handleProfileClick}
            aria-expanded={isAccountMenuOpen}
            className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${
              isAccountMenuOpen
                ? 'border-[#CDE4D4] bg-[#F0F7F2]'
                : 'border-[#E5EDE7] bg-[#F4F8F5] hover:bg-[#EAF3ED]'
            }`}
          >
            {/* Profile Photo */}
            {profile?.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt="Foto profil"
                className="h-10 w-10 shrink-0 rounded-full border border-[#D1EBDD] object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D1EBDD] text-sm font-bold text-[#185C3B]">
                {profile?.avatarLetter ||
                  profile?.name?.trim().charAt(0).toUpperCase() ||
                  'N'}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#26382D]">
                {profile?.name || 'Pengguna'}
              </p>

              <p className="truncate text-xs text-[#829087]">
                {profile?.email || ''}
              </p>
            </div>
          </button>
        </div>
      </aside>
    </>
  )
}
