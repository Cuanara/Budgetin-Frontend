import React from 'react';
import type { DashboardSummary } from '../../../types/dashboard';
import { DashboardService } from '../../../services/dashboard.service';

interface ExpenseGaugeCardProps {
  summary: DashboardSummary;
}

export const ExpenseGaugeCard: React.FC<ExpenseGaugeCardProps> = ({ summary }) => {
  const formattedSpent = DashboardService.formatRupiah(summary.monthlyBudgetSpent).replace('Rp.', 'Rp ');
  const formattedLimit = DashboardService.formatRupiah(summary.monthlyBudgetLimit);

  // Circular gauge calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (summary.monthlyBudgetPercent / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center pb-6 border-b border-[#143D2A]">
      <span className="text-xs font-semibold text-[#8FAEA0] self-start mb-4">
        Presentase pengeluaran bulan ini
      </span>

      {/* Circular Progress Gauge */}
      <div className="relative w-32 h-32 flex items-center justify-center my-1">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#CADED2"
            strokeWidth="11"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#22C55E"
            strokeWidth="11"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-extrabold text-[#22C55E]">
            {summary.monthlyBudgetPercent}%
          </span>
        </div>
      </div>

      {/* Amount and Subtitle */}
      <div className="mt-3">
        <h4 className="text-xl sm:text-2xl font-extrabold text-[#22C55E] tracking-tight">
          {formattedSpent}
        </h4>
        <p className="text-xs text-[#8FAEA0] mt-0.5">
          Terpakai dari {formattedLimit}
        </p>
      </div>
    </div>
  );
};
