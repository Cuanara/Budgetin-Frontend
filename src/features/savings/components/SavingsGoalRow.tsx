import { Check } from 'lucide-react'
import type { SavingsGoal } from '../../../types/savings'
import { formatRupiah } from '../../../utils/format'
import { getGoalPercent, isGoalReached } from '../../../utils/savings'
import { SAVINGS_ICONS } from '../savingsIcons'

interface Props {
  goal: SavingsGoal
  onDeposit: (goalId: string) => void
}

const SavingsGoalRow = ({ goal, onDeposit }: Props) => {
  const percent = getGoalPercent(goal)
  const reached = isGoalReached(goal)

  return (
    <li className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] items-center gap-4 border-b border-gray-100 py-4 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-[#0B3B24]">
          {SAVINGS_ICONS[goal.icon]}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-900">{goal.name}</p>
          <p className="text-xs text-gray-500">
            {formatRupiah(goal.saved)} dari {formatRupiah(goal.target)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 flex-1 rounded-full bg-gray-100"
        >
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="w-10 text-right text-xs text-gray-700">{percent}%</span>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ${
            reached
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          {reached && <Check size={12} />}
          {reached ? 'Tercapai' : 'Berjalan'}
        </span>
        <button
          type="button"
          // Lihat (target tercapai): TODO halaman detail target
          onClick={reached ? undefined : () => onDeposit(goal.id)}
          className="w-20 rounded-full border border-gray-200 bg-white py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
        >
          {reached ? 'Lihat' : 'Setor'}
        </button>
      </div>
    </li>
  )
}

export default SavingsGoalRow
