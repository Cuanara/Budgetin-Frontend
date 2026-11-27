import { useState } from 'react'
import type { FormEvent } from 'react'
import { useBudgetStore } from '../../../stores/useBudgetStore'
import type { TransactionType } from '../../../types/transaction'

const EXPENSE_CATEGORIES = [
  'Makan',
  'Tempat Tinggal',
  'Transportasi',
  'Jajan',
  'Lainnya',
] as const

const INCOME_CATEGORIES = ['Tabungan', 'Budget Bulanan'] as const

// SEMENTARA: nanti diambil dari daftar target tabungan
const SAVINGS_CATEGORIES = [
  'Dana Darurat',
  'Tabungan Utama',
  'Wishlist',
  'Lainnya',
] as const

const EXPENSE_SOURCES = ['Budget Bulanan', 'Tabungan', 'Dana Darurat'] as const

const MAX_AMOUNT = 999_999_999_999 // 12 digit

interface Params {
  onSuccess: () => void
}

interface FormErrors {
  amount?: string
  title?: string
  date?: string
}

// tanggal lokal (bukan UTC) dalam format yang dipakai input type="date"
const todayLocal = () => {
  const d = new Date()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}

export const useTransactionModal = ({ onSuccess }: Params) => {
  const addTransaction = useBudgetStore((s) => s.addTransaction)

  const [type, setType] = useState<TransactionType>('expense')
  const [amount, setAmount] = useState(0)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0])
  const [source, setSource] = useState<string>(EXPENSE_SOURCES[0])
  const [subCategory, setSubCategory] = useState<string>(SAVINGS_CATEGORIES[0])
  const [date, setDate] = useState(todayLocal)
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const clearError = (key: keyof FormErrors) =>
    setErrors((e) => ({ ...e, [key]: undefined }))

  const isIncome = type === 'income'

  const selectType = (next: TransactionType) => {
    if (next === type) return
    setType(next)
    setCategory(next === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0])
    setErrors({})
  }

  const handleAmountInput = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 12)
    setAmount(digits ? Number(digits) : 0)
    clearError('amount')
  }

  const addPreset = (preset: number) => {
    setAmount((prev) => Math.min(prev + preset, MAX_AMOUNT))
    clearError('amount')
  }

  const updateTitle = (value: string) => {
    setTitle(value)
    clearError('title')
  }

  const updateDate = (value: string) => {
    setDate(value)
    clearError('date')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const next: FormErrors = {}
    if (amount <= 0) next.amount = 'Nominal harus lebih dari 0.'
    if (!title.trim()) {
      next.title = isIncome
        ? 'Nama pemasukan wajib diisi.'
        : 'Nama pengeluaran wajib diisi.'
    }
    if (!date) next.date = 'Tanggal wajib diisi.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    addTransaction({
      type,
      amount,
      title: title.trim(),
      category,
      source: isIncome ? category : source,
      subCategory: isIncome && category === 'Tabungan' ? subCategory : undefined,
      date,
      notes: notes.trim(),
    })
    onSuccess()
  }

  return {
    values: { type, amount, title, category, source, subCategory, date, notes },
    amountDisplay: amount > 0 ? amount.toLocaleString('id-ID') : '',
    errors,
    categories: isIncome ? INCOME_CATEGORIES : EXPENSE_CATEGORIES,
    sources: EXPENSE_SOURCES,
    savingsCategories: SAVINGS_CATEGORIES,
    selectType,
    handleAmountInput,
    addPreset,
    updateTitle,
    updateDate,
    setCategory,
    setSource,
    setSubCategory,
    setNotes,
    handleSubmit,
  }
}
