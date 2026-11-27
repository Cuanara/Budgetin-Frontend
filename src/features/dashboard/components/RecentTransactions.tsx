import clsx from 'clsx'
import { Link } from 'react-router-dom'
import type { Transaction } from '../../../types/transaction'
import { formatRupiah } from '../../../utils/format'

interface Props {
  transactions: Transaction[]
}

const MAX_ITEMS = 3

const RecentTransactions = ({ transactions }: Props) => {
  const items = transactions.slice(0, MAX_ITEMS)

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-[#0F1F17]">
          Transaksi terbaru
        </h2>
        <Link
          to="/transactions"
          className="text-xs font-medium text-emerald-600 hover:underline"
        >
          Lihat semua
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-4 text-xs text-gray-500">Belum ada transaksi.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((tx) => {
            const isIncome = tx.type === 'income'
            return (
              <li
                key={tx.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-medium text-[#0B3B24]">
                    {tx.icon ??
                      (isIncome ? '+' : tx.category.charAt(0).toUpperCase())}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-[#0F1F17]">
                      {tx.title}
                    </p>
                    <p className="truncate text-[10px] text-gray-500">
                      {tx.category}
                    </p>
                  </div>
                </div>
                <span
                  className={clsx(
                    'shrink-0 text-xs font-semibold',
                    isIncome ? 'text-emerald-600' : 'text-orange-600',
                  )}
                >
                  {isIncome ? '+' : '-'}
                  {formatRupiah(tx.amount)}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default RecentTransactions
