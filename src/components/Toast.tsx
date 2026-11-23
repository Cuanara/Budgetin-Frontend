import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClear }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClear();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#0C2B1E] border border-[#22C55E]/40 text-white rounded-2xl shadow-2xl text-xs font-semibold animate-in slide-in-from-bottom-3 fade-in duration-200">
      <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
      <span>{message}</span>
    </div>
  );
};
