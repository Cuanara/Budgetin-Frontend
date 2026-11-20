import { useCallback, useEffect, useState } from 'react'
import type { AddCategoryInput, BudgetState } from '../../../types/budget'
import {
  addCategory as addCategoryToList,
  removeCategory as removeCategoryFromList,
} from '../../../utils/budget'
import { budgetStorage } from '../services/budget.storage'

export const useBudget = () => {
  const [state, setState] = useState<BudgetState>(() => budgetStorage.load())

  useEffect(() => {
    budgetStorage.save(state)
  }, [state])

  const setIncome = useCallback((income: number) => {
    setState((prev) => ({ ...prev, income }))
  }, [])

  const addCategory = useCallback(
    (input: AddCategoryInput): boolean => {
      const next = addCategoryToList(state.categories, input)
      if (!next) return false
      setState({ ...state, categories: next })
      return true
    },
    [state],
  )

  const removeCategory = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      categories: removeCategoryFromList(prev.categories, id),
    }))
  }, [])

  return {
    income: state.income,
    categories: state.categories,
    setIncome,
    addCategory,
    removeCategory,
  }
}