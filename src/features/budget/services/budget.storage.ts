import { BUDGET_STORAGE_KEY, DEFAULT_BUDGET_STATE } from '../../../constants/budget'
import type { BudgetState } from '../../../types/budget'

const isBudgetState = (value: unknown): value is BudgetState => {
  if (typeof value !== 'object' || value === null) return false
  const v = value as BudgetState
    return (
    typeof v.income === 'number' &&
    Array.isArray(v.categories) &&
    v.categories.length > 0 &&
    v.categories.every(
      (c) =>
        typeof c.id === 'string' &&
        typeof c.name === 'string' &&
        typeof c.percent === 'number' &&
        typeof c.spent === 'number' &&
        typeof c.color === 'string',
    )
  )
}

export const budgetStorage = {
  load(): BudgetState {
    try {
      const raw = localStorage.getItem(BUDGET_STORAGE_KEY)
      if (!raw) return DEFAULT_BUDGET_STATE
      const parsed: unknown = JSON.parse(raw)
      return isBudgetState(parsed) ? parsed : DEFAULT_BUDGET_STATE
    } catch {
      return DEFAULT_BUDGET_STATE
    }
  },

  save(state: BudgetState): void {
    try {
      localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage penuh / diblokir: abaikan */
    }
  },
}