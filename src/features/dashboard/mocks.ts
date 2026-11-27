import type { MonthlyExpense, YearlyExpenseReport } from '../../types/dashboard'

// MOCK: nanti data dari BE. Jumlah pengeluaran per bulan (Rp), Jan sampai Des.
const AMOUNTS_2026 = [
  560_000, 640_000, 720_000, 680_000, 900_000, 800_000, 900_000, 700_000,
  800_000, 1_250_000, 700_000, 0,
]
const AMOUNTS_2025 = [
  500_000, 520_000, 600_000, 580_000, 640_000, 700_000, 720_000, 680_000,
  760_000, 800_000, 900_000, 1_100_000,
]

// Rincian tooltip: 35% Makan, 20% Transportasi, 20% Tempat Tinggal
const toMonths = (amounts: number[]): MonthlyExpense[] =>
  amounts.map((amount, index) => ({
    month: index + 1,
    amount,
    categories:
      amount === 0
        ? []
        : [
            { category: 'Makan', amount: Math.round(amount * 0.35) },
            { category: 'Transportasi', amount: Math.round(amount * 0.2) },
            { category: 'Tempat Tinggal', amount: Math.round(amount * 0.2) },
          ],
  }))

export const YEARLY_EXPENSE_MOCK: YearlyExpenseReport[] = [
  { year: 2026, budgetLimit: 24_000_000, months: toMonths(AMOUNTS_2026) },
  { year: 2025, budgetLimit: 24_000_000, months: toMonths(AMOUNTS_2025) },
]
