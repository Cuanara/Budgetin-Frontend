import React from 'react';
import type { Transaction } from '../../../types/transaction';
import { DashboardService } from '../../../services/dashboard.service';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onOpenAllTransactions?: () => void;
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  onOpenAllTransactions,
}) => {
  // Show first 3 transactions
  const displayItems = transactions.slice(0, 3);

  return (
    <div className="pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-bold text-white">Transaksi terbaru</h4>
        <button
          type="button"
          onClick={onOpenAllTransactions}
          className="text-[11px] font-semibold text-[#8FAEA0] hover:text-white transition-colors cursor-pointer"
        >
          Lihat semua
        </button>
      </div>

      {/* List */}
      <div className="space-y-3.5">
        {displayItems.map((tx) => {
          const isIncome = tx.type === 'income';
          const sign = isIncome ? '+' : '-';
          const formatted = DashboardService.formatRupiah(tx.amount).replace('Rp.', 'Rp ');

          return (
            <div
              key={tx.id}
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-[#103726] transition-colors"
            >
              {/* Left Info with Icon */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D1FAE5] flex items-center justify-center text-[#065F46] font-extrabold text-xs shadow-xs">
                  {tx.icon || (isIncome ? '+' : tx.category.charAt(0).toUpperCase())}
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">
                    {tx.title}
                  </p>
                  <p className="text-[10px] text-[#8FAEA0] mt-0.5">{tx.category}</p>
                </div>
              </div>

              {/* Right Amount */}
              <div className="text-right">
                <span
                  className={`text-xs font-extrabold ${
                    isIncome ? 'text-[#22C55E]' : 'text-[#EF4444]'
                  }`}
                >
                  {sign}
                  {formatted}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
