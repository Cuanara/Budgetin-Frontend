import type { DashboardSummary } from '../../../types/dashboard'
import { formatRupiah } from '../../../utils/format'

interface Props {
  summary: DashboardSummary
}

const SummaryCards = ({ summary }: Props) => (
  <section className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
    <article className="flex flex-col justify-between rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div>
        <div className="flex min-h-6 items-center justify-between gap-3">
          <h2 className="text-xs font-medium text-gray-600">Saldo saat ini</h2>
          <span className="shrink-0 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-danger">
            -{summary.daysRemaining} hari
          </span>
        </div>
        <p className="mt-3 truncate text-2xl font-semibold tracking-tight text-[#0B3B24] sm:text-3xl">
          {formatRupiah(summary.currentBalance)}
        </p>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-gray-500">
        Dengan perkiraan pengeluaran harian :{' '}
        <span className="font-medium text-[#0F1F17]">
          {formatRupiah(summary.dailyEstimatedExpense)}
        </span>
      </p>
    </article>

    <article className="flex flex-col justify-between rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div>
        <div className="flex min-h-6 items-center">
          <h2 className="text-xs font-medium text-gray-600">Tabungan saat ini</h2>
        </div>
        <p className="mt-3 truncate text-2xl font-semibold tracking-tight text-[#0B3B24] sm:text-3xl">
          {formatRupiah(summary.currentSavings)}
        </p>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-gray-500">
        Anda masih harus menabung{' '}
        <span className="font-medium text-[#0F1F17]">
          {formatRupiah(summary.savingsTargetRemaining)}
        </span>{' '}
        lagi untuk mendapatkan semua wishlist anda
      </p>
    </article>
  </section>
)

export default SummaryCards