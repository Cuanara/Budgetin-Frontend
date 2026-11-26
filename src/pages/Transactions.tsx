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
    <div className="space-y-5">
      <PageHeader title="Riwayat Transaksi" />

      <div className="flex items-center gap-3">
        <div className="flex w-full max-w-xs overflow-hidden rounded-lg border border-gray-200 bg-white">
          <input
            type="search"
            aria-label="Cari riwayat"
            placeholder="Cari riwayat..."
            value={history.query}
            onChange={(e) => history.setQuery(e.target.value)}
            className="min-w-0 flex-1 px-3 text-xs outline-none"
          />
          <span aria-hidden="true" className="grid size-9 place-items-center bg-[#0B3B24] text-white">
            <Search size={14} />
          </span>
        </div>
        <button
          type="button"
          aria-label="Filter"
          onClick={history.openFilter}
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg border border-gray-300 bg-white"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>

      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-medium">Riwayat transaksi</h2>
          <span className="rounded-full bg-[#F3F8F4] px-3 py-1 text-[11px] text-gray-600">
            {history.rows.length} transaksi
            {history.activeCategory && ` · ${history.activeCategory}`}
          </span>
        </div>

        <div className="mt-4 inline-flex rounded-full bg-[#F3F8F4] p-1">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              aria-pressed={history.tab === tab.value}
              onClick={() => history.setTab(tab.value)}
              className={`cursor-pointer rounded-full px-4 py-2 text-xs font-medium ${
                history.tab === tab.value ? 'bg-[#0B3B24] text-white' : 'text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <TransactionTable rows={history.rows} onSelect={history.selectTransaction} />
      </section>

      <TransactionFilterModal
        open={history.isFilterOpen}
        draft={history.draft}
        error={history.filterError}
        onChange={history.setDraft}
        onApply={history.applyFilter}
        onReset={history.resetFilter}
        onClose={history.closeFilter}
      />
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