import type { Transaction } from '../../../types/transaction'
import { formatRupiah } from '../../../utils/format'
import { formatTxDate } from '../format'

interface Props {
  rows: Transaction[]
  onSelect: (id: string) => void
}

const HEADERS = ['Tanggal', 'Catatan', 'Jenis Transaksi', 'Kategori', 'Nominal']

const TransactionTable = ({ rows, onSelect }: Props) => (
  <div className="mt-4 overflow-x-auto">
    <table className="w-full min-w-[600px] text-center text-xs">
      <thead>
        <tr>
          {HEADERS.map((header) => (
            <th key={header} className="py-4 font-medium text-gray-600">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => (
          <tr
            key={t.id}
            onClick={() => onSelect(t.id)}
            className="cursor-pointer border-t border-gray-100 hover:bg-[#F3F8F4]"
          >
            <td className="py-4">
              <button type="button" className="cursor-pointer">
                {formatTxDate(t.date)}
              </button>
            </td>
            <td>{t.notes || t.title}</td>
            <td>{t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</td>
            <td>{t.category}</td>
            <td className={t.type === 'income' ? 'text-emerald-800' : 'text-orange-700'}>
              {t.type === 'income' ? '+' : '-'}
              {formatRupiah(t.amount)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {rows.length === 0 && (
      <p className="py-10 text-center text-sm text-gray-500">Transaksi tidak ditemukan.</p>
    )}
  </div>
)

export default TransactionTable