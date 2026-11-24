import { create } from 'zustand'

interface BalanceState {
  balance: number
  setBalance: (balance: number) => void
}

// MOCK: nanti saldo dari BE
export const useBalanceStore = create<BalanceState>((set) => ({
  balance: 2350000,
  setBalance: (balance) => set({ balance }),
}))