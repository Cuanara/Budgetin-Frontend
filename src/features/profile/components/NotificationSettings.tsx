import React from 'react';
import type { NotificationSettingsState } from '../../../types/profile';

interface NotificationSettingsProps {
  notifications: NotificationSettingsState;
  onToggle: (key: keyof NotificationSettingsState) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  notifications,
  onToggle,
}) => {
  const items: Array<{
    key: keyof NotificationSettingsState;
    title: string;
    description: string;
  }> = [
    {
      key: 'delayEnded',
      title: 'Masa tunda berakhir',
      description: 'Tanya jadi dibeli atau tidak',
    },
    {
      key: 'dayBeforeReminder',
      title: 'Pengingat sehari sebelumnya',
      description: 'Satu pengingat sebelum masa tunda habis',
    },
    {
      key: 'balanceSufficient',
      title: 'Saldo sudah cukup',
      description: 'Kabari saat saldo mencukupi',
    },
    {
      key: 'transactionSuccess',
      title: 'Transaksi berhasil',
      description: 'Notifikasi setelah menyimpan transaksi',
    },
  ];

  return (
    <div className="bg-[#0C2B1E] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#16432F]">
      <h3 className="text-sm font-bold text-white mb-4">
        Notifikasi
      </h3>

      <div className="space-y-4">
        {items.map((item) => {
          const isEnabled = notifications[item.key];
          return (
            <div
              key={item.key}
              className="flex items-center justify-between gap-4 py-2 border-b border-[#143D2A] last:border-0"
            >
              <div>
                <p className="text-xs font-bold text-white">{item.title}</p>
                <p className="text-[11px] text-[#8FAEA0] mt-0.5">{item.description}</p>
              </div>

              {/* Toggle switch button */}
              <button
                type="button"
                role="switch"
                aria-checked={isEnabled}
                onClick={() => onToggle(item.key)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  isEnabled ? 'bg-[#22C55E]' : 'bg-gray-400'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    isEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
