import type { BudgetCategory } from '../../../types/budget'
import CategoryCard from './CategoryCard'

interface Props {
  categories: BudgetCategory[]
  income: number
  onDelete: (category: BudgetCategory) => void
}

// Dipasang langsung di dalam grid milik Budget.tsx (3 kolom di desktop).
// 1-2 kategori -> kartu memanjang (span 2 kolom), 3+ -> kartu kecil.
const getCardClass = (count: number) => (count <= 2 ? 'md:col-span-2' : '')

const CategoryGrid = ({ categories, income, onDelete }: Props) => {
  if (categories.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm md:col-span-2">
        Belum ada kategori. Klik &ldquo;+ Tambah kategori&rdquo; untuk mulai.
      </div>
    )
  }

  return (
    <>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          income={income}
          onDelete={onDelete}
          canDelete={categories.length > 1}
          className={getCardClass(categories.length)}
        />
      ))}
    </>
  )
}

export default CategoryGrid