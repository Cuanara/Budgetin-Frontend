import { Search, SlidersHorizontal } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import TransactionDetailDrawer from '../features/transactions/components/TransactionDetailDrawer'
import TransactionFilterModal from '../features/transactions/components/TransactionFilterModal'
import TransactionTable from '../features/transactions/components/TransactionTable'
import {
  useTransactionHistory,
  type TransactionTab,
} from '../features/transactions/hooks/useTransactionHistory'

const TABS: { value: TransactionTab; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'income', label: 'Pemasukan' },
  { value: 'expense', label: 'Pengeluaran' },
]

const Transactions = () => {
  const history = useTransactionHistory()

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-5">
      <PageHeader title="Riwayat Transaksi" />

      {/* Search dan Filter */}
      <div className="flex w-full min-w-0 items-center gap-2">
        <div className="flex h-10 min-w-0 flex-1 overflow-hidden rounded-xl bg-white shadow-sm">
          <input
            type="search"
            aria-label="Cari riwayat"
            placeholder="Cari riwayat..."
            value={history.query}
            onChange={(e) => history.setQuery(e.target.value)}
            className="min-w-0 flex-1 bg-transparent px-3 text-xs text-[#173D2B] outline-none placeholder:text-gray-400 sm:px-4"
          />

          <div className="grid w-11 shrink-0 place-items-center bg-[#0B3B24] text-white">
            <Search size={16} />
          </div>
        </div>

        <button
          type="button"
          aria-label="Filter transaksi"
          onClick={history.openFilter}
          className="relative grid size-10 shrink-0 place-items-center rounded-xl border border-[#D7E8DD] bg-white text-[#0B3B24] shadow-sm transition hover:bg-[#F3F8F4]"
        >
          <SlidersHorizontal size={17} />

          <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border border-white bg-red-500" />
        </button>
      </div>

      {/* Daftar Transaksi */}
      <section className="w-full min-w-0 overflow-hidden rounded-2xl bg-white p-3 shadow-sm sm:rounded-3xl sm:p-5">

        {/* Jumlah Transaksi */}
        <div className="flex min-w-0 items-center">
          <span className="max-w-full truncate rounded-full bg-[#E8F4EC] px-2.5 py-1 text-[10px] font-medium text-[#286344]">
            {history.rows.length} transaksi
            {history.activeCategory && ` · ${history.activeCategory}`}
          </span>
        </div>

        {/* Tab Transaksi */}
        <div className="mt-3 flex w-full rounded-full bg-[#F0F6F1] p-1">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              aria-pressed={history.tab === tab.value}
              onClick={() => history.setTab(tab.value)}
              className={`min-w-0 flex-1 cursor-pointer rounded-full px-1 py-2 text-[9px] font-medium transition sm:px-3 sm:text-xs ${
                history.tab === tab.value
                  ? 'bg-[#0B3B24] text-white shadow-sm'
                  : 'text-[#52675A] hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List Transaksi */}
        <TransactionTable
          rows={history.rows}
          onSelect={history.selectTransaction}
        />
      </section>

      {/* Modal Filter */}
      <TransactionFilterModal
        open={history.isFilterOpen}
        draft={history.draft}
        error={history.filterError}
        onChange={history.setDraft}
        onApply={history.applyFilter}
        onReset={history.resetFilter}
        onClose={history.closeFilter}
      />

      {/* Detail Transaksi */}
      <TransactionDetailDrawer
        transaction={history.selected}
        confirmDelete={history.confirmDelete}
        onDelete={history.deleteSelected}
        onClose={() => history.selectTransaction(null)}
      />
    </div>
  )
}

export default Transactions
