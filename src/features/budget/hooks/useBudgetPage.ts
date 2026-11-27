import { useCallback, useState } from 'react'
import { ApiError } from '../../../services/apiClient'
import type { AddCategoryInput, BudgetCategory } from '../../../types/budget'
import { useBudget } from './useBudget'

const getErrorMessage = (err: unknown, fallback: string) => {
  if (err instanceof ApiError) {
    return Object.values(err.fieldErrors ?? {})[0]?.[0] ?? err.message
  }
  return fallback
}

export const useBudgetPage = () => {
  const {
    income,
    categories,
    loading,
    error,
    refetch,
    addCategory,
    removeCategory,
  } = useBudget()

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] =
    useState<BudgetCategory | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const closeToast = useCallback(() => {
    setToastMessage(null)
  }, [])

  const handleAddCategory = useCallback(
    async (input: AddCategoryInput): Promise<boolean> => {
      try {
        await addCategory(input)
        setToastMessage(`Kategori ${input.name.trim()} ditambahkan`)
        return true
      } catch (err) {
        setToastMessage(getErrorMessage(err, 'Gagal menambah kategori'))
        return false
      }
    },
    [addCategory],
  )

  const handleDeleteCategory = useCallback(
    async (category: BudgetCategory) => {
      if (categories.length <= 1) return
      try {
        await removeCategory(category.id)
        setToastMessage(`Kategori ${category.name} dihapus`)
      } catch (err) {
        setToastMessage(getErrorMessage(err, 'Gagal menghapus kategori'))
      }
    },
    [categories.length, removeCategory],
  )

  return {
    income,
    categories,
    loading,
    error,
    refetch,
    isAddOpen,
    setIsAddOpen,
    categoryToDelete,
    setCategoryToDelete,
    toastMessage,
    closeToast,
    handleAddCategory,
    handleDeleteCategory,
  }
}
