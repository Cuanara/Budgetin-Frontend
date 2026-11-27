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
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Beranda"
        action={
          <button
            type="button"
            onClick={openTransactionModal}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-xs font-semibold text-white transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Plus className="size-4" aria-hidden="true" />
            Tambah transaksi
          </button>
        }
      />

      <SummaryCards summary={summary} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <YearlyExpenseChart reports={yearlyReports} />
        </div>

        <aside className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm">
          <MonthlyGaugeCard summary={summary} />
          <div className="h-px bg-gray-100" />
          <RecentTransactions transactions={transactions} />
        </aside>
      </div>

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={closeTransactionModal}
      />

      {toastMessage && <Toast message={toastMessage} onClose={clearToast} />}
    </div>
  )
}

export default Home
