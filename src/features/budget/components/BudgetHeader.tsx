import { Bell } from 'lucide-react'
import { formatToday } from '../../../utils/format'

const BudgetHeader = () => (
  <header className="flex items-start justify-between">
    <div>
      <p className="text-sm text-gray-500">{formatToday()}</p>
      <h1 className="text-3xl font-semibold text-[#0F1F17]">Budget</h1>
    </div>
    <button
      type="button"
      aria-label="Notifikasi"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm hover:bg-gray-50"
    >
      <Bell className="size-5" />
    </button>
  </header>
)

export default BudgetHeader