
import Toast from '../components/ui/Toast'
import AddCategoryModal from '../features/budget/components/AddCategoryModal'
import AllocationChart from '../features/budget/components/AllocationChart'
import PageHeader from '../components/layout/PageHeader'
import CategoryGrid from '../features/budget/components/CategoryGrid'
import DeleteCategoryModal from '../features/budget/components/DeleteCategoryModal'
import IncomeCard from '../features/budget/components/IncomeCard'
import { useBudgetPage } from '../features/budget/hooks/useBudgetPage'

const Budget = () => {
  const {
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
  } = useBudgetPage()

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Budget" />

      <IncomeCard
        income={income}
        onAddCategory={() => setIsAddOpen(true)}
      />

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

      {toastMessage && (
        <Toast message={toastMessage} onClose={closeToast} />
      )}
    </div>
  )
}

export default Budget
