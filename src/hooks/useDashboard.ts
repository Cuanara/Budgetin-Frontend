import { useCallback } from 'react';
import { useBudgetStore } from '../stores/useBudgetStore';

export const useDashboard = () => {
  const profile = useBudgetStore((s) => s.profile);
  const summary = useBudgetStore((s) => s.summary);
  const transactions = useBudgetStore((s) => s.transactions);
  const isTransactionModalOpen = useBudgetStore((s) => s.isTransactionModalOpen);
  const isLogoutModalOpen = useBudgetStore((s) => s.isLogoutModalOpen);
  const isUserMenuOpen = useBudgetStore((s) => s.isUserMenuOpen);
  const toastMessage = useBudgetStore((s) => s.toastMessage);

  const setTransactionModalOpen = useBudgetStore((s) => s.setTransactionModalOpen);
  const setLogoutModalOpen = useBudgetStore((s) => s.setLogoutModalOpen);
  const setUserMenuOpen = useBudgetStore((s) => s.setUserMenuOpen);
  const showToast = useBudgetStore((s) => s.showToast);
  const clearToast = useBudgetStore((s) => s.clearToast);

  const openTransactionModal = useCallback(() => {
    setTransactionModalOpen(true);
  }, [setTransactionModalOpen]);

  const closeTransactionModal = useCallback(() => {
    setTransactionModalOpen(false);
  }, [setTransactionModalOpen]);

  const openLogoutModal = useCallback(() => {
    setUserMenuOpen(false);
    setLogoutModalOpen(true);
  }, [setUserMenuOpen, setLogoutModalOpen]);

  const closeLogoutModal = useCallback(() => {
    setLogoutModalOpen(false);
  }, [setLogoutModalOpen]);

  const toggleUserMenu = useCallback(() => {
    setUserMenuOpen(!isUserMenuOpen);
  }, [setUserMenuOpen, isUserMenuOpen]);

  const closeUserMenu = useCallback(() => {
    setUserMenuOpen(false);
  }, [setUserMenuOpen]);

  const handleLogoutConfirm = useCallback(() => {
    setLogoutModalOpen(false);
    showToast('Berhasil keluar dari akun.');
  }, [setLogoutModalOpen, showToast]);

  return {
    profile,
    summary,
    transactions,
    isTransactionModalOpen,
    isLogoutModalOpen,
    isUserMenuOpen,
    toastMessage,
    openTransactionModal,
    closeTransactionModal,
    openLogoutModal,
    closeLogoutModal,
    toggleUserMenu,
    closeUserMenu,
    handleLogoutConfirm,
    clearToast,
  };
};
