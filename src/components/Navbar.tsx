import React from 'react';
import { PlusIcon, BellIcon, HomeIcon, SettingsIcon } from './icons';

interface NavbarProps {
  title: string;
  dateText?: string;
  showAddButton?: boolean;
  onOpenAddModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
  dateText = 'Kamis, 12 November 2026',
  showAddButton = true,
  onOpenAddModal,
}) => {
  const isDashboard = title.toLowerCase().includes('dashboard') || title.toLowerCase().includes('beranda');

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <p className="text-xs font-medium text-[#7FA392] mb-1">{dateText}</p>
        <div className="flex items-center gap-2.5">
          {isDashboard ? (
            <HomeIcon className="w-6 h-6 text-[#22C55E]" />
          ) : (
            <SettingsIcon className="w-6 h-6 text-[#22C55E]" />
          )}
          <h1 className="text-2xl font-bold tracking-tight text-[#22C55E]">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {showAddButton && (
          <button
            type="button"
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-[#062015] text-xs font-bold shadow-md transition-all transform active:scale-95 cursor-pointer"
          >
            <PlusIcon className="w-4 h-4 text-[#062015]" />
            <span>Tambah transaksi</span>
          </button>
        )}

        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifikasi"
          className="relative w-10 h-10 rounded-full bg-[#0C2B1E] border border-[#16432F] hover:bg-[#123A2A] flex items-center justify-center text-[#A7D4BC] transition-colors cursor-pointer shadow-xs"
        >
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-[#0C2B1E]" />
        </button>
      </div>
    </header>
  );
};
