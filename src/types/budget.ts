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