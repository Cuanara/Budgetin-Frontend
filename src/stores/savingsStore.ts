import { create } from 'zustand'
import {
  SAVINGS_DEPOSITS_MOCK,
  SAVINGS_GOALS_MOCK,
  SAVINGS_MONTHLY_GAIN_MOCK,
} from '../features/savings/mocks'
import type {
  SavingsDeposit,
  SavingsDepositResult,
  SavingsGoal,
} from '../types/savings'

interface SavingsState {
  goals: SavingsGoal[]
  deposits: SavingsDeposit[]
  monthlyGain: number
  depositGoalId: string | null
  depositResult: SavingsDepositResult | null
  addGoal: (name: string, target: number) => void
  openDeposit: (goalId: string) => void
  closeDeposit: () => void
  deposit: (goalId: string, amount: number) => void
  showDepositSuccess: (result: SavingsDepositResult) => void
  closeDepositSuccess: () => void
}

// MOCK: nanti data dari BE
export const useSavingsStore = create<SavingsState>((set) => ({
  goals: SAVINGS_GOALS_MOCK,
  deposits: SAVINGS_DEPOSITS_MOCK,
  monthlyGain: SAVINGS_MONTHLY_GAIN_MOCK,
  depositGoalId: null,
  depositResult: null,
  // target 0 = tanpa target; setelah ditambah langsung buka modal setoran
  addGoal: (name, target) =>
    set((s) => {
      const id = crypto.randomUUID()
      return {
        goals: [...s.goals, { id, name, target, saved: 0, icon: 'gift' as const }],
        depositGoalId: id,
      }
    }),
  openDeposit: (goalId) => set({ depositGoalId: goalId }),
  closeDeposit: () => set({ depositGoalId: null }),
  deposit: (goalId, amount) =>
    set((s) => {
      const goal = s.goals.find((g) => g.id === goalId)
      if (!goal) return s

      const newDeposit: SavingsDeposit = {
        id: crypto.randomUUID(),
        goalName: goal.name,
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
        }),
        method: 'Transfer',
        amount,
      }

      return {
        depositGoalId: null,
        monthlyGain: s.monthlyGain + amount,
        goals: s.goals.map((g) =>
          g.id === goalId ? { ...g, saved: g.saved + amount } : g,
        ),
        deposits: [newDeposit, ...s.deposits].slice(0, 3),
      }
    }),
  showDepositSuccess: (result) => set({ depositResult: result }),
  closeDepositSuccess: () => set({ depositResult: null }),
}))