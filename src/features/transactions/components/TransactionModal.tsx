import clsx from 'clsx'
import { ArrowDown, ArrowUp, Check, X } from 'lucide-react'
import { useId } from 'react'
import Button from '../../../components/ui/Button'
import { FIELD_BASE, fieldTone } from '../../../components/ui/fieldStyles'
import Modal from '../../../components/ui/Modal'
import Select from '../../../components/ui/Select'
import { useTransactionModal } from '../hooks/useTransactionModal'

const QUICK_AMOUNTS = [10_000, 20_000, 50_000, 100_000] as const

const LABEL_CLASS = 'mb-1.5 block text-xs font-medium text-gray-700'

interface ContentProps {
  onClose: () => void
}

const TransactionModalContent = ({ onClose }: ContentProps) => {
  const titleId = useId()
  const amountId = useId()
  const nameId = useId()
  const dateId = useId()
  const notesId = useId()

  const form = useTransactionModal({ onSuccess: onClose })
  const { values, errors } = form
  const isIncome = values.type === 'income'
  const showSavingsCategory = isIncome && values.category === 'Tabungan'

  return (
    <Modal open onClose={onClose} labelledBy={titleId} size="md">
      <form onSubmit={form.handleSubmit} noValidate>
        <div className="relative mb-6">
          <h2
            id={titleId}
            className="text-center text-xl font-semibold text-[#0F1F17]"
          >
            Catatan Transaksi
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="absolute right-0 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Jenis transaksi */}
        <div className="grid grid-cols-2 gap-1 rounded-full bg-gray-100 p-1">
          <button
            type="button"
            aria-pressed={isIncome}
            onClick={() => form.selectType('income')}
            className={clsx(
              'flex h-10 items-center justify-center gap-2 rounded-full text-sm font-medium transition',
              isIncome
                ? 'bg-emerald-100 text-emerald-800'
                : 'text-gray-500 hover:text-gray-700',
            )}
          >
            <ArrowDown className="size-4 text-emerald-600" aria-hidden="true" />
            Pemasukan
          </button>
          <button
            type="button"
            aria-pressed={!isIncome}
            onClick={() => form.selectType('expense')}
            className={clsx(
              'flex h-10 items-center justify-center gap-2 rounded-full text-sm font-medium transition',
              !isIncome
                ? 'bg-red-100 text-red-800'
                : 'text-gray-500 hover:text-gray-700',
            )}
          >
            <ArrowUp className="size-4 text-red-500" aria-hidden="true" />
            Pengeluaran
          </button>
        </div>

        {/* Nominal */}
        <div className="mt-5">
          <label htmlFor={amountId} className={LABEL_CLASS}>
            Nominal Transaksi<span className="text-danger">*</span>
          </label>
          <div
            className={clsx(
              'flex h-14 items-center gap-2 rounded-xl border px-4 transition',
              'focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
              fieldTone(Boolean(errors.amount)),
            )}
          >
            <span className="text-sm font-medium text-gray-600">Rp.</span>
            <input
              id={amountId}
              inputMode="numeric"
              autoComplete="off"
              value={form.amountDisplay}
              onChange={(e) => form.handleAmountInput(e.target.value)}
              placeholder="0"
              aria-invalid={Boolean(errors.amount)}
              className="w-full min-w-0 bg-transparent text-2xl font-semibold text-[#0F1F17] outline-none placeholder:text-gray-300"
            />
          </div>
          {errors.amount && (
            <p className="mt-1.5 text-xs text-danger">{errors.amount}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => form.addPreset(preset)}
                className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600 transition hover:bg-gray-200"
              >
                +{preset.toLocaleString('id-ID')}
              </button>
            ))}
          </div>
        </div>

        {/* Nama transaksi */}
        <div className="mt-4">
          <label htmlFor={nameId} className={LABEL_CLASS}>
            {isIncome ? 'Pemasukan' : 'Pengeluaran'}
            <span className="text-danger">*</span>
          </label>
          <input
            id={nameId}
            value={values.title}
            maxLength={60}
            onChange={(e) => form.updateTitle(e.target.value)}
            placeholder={isIncome ? 'Contoh: Bonus Januari' : 'Contoh: Makan siang'}
            aria-invalid={Boolean(errors.title)}
            className={clsx('h-12', FIELD_BASE, fieldTone(Boolean(errors.title)))}
          />
          {errors.title && (
            <p className="mt-1.5 text-xs text-danger">{errors.title}</p>
          )}
        </div>

        {/* Kategori */}
        <div className="mt-4">
          <Select
            label="Kategori"
            required
            value={values.category}
            options={form.categories}
            onChange={form.setCategory}
          />
        </div>

        {/* Pemasukan ke Tabungan: pilih target tabungannya */}
        {showSavingsCategory && (
          <div className="mt-4">
            <Select
              label="Kategori Tabungan"
              required
              value={values.subCategory}
              options={form.savingsCategories}
              onChange={form.setSubCategory}
            />
          </div>
        )}

        {/* Pengeluaran: pilih sumber dananya */}
        {!isIncome && (
          <div className="mt-4">
            <Select
              label="Sumber Pengeluaran"
              required
              value={values.source}
              options={form.sources}
              onChange={form.setSource}
            />
          </div>
        )}

        {/* Tanggal */}
        <div className="mt-4">
          <label htmlFor={dateId} className={LABEL_CLASS}>
            Tanggal Transaksi<span className="text-danger">*</span>
          </label>
          <input
            id={dateId}
            type="date"
            value={values.date}
            onChange={(e) => form.updateDate(e.target.value)}
            aria-invalid={Boolean(errors.date)}
            className={clsx('h-12', FIELD_BASE, fieldTone(Boolean(errors.date)))}
          />
          {errors.date && (
            <p className="mt-1.5 text-xs text-danger">{errors.date}</p>
          )}
        </div>

        {/* Catatan */}
        <div className="mt-4">
          <label htmlFor={notesId} className={LABEL_CLASS}>
            Tambah Catatan ( Opsional )
          </label>
          <textarea
            id={notesId}
            rows={3}
            value={values.notes}
            onChange={(e) => form.setNotes(e.target.value)}
            placeholder="Ketik Catatan disini"
            className={clsx(
              'min-h-24 resize-y py-3',
              FIELD_BASE,
              fieldTone(false),
            )}
          />
        </div>

        <Button type="submit" className="mt-6">
          <Check className="size-4" aria-hidden="true" />
          Simpan Data Transaksi
        </Button>
        <p className="mt-3 text-center text-[11px] text-gray-400">
          Data otomatis menyinkronisasi saldo tabungan & persentase budget kamu.
        </p>
      </form>
    </Modal>
  )
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

// Isi modal dipasang baru setiap dibuka, jadi form otomatis kosong lagi.
export const TransactionModal = ({ isOpen, onClose }: Props) =>
  isOpen ? <TransactionModalContent onClose={onClose} /> : null
