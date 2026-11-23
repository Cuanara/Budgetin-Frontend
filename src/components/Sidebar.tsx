import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LogoIcon,
  HomeIcon,
  WishlistIcon,
  BudgetIcon,
  SavingsIcon,
  HistoryIcon,
  SettingsIcon,
  LogoutIcon,
} from './icons';
import type { UserProfile } from '../types/profile';

interface SidebarProps {
  profile: UserProfile;
  onOpenLogoutModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  profile,
  onOpenLogoutModal,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeActive = location.pathname === '/';
  const isProfileActive = location.pathname === '/profile';

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <aside className="w-64 bg-[#082117] min-h-screen border-r border-[#133D29] flex flex-col justify-between p-6 select-none shadow-[2px_0_16px_rgba(0,0,0,0.3)] shrink-0">
      {/* Top Branding and Navigation */}
      <div className="space-y-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 px-2 group">
          <LogoIcon className="w-8 h-8 transform group-hover:scale-105 transition-transform" />
          <span className="text-2xl font-bold tracking-tight text-white">Budgetin</span>
        </Link>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {/* Beranda Link */}
          <Link
            to="/"
            className={`flex items-center gap-3.5 px-4 py-3 rounded-full text-sm font-semibold transition-all ${isHomeActive
              ? 'bg-[#13402C] text-white shadow-md shadow-black/20'
              : 'text-[#8EAFA0] hover:bg-[#0D2D20] hover:text-white'
              }`}
          >
            <HomeIcon className={`w-5 h-5 ${isHomeActive ? 'text-white' : 'text-[#8EAFA0]'}`} />
            <span>Beranda</span>
          </Link>

          {/* Wishlist Button */}
          <button
            type="button"
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm font-medium text-[#8EAFA0] hover:bg-[#0D2D20] hover:text-white transition-colors cursor-pointer"
          >
            <WishlistIcon className="w-5 h-5 text-[#8EAFA0]" />
            <span>Wishlist</span>
          </button>

          {/* Budget Button */}
          <button
            type="button"
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm font-medium text-[#8EAFA0] hover:bg-[#0D2D20] hover:text-white transition-colors cursor-pointer"
          >
            <BudgetIcon className="w-5 h-5 text-[#8EAFA0]" />
            <span>Budget</span>
          </button>

          {/* Tabungan Button */}
          <button
            type="button"
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm font-medium text-[#8EAFA0] hover:bg-[#0D2D20] hover:text-white transition-colors cursor-pointer"
          >
            <SavingsIcon className="w-5 h-5 text-[#8EAFA0]" />
            <span>Tabungan</span>
          </button>

          {/* Riwayat Transaksi Button */}
          <button
            type="button"
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm font-medium text-[#8EAFA0] hover:bg-[#0D2D20] hover:text-white transition-colors cursor-pointer"
          >
            <HistoryIcon className="w-5 h-5 text-[#8EAFA0]" />
            <span>Riwayat Transaksi</span>
          </button>
        </nav>
      </div>

      {/* Bottom User Area */}
      <div className="space-y-2 pt-6">
        {/* Pengaturan Akun Button */}
        <button
          type="button"
          onClick={handleProfileClick}
          className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm font-semibold transition-colors cursor-pointer ${isProfileActive
            ? 'bg-[#13402C] text-white shadow-md'
            : 'text-[#8EAFA0] hover:bg-[#0D2D20] hover:text-white'
            }`}
        >
          <SettingsIcon className={`w-5 h-5 ${isProfileActive ? 'text-white' : 'text-[#8EAFA0]'}`} />
          <span>Pengaturan Akun</span>
        </button>

        {/* Keluar Button */}
        <button
          type="button"
          onClick={onOpenLogoutModal}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-sm font-semibold text-[#EF4444] bg-[#2A1212] hover:bg-[#381616] border border-[#4E1E1E] transition-colors cursor-pointer"
        >
          <LogoutIcon className="w-5 h-5 text-[#EF4444]" />
          <span>Keluar</span>
        </button>

        {/* Profile Nadia Card */}
        <button
          type="button"
          onClick={handleProfileClick}
          className="w-full flex items-center gap-3.5 p-3 rounded-2xl bg-[#0C2B1E] hover:bg-[#113828] border border-[#16432F] shadow-sm transition-all text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#22C55E] flex items-center justify-center text-[#062015] font-extrabold text-base shadow-inner">
            {profile.avatarLetter}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate group-hover:text-[#4ADE80]">
              {profile.name}
            </p>
            <p className="text-xs text-[#8EAFA0] truncate">nadia@gmail.com</p>
          </div>
        </button>
      </div>
    </aside>
  );
};
