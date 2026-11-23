import React from 'react';
import type { DashboardSummary } from '../../../types/dashboard';
import { DashboardService } from '../../../services/dashboard.service';

interface SummaryCardsProps {
  summary: DashboardSummary;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const formattedBalance = DashboardService.formatRupiah(summary.currentBalance);
  const formattedDaily = DashboardService.formatRupiah(summary.dailyEstimatedExpense);
  const formattedSavings = DashboardService.formatRupiah(summary.currentSavings);
  const formattedTargetRemaining = DashboardService.formatRupiah(summary.savingsTargetRemaining);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
      {/* Saldo Saat Ini Card */}
      <div className="bg-[#0C2B1E] rounded-3xl p-6 shadow-xl border border-[#16432F] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#8FAEA0]">Saldo saat ini</span>
          <span className="text-[11px] font-bold text-[#F87171] bg-[#381616] px-3 py-1 rounded-full border border-[#4E1E1E]">
            -{summary.daysRemaining} hari
          </span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {formattedBalance}
          </h2>
          <p className="text-xs text-[#8FAEA0]">
            Dengan perkiraan pengeluaran harian :{' '}
            <span className="font-semibold text-[#C1DFD1]">{formattedDaily}</span>
          </p>
        </div>
      </div>

      {/* Tabungan Saat Ini Card */}
      <div className="bg-[#0C2B1E] rounded-3xl p-6 shadow-xl border border-[#16432F] flex flex-col justify-between">
        <div className="mb-3">
          <span className="text-xs font-semibold text-[#8FAEA0]">Tabungan saat ini</span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {formattedSavings}
          </h2>
          <p className="text-xs text-[#8FAEA0] leading-relaxed">
            Anda masih harus menabung {formattedTargetRemaining} lagi untuk mendapatkan semua wishlist anda
          </p>
        </div>
      </div>
    </section>
  );
};
