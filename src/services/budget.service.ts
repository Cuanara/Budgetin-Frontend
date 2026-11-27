import { API_PATHS } from '../constants/api'
import type { BudgetResponse, CreateAllocationPayload } from '../types/budget'
import { apiClient } from './apiClient'

export const budgetService = {
  async getBudget(signal?: AbortSignal): Promise<BudgetResponse> {
    const res = await apiClient<BudgetResponse>(API_PATHS.budgets, { signal })
    return res.data
  },

  async addAllocation(payload: CreateAllocationPayload): Promise<void> {
    await apiClient<unknown>(API_PATHS.budgetAllocations, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  async deleteAllocation(id: string): Promise<void> {
    await apiClient<unknown>(`${API_PATHS.budgetAllocations}/${id}`, {
      method: 'DELETE',
    })
  },

  // Hitung ulang nominal tiap alokasi dari pemasukan saat ini.
  // Response tidak dipakai; data dimuat ulang lewat getBudget.
  async processRollover(payload: { month: number; year: number }): Promise<void> {
    await apiClient<unknown>(API_PATHS.budgetRollover, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}