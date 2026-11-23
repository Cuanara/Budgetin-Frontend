import type { DashboardSummary } from '../types/dashboard';

export const DashboardService = {
  getInitialSummary(): DashboardSummary {
    return {
      currentBalance: 1650000,
      dailyEstimatedExpense: 55000,
      daysRemaining: 15,
      currentSavings: 10650000,
      savingsTargetRemaining: 10000000,
      monthlyExpense: 650000,
      monthlyBudgetPercentageDiff: -4.81,
      monthlyBudgetLimit: 4000000,
      monthlyBudgetSpent: 2350000,
      monthlyBudgetPercent: 50,
      categories: [
        { category: 'Transportasi', percentage: 40, isHighlight: false },
        { category: 'Tempat Tinggal', percentage: 70, isHighlight: false },
        { category: 'Makan', percentage: 60, isHighlight: true },
        { category: 'Jajan', percentage: 70, isHighlight: false },
        { category: 'Lainnya', percentage: 35, isHighlight: false },
      ],
    };
  },

  formatRupiah(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(value)
      .replace('IDR', 'Rp.')
      .trim();
  },
};
