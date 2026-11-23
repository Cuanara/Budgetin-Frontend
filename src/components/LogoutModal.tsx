import React from 'react';
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#0C2B1E] rounded-3xl max-w-sm w-full p-6 sm:p-8 text-center shadow-2xl border border-[#1B4A34] transform animate-in zoom-in-95 duration-200">
        {/* Red Icon in Bright Red Circle */}
        <div className="w-14 h-14 rounded-full bg-[#DC2626] flex items-center justify-center mx-auto mb-4 text-white shadow-md">
          <LogoutIcon className="w-6 h-6 text-white" />
        </div>

        {/* Title & Description */}
        <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
          Keluar dari akun?
        </h3>
        <p className="text-xs text-[#8FAEA0] mb-6 leading-relaxed">
          Kamu perlu masuk lagi untuk membuka Budgetin.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-full bg-white hover:bg-gray-100 text-xs font-bold text-[#0F2F21] transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-full bg-[#C02626] hover:bg-[#991B1B] text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};
