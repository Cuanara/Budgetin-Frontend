import { useState } from 'react'
import { useBudgetStore } from '../../../stores/useBudgetStore'
import type { TransactionType } from '../../../types/transaction'
import { filterSchema, type TransactionFilter } from '../schemas'

export type TransactionTab = 'all' | TransactionType

const EMPTY_FILTER: TransactionFilter = { from: '', to: '', category: '' }

export const useTransactionHistory = () => {
  const transactions = useBudgetStore((s) => s.transactions)
  const removeTransaction = useBudgetStore((s) => s.removeTransaction)

  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<TransactionTab>('all')
  const [filter, setFilter] = useState(EMPTY_FILTER)
  const [draft, setDraft] = useState(EMPTY_FILTER)
  const [isFilterOpen, setFilterOpen] = useState(false)
  const [filterError, setFilterError] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const keyword = query.trim().toLowerCase()
  const rows = transactions
    .filter(
      (t) =>
        (tab === 'all' || t.type === tab) &&
        (!filter.from || t.date >= filter.from) &&
        (!filter.to || t.date <= filter.to) &&
        (!filter.category || t.category === filter.category) &&
        `${t.title} ${t.notes ?? ''} ${t.category}`.toLowerCase().includes(keyword),
    )
    .sort((a, b) => b.date.localeCompare(a.date))

  const openFilter = () => {
    setDraft(filter)
    setFilterError('')
    setFilterOpen(true)
  }

  const applyFilter = () => {
    const result = filterSchema.safeParse(draft)
    if (!result.success) {
      setFilterError(result.error.issues[0].message)
      return
    }
    setFilter(result.data)
    setFilterOpen(false)
  }

  const resetFilter = () => {
    setDraft(EMPTY_FILTER)
    setFilter(EMPTY_FILTER)
    setFilterError('')
  }

  const selectTransaction = (id: string | null) => {
    setSelectedId(id)
    setConfirmDelete(false)
  }

  // klik pertama minta konfirmasi, klik kedua menghapus
  const deleteSelected = () => {
    if (!selectedId) return
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    removeTransaction(selectedId)
    selectTransaction(null)
  }

  return {
    rows,
    query,
    setQuery,
    tab,
    setTab,
    activeCategory: filter.category,
    draft,
    setDraft,
    isFilterOpen,
    filterError,
    openFilter,
    closeFilter: () => setFilterOpen(false),
    applyFilter,
    resetFilter,
    selected: transactions.find((t) => t.id === selectedId) ?? null,
    selectTransaction,
    confirmDelete,
    deleteSelected,
  }
}