import { create } from 'zustand';
import type { Transaction, CreateTransactionDto } from '../types/transaction';
import type { UserProfile, NotificationSettingsState } from '../types/profile';
import type { DashboardSummary } from '../types/dashboard';

interface BudgetState {
  profile: UserProfile;
  notifications: NotificationSettingsState;
  summary: DashboardSummary;
  transactions: Transaction[];
  isTransactionModalOpen: boolean;
  isLogoutModalOpen: boolean;
  isUserMenuOpen: boolean;
  toastMessage: string | null;

  // Actions
  setTransactionModalOpen: (open: boolean) => void;
  setLogoutModalOpen: (open: boolean) => void;
  setUserMenuOpen: (open: boolean) => void;
  showToast: (message: string) => void;
  clearToast: () => void;
  addTransaction: (dto: CreateTransactionDto) => void;
  removeTransaction: (id: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  toggleNotification: (key: keyof NotificationSettingsState) => void;
}

export const useBudgetStore = create<BudgetState>((set) => ({
  profile: {
    name: 'Nadia',
    email: 'nadia@email.com',
    joinedDate: '12 Nov 2026',
    avatarLetter: 'N',
  },
  notifications: {
    delayEnded: true,
    dayBeforeReminder: true,
    balanceSufficient: true,
    transactionSuccess: false,
  },
  summary: {
    currentBalance: 1650000,
    dailyEstimatedExpense: 55000,
    daysRemaining: 15,
    currentSavings: 10650000,
    savingsTargetRemaining: 10000000,
    monthlyExpense: 650000,
    monthlyBudgetPercentageDiff: 4.5,
    monthlyBudgetLimit: 4000000,
    monthlyBudgetSpent: 2350000,
    monthlyBudgetPercent: 50,
    categories: [
      { category: 'Transportasi', percentage: 35, isHighlight: false },
      { category: 'Tempat Tinggal', percentage: 70, isHighlight: false },
      { category: 'Makan', percentage: 58, isHighlight: true },
      { category: 'Jajan', percentage: 70, isHighlight: false },
      { category: 'Lainnya', percentage: 18, isHighlight: false },
    ],
  },
  transactions: [
    {
      id: 'tx-1',
      type: 'expense',
      amount: 45000,
      title: 'Makan siang',
      category: 'Makan',
      source: 'Budget Bulanan',
      date: '2026-11-12',
      notes: 'Makan siang',
      icon: 'M',
      createdAt: '2026-11-12T12:41:00',
    },
    {
      id: 'tx-2',
      type: 'income',
      amount: 100000,
      title: 'Bonus Januari',
      category: 'Pemasukan',
      source: 'Tabungan',
      subCategory: 'Dana Darurat',
      date: '2026-11-11',
      notes: 'Bonus insentif',
      icon: '+',
      createdAt: '2026-11-11T09:15:00',
    },
    {
      id: 'tx-3',
      type: 'expense',
      amount: 15000,
      title: 'Beli Boba',
      category: 'Jajan',
      source: 'Budget Bulanan',
      date: '2026-11-10',
      notes: 'Boba drink',
      icon: 'J',
      createdAt: '2026-11-10T16:20:00',
    },
  ],
  isTransactionModalOpen: false,
  isLogoutModalOpen: false,
  isUserMenuOpen: false,
  toastMessage: null,

  setTransactionModalOpen: (open) => set({ isTransactionModalOpen: open }),
  setLogoutModalOpen: (open) => set({ isLogoutModalOpen: open }),
  setUserMenuOpen: (open) => set({ isUserMenuOpen: open }),
  showToast: (message) => set({ toastMessage: message }),
  clearToast: () => set({ toastMessage: null }),

  addTransaction: (dto) =>
    set((state) => {
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        ...dto,
        icon: dto.type === 'income' ? '+' : dto.category.charAt(0).toUpperCase(),
        createdAt: new Date().toISOString(),
      };

      const isExpense = dto.type === 'expense';
      const updatedBalance = isExpense
        ? state.summary.currentBalance - dto.amount
        : state.summary.currentBalance + dto.amount;
      const updatedMonthlyExpense = isExpense
        ? state.summary.monthlyExpense + dto.amount
        : state.summary.monthlyExpense;
      const updatedSpent = isExpense
        ? state.summary.monthlyBudgetSpent + dto.amount
        : state.summary.monthlyBudgetSpent;
      const updatedPercent = Math.min(
        100,
        Math.round((updatedSpent / state.summary.monthlyBudgetLimit) * 100)
      );

      return {
        transactions: [newTx, ...state.transactions],
        summary: {
          ...state.summary,
          currentBalance: updatedBalance,
          monthlyExpense: updatedMonthlyExpense,
          monthlyBudgetSpent: updatedSpent,
          monthlyBudgetPercent: updatedPercent,
        },
        toastMessage: 'Transaksi berhasil disimpan!',
      };
    }),

  // hapus transaksi dan kembalikan pengaruhnya ke ringkasan
  removeTransaction: (id) =>
    set((state) => {
      const tx = state.transactions.find((t) => t.id === id);
      if (!tx) return state;

      const expense = tx.type === 'expense' ? tx.amount : 0;
      const income = tx.type === 'income' ? tx.amount : 0;
      const spent = Math.max(0, state.summary.monthlyBudgetSpent - expense);

      return {
        transactions: state.transactions.filter((t) => t.id !== id),
        summary: {
          ...state.summary,
          currentBalance: state.summary.currentBalance + expense - income,
          monthlyExpense: Math.max(0, state.summary.monthlyExpense - expense),
          monthlyBudgetSpent: spent,
          monthlyBudgetPercent: Math.min(
            100,
            Math.round((spent / state.summary.monthlyBudgetLimit) * 100)
          ),
        },
        toastMessage: 'Transaksi berhasil dihapus!',
      };
    }),

  updateProfile: (updated) =>
    set((state) => ({
      profile: { ...state.profile, ...updated },
      toastMessage: 'Profil berhasil diperbarui!',
    })),

  toggleNotification: (key) =>
    set((state) => ({
      notifications: {
        ...state.notifications,
        [key]: !state.notifications[key],
      },
    })),
}));