import type { SavingsGoal } from '../types/savings'

export const calcPercent = (saved: number, target: number) =>
  target > 0 ? Math.min(100, Math.round((saved / target) * 100)) : 0

export const getGoalPercent = (goal: SavingsGoal) =>
  calcPercent(goal.saved, goal.target)

export const isGoalReached = (goal: SavingsGoal) =>
  goal.target > 0 && goal.saved >= goal.target
