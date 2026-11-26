import { ChevronDown, Heart } from 'lucide-react'
import type { SavingsGoal } from '../../../types/savings'
import SavingsGoalRow from './SavingsGoalRow'

interface Props {
  goals: SavingsGoal[]
  activeCount: number
  onDeposit: (goalId: string) => void
  onOpenWishlist: () => void
}

const SavingsGoalList = ({ goals, activeCount, onDeposit, onOpenWishlist }: Props) => {
  const [first, ...rest] = goals

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-medium text-gray-900">Target tabungan</h2>
        <span className="text-xs text-gray-500">{activeCount} target aktif</span>
      </div>

      <ul className="mt-2">
        {first && <SavingsGoalRow goal={first} onDeposit={onDeposit} />}
        <li className="border-b border-gray-100 last:border-b-0">
          <button
            type="button"
            onClick={onOpenWishlist}
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl py-4 text-left hover:bg-gray-50"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-[#0B3B24]">
              <Heart size={18} />
            </span>
            <span className="flex-1 text-sm font-medium text-gray-900">Wishlist</span>
            <ChevronDown size={20} className="mr-4" />
          </button>
        </li>
        {rest.map((goal) => (
          <SavingsGoalRow key={goal.id} goal={goal} onDeposit={onDeposit} />
        ))}
      </ul>
    </section>
  )
}

export default SavingsGoalList