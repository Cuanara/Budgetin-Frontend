import type { SavingsDeposit, SavingsGoal } from '../../types/savings'

export const SAVINGS_GOALS_MOCK: SavingsGoal[] = [
  { id: '1', name: 'Dana Darurat', saved: 6000000, target: 10000000, icon: 'shield' },
  { id: '2', name: 'Liburan Bali', saved: 1800000, target: 4000000, icon: 'plane' },
  { id: '3', name: 'Dana Pendidikan', saved: 650000, target: 5000000, icon: 'graduation' },
  { id: '4', name: 'Hadiah Ulang Tahun', saved: 2000000, target: 2000000, icon: 'gift' },
]

export const SAVINGS_DEPOSITS_MOCK: SavingsDeposit[] = [
  { id: 'd1', goalName: 'Dana Darurat', date: '10 Nov', method: 'Transfer', amount: 500000 },
  { id: 'd2', goalName: 'Liburan Bali', date: '5 Nov', method: 'Tunai', amount: 300000 },
  { id: 'd3', goalName: 'Dana Pendidikan', date: '1 Nov', method: 'Transfer', amount: 150000 },
]

// MOCK: nanti dari BE
export const SAVINGS_TOTAL_MOCK = 10450000
export const SAVINGS_MONTHLY_GAIN_MOCK = 950000
export const WALLET_BALANCE_MOCK = 2350000
