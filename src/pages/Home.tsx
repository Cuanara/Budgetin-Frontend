import React from 'react';
import { Navbar } from '../components/Navbar';
import { Toast } from '../components/Toast';
import { SummaryCards } from '../features/dashboard/components/SummaryCards';
import { ExpenseBarChart } from '../features/dashboard/components/ExpenseBarChart';
import { ExpenseGaugeCard } from '../features/dashboard/components/ExpenseGaugeCard';
import { RecentTransactions } from '../features/dashboard/components/RecentTransactions';
import { TransactionModal } from '../features/transactions/components/TransactionModal';
import { useDashboard } from '../hooks/useDashboard';

const Home: React.FC = () => {
  const {
    summary,
    transactions,
    isTransactionModalOpen,
    toastMessage,
    openTransactionModal,
    closeTransactionModal,
    clearToast,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-[#071C13] p-6 lg:p-8">
      <Navbar
        title="Dashboard"
        dateText={new Date().toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
        showAddButton={true}
        onOpenAddModal={openTransactionModal}
      />

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <ExpenseBarChart summary={summary} />
        </div>

        <div className="bg-[#0C2B1E] rounded-3xl p-6 shadow-xl border border-[#16432F] flex flex-col justify-between">
          <ExpenseGaugeCard summary={summary} />
          <RecentTransactions
            transactions={transactions}
            onOpenAllTransactions={openTransactionModal}
          />
        </div>
      </div>

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={closeTransactionModal}
      />

      <Toast message={toastMessage} onClear={clearToast} />
    </div>
  );
};

export default Home;
