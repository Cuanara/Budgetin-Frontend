import type { CreateTransactionDto, Transaction } from '../types/transaction';

const STORAGE_KEY = 'budgetin_transactions';

export const TransactionService = {
  async getTransactions(): Promise<Transaction[]> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as Transaction[];
      }
    } catch {
      // Fallback for environments without localStorage
    }
    return [];
  },

  async createTransaction(payload: CreateTransactionDto): Promise<Transaction> {
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}`,
      ...payload,
      icon: payload.type === 'income' ? '+' : payload.category.charAt(0).toUpperCase(),
    };

    try {
      const existing = await this.getTransactions();
      const updated = [newTransaction, ...existing];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors in mock mode
    }

    return newTransaction;
  },

  calculateDailyAverage(totalSpent: number, days: number): number {
    const validDays = days > 0 ? days : 1;
    return Math.round(totalSpent / validDays);
  },
};
