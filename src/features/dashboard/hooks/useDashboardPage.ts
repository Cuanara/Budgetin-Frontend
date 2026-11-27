import { useCallback } from 'react'
import { useBudgetStore } from '../../../stores/useBudgetStore'
import { YEARLY_EXPENSE_MOCK } from '../mocks'

export const useDashboardPage = () => {
  const summary = useBudgetStore((s) => s.summary)
  const transactions = useBudgetStore((s) => s.transactions)
  const isTransactionModalOpen = useBudgetStore((s) => s.isTransactionModalOpen)
  const toastMessage = useBudgetStore((s) => s.toastMessage)
  const setTransactionModalOpen = useBudgetStore((s) => s.setTransactionModalOpen)
  const clearToast = useBudgetStore((s) => s.clearToast)

  const openTransactionModal = useCallback(() => {
    setTransactionModalOpen(true)
  }, [setTransactionModalOpen])

  const closeTransactionModal = useCallback(() => {
    setTransactionModalOpen(false)
  }, [setTransactionModalOpen])

  return {
    summary,
    transactions,
    yearlyReports: YEARLY_EXPENSE_MOCK,
    isTransactionModalOpen,
    toastMessage,
    openTransactionModal,
    closeTransactionModal,
    clearToast,
  }
}
