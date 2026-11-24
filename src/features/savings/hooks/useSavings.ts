import { useBalanceStore } from '../../../stores/balanceStore'
import { useSavingsStore } from '../../../stores/savingsStore'
import { isGoalReached } from '../../../utils/savings'

export const useSavings = () => {
  const goals = useSavingsStore((s) => s.goals)
  const deposits = useSavingsStore((s) => s.deposits)
  const monthlyGain = useSavingsStore((s) => s.monthlyGain)
  const openDeposit = useSavingsStore((s) => s.openDeposit)
  const walletBalance = useBalanceStore((s) => s.balance)

  const total = goals.reduce((sum, goal) => sum + goal.saved, 0)
  const reachedCount = goals.filter(isGoalReached).length
  const reachedPercent =
    goals.length > 0 ? Math.round((reachedCount / goals.length) * 100) : 0

  return {
    goals,
    deposits,
    total,
    monthlyGain,
    walletBalance,
    reachedCount,
    reachedPercent,
    activeCount: goals.length - reachedCount,
    openDeposit,
  }
}
