import React, { useEffect } from 'react';
import { LogoutIcon } from './icons';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  // tutup dengan tombol Esc
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm transform rounded-3xl bg-white p-6 text-center shadow-2xl animate-in zoom-in-95 duration-200 sm:p-8"
      >
        {/* Ikon merah di lingkaran merah muda */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <LogoutIcon className="h-6 w-6 text-red-600" />
        </div>

        <h3 id="logout-title" className="mb-1.5 text-lg font-bold text-gray-900">
          Keluar dari akun?
        </h3>
        <p className="mb-6 text-xs leading-relaxed text-gray-500">
          Kamu perlu masuk lagi untuk membuka Budgetin.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-full bg-white px-4 py-2.5 text-xs font-bold text-gray-900 shadow-md ring-1 ring-gray-100 transition-colors hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 cursor-pointer rounded-full bg-[#B91C1C] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#991B1B]"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};