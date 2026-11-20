import type { BudgetState } from '../types/budget'

export const BUDGET_STORAGE_KEY = 'budgetin:budget:v2'
export const MAX_INCOME = 1_000_000_000_000
export const MAX_CATEGORY_NAME_LENGTH = 24
export const QUICK_PERCENTS = [5, 10, 15, 30] as const

export const CATEGORY_COLORS = [
  '#12b76a',
  '#0b0f0d',
  '#7fd8ac',
  '#c9efdc',
  '#e4f3ec',
  '#0f766e',
  '#5eead4',
  '#a7f3d0',
] as const

export const DEFAULT_BUDGET_STATE: BudgetState = {
  income: 3_000_000,
  categories: [
    { id: 'makan', name: 'Makan', percent: 50, spent: 0, color: CATEGORY_COLORS[0] },
    { id: 'transportasi', name: 'Transportasi', percent: 30, spent: 0, color: CATEGORY_COLORS[1] },
    { id: 'jajan', name: 'Jajan', percent: 20, spent: 0, color: CATEGORY_COLORS[2] },
  ],
}