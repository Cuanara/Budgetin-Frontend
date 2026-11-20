import type { SavingsGoal } from '../../../types/savings'
import SavingsGoalRow from './SavingsGoalRow'

interface Props {
  goals: SavingsGoal[]
  activeCount: number
  onDeposit: (goalId: string) => void
}

const SavingsGoalList = ({ goals, activeCount, onDeposit }: Props) => (
  <section className="rounded-3xl bg-white p-6 shadow-sm">
    <div className="flex items-baseline justify-between">
      <h2 className="text-lg font-medium text-gray-900">Target tabungan</h2>
      <span className="text-xs text-gray-500">{activeCount} target aktif</span>
    </div>

    {goals.length === 0 ? (
      <p className="py-8 text-center text-sm text-gray-500">
        Belum ada target tabungan.
      </p>
    ) : (
      <ul className="mt-2">
        {goals.map((goal) => (
          <SavingsGoalRow key={goal.id} goal={goal} onDeposit={onDeposit} />
        ))}
      </ul>
    )}
  </section>
)

export default SavingsGoalList
