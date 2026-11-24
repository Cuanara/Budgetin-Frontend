import React from 'react';
import type { DashboardSummary } from '../../../types/dashboard';
import { DashboardService } from '../../../services/dashboard.service';

interface ExpenseBarChartProps {
  summary: DashboardSummary;
}

export const ExpenseBarChart: React.FC<ExpenseBarChartProps> = ({ summary }) => {
  const formattedExpense = DashboardService.formatRupiah(summary.monthlyExpense).replace('Rp.', 'Rp ');
  const yTicks = ['100%', '80%', '60%', '40%', '20%', '0%'];

  return (
    <div className="bg-[#0C2B1E] rounded-3xl p-6 shadow-xl border border-[#16432F] flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-[#8FAEA0]">Pengeluaran Bulan Ini</span>
          <span className="text-[11px] font-bold text-[#064E3B] bg-[#D1F5D9] px-3 py-1 rounded-full">
            {summary.monthlyBudgetPercentageDiff}% dari budget
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#22C55E] tracking-tight mb-6">
          {formattedExpense}
        </h3>
      </div>

      {/* Bar Chart Area */}
      <div className="relative pt-4 pb-2">
        {/* Y Axis Grid & Labels */}
        <div className="flex flex-col justify-between h-52 text-[10px] text-[#608674] font-medium pr-2">
          {yTicks.map((tick) => (
            <div key={tick} className="flex items-center gap-3">
              <span className="w-8 text-left">{tick}</span>
              <div className="flex-1 h-[1px] bg-[#143D2A]" />
            </div>
          ))}
        </div>

        {/* Bars Container */}
        <div className="absolute left-10 right-2 bottom-6 top-4 flex items-end justify-between px-3 sm:px-6">
          {summary.categories.map((cat) => (
            <div
              key={cat.category}
              className="flex flex-col items-center flex-1 max-w-[56px] h-full justify-end group cursor-pointer"
            >
              {/* Bar */}
              <div
                style={{ height: `${cat.percentage}%` }}
                className={`w-full max-w-[42px] rounded-t-lg transition-all duration-300 transform group-hover:opacity-90 ${
                  cat.isHighlight
                    ? 'bg-[#22C55E] shadow-lg shadow-[#22C55E]/20'
                    : 'bg-[#1A5A3B]'
                }`}
                title={`${cat.category}: ${cat.percentage}%`}
              />
            </div>
          ))}
        </div>

        {/* X Axis Labels */}
        <div className="flex justify-between pl-10 pr-2 pt-2 text-[10px] text-[#8FAEA0] font-medium">
          {summary.categories.map((cat) => (
            <div
              key={cat.category}
              className="flex-1 text-center truncate px-0.5"
              title={cat.category}
            >
              {cat.category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
