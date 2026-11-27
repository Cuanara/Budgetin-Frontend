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
    setPeriod({
      month: budget.month,
      year: budget.year,
    })
  }, [])

  // Fetching untuk pertama kali.
  // State diperbarui setelah request API selesai.
  useEffect(() => {
    const controller = new AbortController()
    let active = true

    const fetchInitialBudget = async () => {
      try {
        const budget = await budgetService.getBudget(controller.signal)

        if (!active) return

        apply(budget)
        setError(null)
        setLoading(false)
      } catch (err) {
        if (!active) return

        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }

        setError(
          err instanceof ApiError ? err.message : 'Gagal memuat budget',
        )
        setLoading(false)
      }
    }

    void fetchInitialBudget()

    return () => {
      active = false
      controller.abort()
    }
  }, [apply])

  // Refetch manual.
  const load = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true)
      setError(null)

      try {
        const budget = await budgetService.getBudget(signal)
        apply(budget)
        setLoading(false)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }

        setError(
          err instanceof ApiError ? err.message : 'Gagal memuat budget',
        )
        setLoading(false)
      }
    },
    [apply],
  )

  const refetch = useCallback(() => {
    void load()
  }, [load])

  // Muat ulang diam-diam setelah tambah/hapus.
  const refresh = useCallback(async () => {
    try {
      const budget = await budgetService.getBudget()
      apply(budget)
    } catch {
      // Data lama tetap ditampilkan jika refresh gagal.
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
        ...(input.takeFromId
          ? { source_allocation_id: input.takeFromId }
          : {}),
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

  // Menghitung ulang nominal alokasi dari pemasukan.
  const recalculate = useCallback(async () => {
    await budgetService.processRollover(currentPeriod())
    await refresh()
  }, [currentPeriod, refresh])

  return {
    income: state.income,
    categories: state.categories,
    loading,
    error,
    refetch,
    addCategory,
    removeCategory,
    recalculate,
  }
}
