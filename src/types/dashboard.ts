export interface CategoryExpense {
  category: string;
  percentage: number;
  isHighlight?: boolean;
}

export interface DashboardSummary {
  currentBalance: number;
  dailyEstimatedExpense: number;
  daysRemaining: number;
  currentSavings: number;
  savingsTargetRemaining: number;
  monthlyExpense: number;
  monthlyBudgetPercentageDiff: number;
  monthlyBudgetLimit: number;
  monthlyBudgetSpent: number;
  monthlyBudgetPercent: number;
  categories: CategoryExpense[];
}

export interface MonthlyCategoryAmount {
  category: string
  amount: number
}

export interface MonthlyExpense {
  month: number // 1-12
  amount: number
  categories: MonthlyCategoryAmount[] // kategori terbesar, untuk tooltip
}

export interface YearlyExpenseReport {
  year: number
  budgetLimit: number // total budget setahun (Rp)
  months: MonthlyExpense[] // selalu 12 bulan
}
