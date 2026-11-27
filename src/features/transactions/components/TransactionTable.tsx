import type { Transaction } from '../../../types/transaction'
import { formatRupiah } from '../../../utils/format'
import { formatTxDate } from '../format'

interface Props {
  rows: Transaction[]
  onSelect: (id: string) => void
}

const TransactionTable = ({ rows, onSelect }: Props) => {
  if (rows.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm font-medium text-gray-600">
          Transaksi tidak ditemukan.
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Coba gunakan kata kunci atau filter lainnya.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-3 min-w-0">

      {/* MOBILE VIEW */}
      <div className="md:hidden">
        {rows.map((t) => {
          const isIncome = t.type === 'income'

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              className="flex w-full min-w-0 items-start justify-between gap-2 border-b border-[#EDF1ED] px-1 py-3 text-left transition hover:bg-[#F8FBF8] last:border-b-0"
            >
              {/* Informasi Transaksi */}
              <div className="min-w-0 flex-1">

                <p className="truncate text-[11px] font-semibold leading-4 text-[#26382D]">
                  {t.notes || t.title}
                </p>

                <p className="mt-0.5 text-[9px] leading-3 text-gray-400">
                  {formatTxDate(t.date)}
                </p>

                {/* Label */}
                <div className="mt-1.5 flex flex-wrap items-center gap-1">
                  <span
                    className={`rounded-full px-2 py-1 text-[8px] leading-none ${
                      isIncome
                        ? 'bg-[#E8F4EC] text-[#286344]'
                        : 'bg-[#F1F5F2] text-[#52675A]'
                    }`}
                  >
                    {isIncome ? 'Pemasukan' : 'Pengeluaran'}
                  </span>

                  <span className="rounded-full bg-[#F1F5F2] px-2 py-1 text-[8px] leading-none text-[#52675A]">
                    {t.category}
                  </span>
                </div>
              </div>

              {/* Nominal */}
              <p
                className={`shrink-0 whitespace-nowrap pt-0.5 text-[10px] font-medium ${
                  isIncome ? 'text-[#17613D]' : 'text-[#D94B26]'
                }`}
              >
                {isIncome ? '+' : '-'}
                {formatRupiah(t.amount)}
              </p>
            </button>
          )
        })}
      </div>

      {/* TABLET AND DESKTOP VIEW */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[600px] text-left text-xs">
          <thead>
            <tr className="border-b border-[#EDF1ED] text-gray-500">
              <th className="px-3 py-4 font-medium">Tanggal</th>
              <th className="px-3 py-4 font-medium">Catatan</th>
              <th className="px-3 py-4 font-medium">Jenis Transaksi</th>
              <th className="px-3 py-4 font-medium">Kategori</th>
              <th className="px-3 py-4 text-right font-medium">Nominal</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((t) => {
              const isIncome = t.type === 'income'

              return (
                <tr
                  key={t.id}
                  onClick={() => onSelect(t.id)}
                  className="cursor-pointer border-b border-[#EDF1ED] transition hover:bg-[#F8FBF8] last:border-b-0"
                >
                  <td className="whitespace-nowrap px-3 py-4 text-gray-500">
                    {formatTxDate(t.date)}
                  </td>

                  <td className="max-w-[200px] truncate px-3 py-4 text-[#26382D]">
                    {t.notes || t.title}
                  </td>

                  <td className="px-3 py-4 text-gray-600">
                    {isIncome ? 'Pemasukan' : 'Pengeluaran'}
                  </td>

                  <td className="px-3 py-4 text-gray-600">
                    {t.category}
                  </td>

                  <td
                    className={`whitespace-nowrap px-3 py-4 text-right font-medium ${
                      isIncome ? 'text-[#17613D]' : 'text-[#D94B26]'
                    }`}
                  >
                    {isIncome ? '+' : '-'}
                    {formatRupiah(t.amount)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionTable
