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
  const hasTarget = goal.target > 0

  return (
    <li className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        disabled={reached}
        title={reached ? undefined : 'Klik untuk setor'}
        onClick={() => onDeposit(goal.id)}
        className="grid w-full cursor-pointer grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_6rem] items-center gap-4 rounded-xl py-4 text-left enabled:hover:bg-gray-50 disabled:cursor-default"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-[#0B3B24]">
            {SAVINGS_ICONS[goal.icon]}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-gray-900">{goal.name}</span>
            <span className="block text-xs text-gray-500">
              {formatRupiah(goal.saved)}
              {hasTarget && ` dari ${formatRupiah(goal.target)}`}
            </span>
          </span>
        </span>

        {hasTarget && (
          <>
            <span className="flex items-center gap-3">
              <span className="block h-2 flex-1 rounded-full bg-gray-100">
                <span
                  className="block h-full rounded-full bg-emerald-500"
                  style={{ width: `${percent}%` }}
                />
              </span>
              <span className="w-10 text-right text-xs text-gray-700">{percent}%</span>
            </span>
            <span
              className={`inline-flex items-center gap-1 justify-self-end rounded-full px-2.5 py-1 text-xs ${
                reached ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              {reached && <Check size={12} />}
              {reached ? 'Tercapai' : 'Berjalan'}
            </span>
          </>
        )}
      </button>
    </li>
  )
}

export default SavingsGoalRow