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
