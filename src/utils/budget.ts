import { CATEGORY_COLORS } from '../constants/budget'
import type {
  AddCategoryInput,
  BudgetCategory,
  BudgetResponse,
  BudgetState,
  TakeFromOption,
} from '../types/budget'

/** 3000000 -> "Rp 3 jt", 180000 -> "Rp 180 rb" */
export const formatRupiahShort = (value: number): string => {
  if (value >= 1_000_000) {
    const million = value / 1_000_000
    const text = Number.isInteger(million)
      ? String(million)
      : million.toFixed(1).replace('.', ',')
    return `Rp ${text} jt`
  }
  if (value >= 1_000) return `Rp ${Math.round(value / 1_000)} rb`
  return `Rp ${value}`
}

/** Ambil angka saja dari input: "Rp 3.000.000" -> 3000000 */
export const parseDigits = (raw: string): number => {
  const digits = raw.replace(/\D/g, '')
  return digits ? Number(digits) : 0
}

export const amountFromPercent = (income: number, percent: number) =>
  Math.round((income * percent) / 100)

export const getTotalPercent = (categories: BudgetCategory[]) =>
  categories.reduce((sum, c) => sum + c.percent, 0)

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `cat-${Date.now()}-${Math.random().toString(16).slice(2)}`

const pickColor = (categories: BudgetCategory[]): string => {
  const used = new Set(categories.map((c) => c.color))
  return (
    CATEGORY_COLORS.find((color) => !used.has(color)) ??
    CATEGORY_COLORS[categories.length % CATEGORY_COLORS.length]
  )
}

/** Daftar kategori yang bisa dikurangi jatahnya untuk kategori baru. */
export const buildTakeFromOptions = (
  categories: BudgetCategory[],
  percent: number,
  income: number,
): TakeFromOption[] =>
  categories.map((c) => {
    const nextPercent = Math.max(0, c.percent - percent)
    return {
      id: c.id,
      name: c.name,
      currentPercent: c.percent,
      nextPercent,
      remainingAmount: amountFromPercent(income, nextPercent),
      isEnabled: c.percent >= percent,
    }
  })

/** Tambah kategori baru, jatahnya diambil dari kategori lain. Total tetap sama. */
export const addCategory = (
  categories: BudgetCategory[],
  input: AddCategoryInput,
): BudgetCategory[] | null => {
  const donor = categories.find((c) => c.id === input.takeFromId)
  if (!donor || input.percent <= 0 || donor.percent < input.percent) return null

  const reduced = categories.map((c) =>
    c.id === donor.id ? { ...c, percent: c.percent - input.percent } : c,
  )

  return [
    ...reduced,
    {
      id: createId(),
      name: input.name.trim(),
      percent: input.percent,
      spent: 0,
      color: pickColor(categories),
    },
  ]
}

/** Hapus kategori, jatahnya dipindah ke "Lainnya" (atau kategori pertama) agar total tetap 100%. */
export const removeCategory = (
  categories: BudgetCategory[],
  id: string,
): BudgetCategory[] => {
  if (categories.length <= 1) return categories // kategori terakhir tidak boleh dihapus

  const target = categories.find((c) => c.id === id)
  if (!target) return categories

  const rest = categories.filter((c) => c.id !== id)
  if (rest.length === 0) return rest

  const receiver =
    rest.find((c) => c.name.toLowerCase().startsWith('lainnya')) ?? rest[0]

  return rest.map((c) =>
    c.id === receiver.id ? { ...c, percent: c.percent + target.percent } : c,
  )
}
/** Ubah response API menjadi model yang dipakai UI. */
export const mapBudgetToState = (budget: BudgetResponse): BudgetState => ({
  income: budget.total_income,
  categories: budget.allocations.map((a, index) => ({
    id: a.id,
    name: a.name ?? 'Tanpa nama',
    percent: a.percentage,
    spent: a.spent_amount,
    color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
  })),
})

/** Sisa jatah yang belum dialokasikan (0-100). */
export const getAvailablePercent = (categories: BudgetCategory[]): number =>
  Math.max(0, Math.round((100 - getTotalPercent(categories)) * 100) / 100)
