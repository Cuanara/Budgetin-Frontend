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
      className="fixed inset-0 z-50 flex justify-end bg-black/40"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-sm overflow-y-auto bg-white p-6"
      >
        <div className="flex items-center justify-between">
          <h2 id="detail-title" className="text-lg font-semibold">Detail transaksi</h2>
          <button type="button" autoFocus onClick={onClose} className="cursor-pointer text-xs">
            Tutup
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-600">{isIncome ? 'Pemasukan' : 'Pengeluaran'}</p>
        <p className={`text-4xl font-medium ${isIncome ? 'text-emerald-800' : 'text-orange-700'}`}>
          {isIncome ? '+' : '-'}
          {formatRupiah(t.amount)}
        </p>

        <dl className="mt-4">
          {details.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 border-b border-gray-100 py-4">
              <dt className="text-xs text-gray-600">{label}</dt>
              <dd className="text-right text-sm">{value}</dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={onDelete}
          className="mt-6 w-full cursor-pointer rounded-full bg-red-700 py-3 text-sm font-medium text-white hover:bg-red-800"
        >
          {confirmDelete ? 'Klik sekali lagi untuk menghapus' : 'Hapus'}
        </button>
      </aside>
    </div>
  )
}

export default TransactionDetailDrawer