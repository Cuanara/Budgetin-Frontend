import { useCallback, useState } from 'react'
import Toast from '../components/ui/Toast'
import AddCategoryModal from '../features/budget/components/AddCategoryModal'
import AllocationChart from '../features/budget/components/AllocationChart'
import BudgetHeader from '../features/budget/components/BudgetHeader'
import CategoryGrid from '../features/budget/components/CategoryGrid'
import DeleteCategoryModal from '../features/budget/components/DeleteCategoryModal'
import IncomeCard from '../features/budget/components/IncomeCard'
import { useBudget } from '../features/budget/hooks/useBudget'
import type { AddCategoryInput, BudgetCategory } from '../types/budget'

const Budget = () => {
  const { income, categories, addCategory, removeCategory } = useBudget()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] =
    useState<BudgetCategory | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // harus stabil, karena Toast mereset timer kalau onClose berubah
  const closeToast = useCallback(() => setToastMessage(null), [])

  const handleAddCategory = (input: AddCategoryInput) => {
    const saved = addCategory(input)
    if (saved) setToastMessage(`Kategori ${input.name.trim()} ditambahkan`)
    return saved
  }

const handleDeleteCategory = (category: BudgetCategory) => {
    if (categories.length <= 1) return
    removeCategory(category.id)
    setToastMessage(`Kategori ${category.name} dihapus`)
  }

  return (
    <div className="flex flex-col gap-6">
      <BudgetHeader />

      <IncomeCard income={income} onAddCategory={() => setIsAddOpen(true)} />

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(2,minmax(9.25rem,auto))] lg:auto-rows-[minmax(9.25rem,auto)]">
        <AllocationChart
          income={income}
          categories={categories}
          className="md:col-span-2 lg:col-span-1 lg:row-span-2"
        />
        <CategoryGrid
          categories={categories}
          income={income}
          onDelete={setCategoryToDelete}
        />
    </div>

      {isAddOpen && (
        <AddCategoryModal
          categories={categories}
          income={income}
          onSubmit={handleAddCategory}
          onClose={() => setIsAddOpen(false)}
        />
      )}

      {categoryToDelete && (
        <DeleteCategoryModal
          category={categoryToDelete}
          onConfirm={() => handleDeleteCategory(categoryToDelete)}
          onClose={() => setCategoryToDelete(null)}
        />
      )}

      {toastMessage && <Toast message={toastMessage} onClose={closeToast} />}
    </div>
  )
}

export default Budget