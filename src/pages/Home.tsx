import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { LogoutModal } from '../components/LogoutModal';
import { Toast } from '../components/Toast';
import { SummaryCards } from '../features/dashboard/components/SummaryCards';
import { ExpenseBarChart } from '../features/dashboard/components/ExpenseBarChart';
import { ExpenseGaugeCard } from '../features/dashboard/components/ExpenseGaugeCard';
import { RecentTransactions } from '../features/dashboard/components/RecentTransactions';
import { TransactionModal } from '../features/transactions/components/TransactionModal';
import { useDashboard } from '../hooks/useDashboard';

const Home: React.FC = () => {
  const {
    profile,
    summary,
    transactions,
    isTransactionModalOpen,
    isLogoutModalOpen,
    toastMessage,
    openTransactionModal,
    closeTransactionModal,
    openLogoutModal,
    closeLogoutModal,
    handleLogoutConfirm,
    clearToast,
  } = useDashboard();

  return (
    <div className="flex min-h-screen bg-[#071C13]">
      {/* Left Sidebar */}
      <Sidebar
        profile={profile}
        onOpenLogoutModal={openLogoutModal}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto">
        <Navbar
          title="Dashboard"
          dateText="Kamis, 12 November 2026"
          showAddButton={true}
          onOpenAddModal={openTransactionModal}
        />

        {/* Top Summary Cards (Saldo saat ini & Tabungan saat ini) */}
        <SummaryCards summary={summary} />

        {/* Middle Grid (Pengeluaran Bulan Ini Chart & Gauge / Transaksi Terbaru) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left Column (Span 2): Expense Bar Chart */}
          <div className="lg:col-span-2">
            <ExpenseBarChart summary={summary} />
          </div>

          {/* Right Column (Span 1): Gauge + Recent Transactions */}
          <div className="bg-[#0C2B1E] rounded-3xl p-6 shadow-xl border border-[#16432F] flex flex-col justify-between">
            <ExpenseGaugeCard summary={summary} />
            <RecentTransactions
              transactions={transactions}
              onOpenAllTransactions={openTransactionModal}
            />
          </div>
        </div>
      </main>

      {/* Transaction Entry Modal (Desain Catatan Transaksi) */}
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={closeTransactionModal}
      />

      {/* Logout Confirmation Modal (Desain Keluar dari akun?) */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={handleLogoutConfirm}
      />

      {/* Floating Feedback Toast */}
      <Toast message={toastMessage} onClear={clearToast} />
    </div>
  );
};

export default Home;
