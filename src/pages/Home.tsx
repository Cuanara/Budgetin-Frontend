
import { Plus } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import Toast from '../components/ui/Toast'
import MonthlyGaugeCard from '../features/dashboard/components/MonthlyGaugeCard'
import RecentTransactions from '../features/dashboard/components/RecentTransactions'
import SummaryCards from '../features/dashboard/components/SummaryCards'
import YearlyExpenseChart from '../features/dashboard/components/YearlyExpenseChart'
import { useDashboardPage } from '../features/dashboard/hooks/useDashboardPage'
import { TransactionModal } from '../features/transactions/components/TransactionModal'

const Home = () => {
  const {
    summary,
    transactions,
    yearlyReports,
    isTransactionModalOpen,
    toastMessage,
    openTransactionModal,
    closeTransactionModal,
    clearToast,
  } = useDashboardPage()

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 sm:gap-6">
      <PageHeader
        title="Beranda"
        action={
          <button
            type="button"
            onClick={openTransactionModal}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-xs font-semibold text-white transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
          >
            <Plus className="size-4" aria-hidden="true" />
            Tambah transaksi
          </button>
        }
      />

      <SummaryCards summary={summary} />

      <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <YearlyExpenseChart reports={yearlyReports} />
        </div>

        <aside className="flex min-w-0 flex-col justify-between gap-6 rounded-3xl bg-white p-4 shadow-sm sm:p-6">
          <MonthlyGaugeCard summary={summary} />

          <div className="h-px bg-gray-100" />

          <RecentTransactions transactions={transactions} />
        </aside>
      </div>

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={closeTransactionModal}
      />

      {toastMessage && (
        <Toast message={toastMessage} onClose={clearToast} />
      )}
    </div>
  )
}

export default Home
