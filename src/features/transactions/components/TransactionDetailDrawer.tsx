
import { X } from 'lucide-react'
import type { Transaction } from '../../../types/transaction'
import { formatRupiah } from '../../../utils/format'
import { formatRecordedAt, formatTxDate } from '../format'

interface Props {
  transaction: Transaction | null
  confirmDelete: boolean
  onDelete: () => void
  onClose: () => void
}

const TransactionDetailDrawer = ({
  transaction: t,
  confirmDelete,
  onDelete,
  onClose,
}: Props) => {
  if (!t) return null

  const isIncome = t.type === 'income'

  const details = [
    ['Kategori', t.category],
    ['Tanggal', formatTxDate(t.date)],
    ['Catatan', t.notes || t.title],
    ['Dicatat', t.createdAt ? formatRecordedAt(t.createdAt) : '-'],
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-3 backdrop-blur-[1px] sm:p-6"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <h2
            id="detail-title"
            className="text-base font-semibold text-[#173D2B] sm:text-lg"
          >
            Detail transaksi
          </h2>

          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Tutup detail"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* Transaction Type */}
        <p className="mt-6 text-xs text-gray-500">
          {isIncome ? 'Pemasukan' : 'Pengeluaran'}
        </p>

        {/* Amount */}
        <p
          className={`mt-1 break-words text-3xl font-semibold sm:text-4xl ${
            isIncome ? 'text-emerald-800' : 'text-orange-700'
          }`}
        >
          {isIncome ? '+' : '-'}
          {formatRupiah(t.amount)}
        </p>

        {/* Details */}
        <dl className="mt-5">
          {details.map(([label, value]) => (
            <div
              key={label}
              className="flex items-start justify-between gap-4 border-b border-gray-100 py-3.5"
            >
              <dt className="shrink-0 text-xs text-gray-500">
                {label}
              </dt>

              <dd className="min-w-0 max-w-[65%] break-words text-right text-xs font-medium text-[#26382D] sm:text-sm">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Delete Button */}
        <button
          type="button"
          onClick={onDelete}
          className={`mt-6 w-full cursor-pointer rounded-full py-3.5 text-sm font-semibold text-white transition ${
            confirmDelete
              ? 'bg-red-800 hover:bg-red-900'
              : 'bg-[#B42318] hover:bg-[#912018]'
          }`}
        >
          {confirmDelete
            ? 'Klik sekali lagi untuk menghapus'
            : 'Hapus'}
        </button>

        {confirmDelete && (
          <p className="mt-2 text-center text-xs text-red-600">
            Tekan kembali untuk mengonfirmasi penghapusan transaksi.
          </p>
        )}
      </aside>
    </div>
  )
}

export default TransactionDetailDrawer
