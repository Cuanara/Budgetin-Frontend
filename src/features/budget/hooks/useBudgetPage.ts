
import { useCallback, useState } from 'react'
import { useBudget } from './useBudget'
import type { AddCategoryInput, BudgetCategory } from '../../../types/budget'

export const useBudgetPage = () => {
  const { income, categories, addCategory, removeCategory } = useBudget()

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] =
    useState<BudgetCategory | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Toast
  const closeToast = useCallback(() => {
    setToastMessage(null)
  }, [])

  // Tambah kategori
  const handleAddCategory = useCallback(
    (input: AddCategoryInput) => {
      const saved = addCategory(input)

      if (saved) {
        setToastMessage(`Kategori ${input.name.trim()} ditambahkan`)
      }

      return saved
    },
    [addCategory],
  )

  // Hapus kategori
  const handleDeleteCategory = useCallback(
    (category: BudgetCategory) => {
      if (categories.length <= 1) return

      removeCategory(category.id)
      setToastMessage(`Kategori ${category.name} dihapus`)
    },
    [categories.length, removeCategory],
  )

  return {
    income,
    categories,
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
