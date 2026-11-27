export interface BudgetCategory {
  id: string
  name: string
  percent: number // jatah dari pemasukan, 0-100
  spent: number // nominal terpakai (Rp)
  color: string // warna donut + legend
}

export interface BudgetState {
  income: number
  categories: BudgetCategory[]
}

export interface AddCategoryInput {
  name: string
  percent: number
  takeFromId: string
}

export interface TakeFromOption {
  id: string
  name: string
  currentPercent: number
  nextPercent: number
  remainingAmount: number
  isEnabled: boolean
}

export interface AddCategoryFormValues {
  name: string
  percent: string
  takeFromId: string
}

export type AddCategoryFormErrors = Partial<
  Record<keyof AddCategoryFormValues, string>
>
// ===== Response API (GET /api/budgets) =====
export interface BudgetAllocationResponse {
  id: string
  category_id: string | null
  name: string | null
  percentage: number
  allocated_amount: number
  spent_amount: number
  remaining_amount: number
  percentage_used: number
}

export interface BudgetResponse {
  id: string
  month: number
  year: number
  total_income: number
  total_allocated_percentage: number
  available_percentage: number
  total_allocated_amount: number
  total_spent_amount: number
  allocations: BudgetAllocationResponse[]
}

export interface CreateAllocationPayload {
  month: number
  year: number
  name: string
  percentage: number
  source_allocation_id?: string
}
