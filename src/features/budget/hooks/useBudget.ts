import { useCallback, useEffect, useState } from 'react'
import { ApiError } from '../../../services/apiClient'
import { budgetService } from '../../../services/budget.service'
import type {
  AddCategoryInput,
  BudgetResponse,
  BudgetState,
} from '../../../types/budget'
import { mapBudgetToState } from '../../../utils/budget'

const EMPTY_STATE: BudgetState = { income: 0, categories: [] }

interface Period {
  month: number
  year: number
}

export const useBudget = () => {
  const [state, setState] = useState<BudgetState>(EMPTY_STATE)
  const [period, setPeriod] = useState<Period | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const apply = useCallback((budget: BudgetResponse) => {
    setState(mapBudgetToState(budget))
    setPeriod({ month: budget.month, year: budget.year })
  }, [])

  const load = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true)
      setError(null)
      try {
        apply(await budgetService.getBudget(signal))
        setLoading(false)
      } catch (err) {
        // request dibatalkan (unmount / StrictMode): jangan ubah state apa pun
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError(err instanceof ApiError ? err.message : 'Gagal memuat budget')
        setLoading(false)
      }
    },
    [apply],
  )

  useEffect(() => {
    const controller = new AbortController()
    void load(controller.signal)
    return () => controller.abort()
  }, [load])

  // muat ulang diam-diam setelah tambah/hapus (tanpa layar "Memuat...")
  const refresh = useCallback(async () => {
    try {
      apply(await budgetService.getBudget())
    } catch {
      /* data lama tetap tampil */
    }
  }, [apply])

  const currentPeriod = useCallback((): Period => {
    const now = new Date()
    return {
      month: period?.month ?? now.getMonth() + 1,
      year: period?.year ?? now.getFullYear(),
    }
  }, [period])

  const addCategory = useCallback(
    async (input: AddCategoryInput) => {
      await budgetService.addAllocation({
        ...currentPeriod(),
        name: input.name.trim(),
        percentage: input.percent,
        ...(input.takeFromId ? { source_allocation_id: input.takeFromId } : {}),
      })
      await refresh()
    },
    [currentPeriod, refresh],
  )

  const removeCategory = useCallback(
    async (id: string) => {
      await budgetService.deleteAllocation(id)
      await refresh()
    },
    [refresh],
  )

  // hitung ulang nominal alokasi dari pemasukan (belum dipakai di layar)
  const recalculate = useCallback(async () => {
    await budgetService.processRollover(currentPeriod())
    await refresh()
  }, [currentPeriod, refresh])

  return {
    income: state.income,
    categories: state.categories,
    loading,
    error,
    refetch: () => load(),
    addCategory,
    removeCategory,
    recalculate,
  }
}