import type { DashboardSummary } from '../../../types/dashboard'
import { formatRupiah } from '../../../utils/format'

interface Props {
  summary: DashboardSummary
}

const SummaryCards = ({ summary }: Props) => (
  <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <article className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex min-h-6 items-center justify-between gap-3">
        <h2 className="text-xs font-medium text-gray-600">Saldo saat ini</h2>
        <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-danger">
          -{summary.daysRemaining} hari
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-[#0B3B24]">
        {formatRupiah(summary.currentBalance)}
      </p>
      <p className="mt-2 text-xs text-gray-500">
        Dengan perkiraan pengeluaran harian :{' '}
        <span className="font-medium text-[#0F1F17]">
          {formatRupiah(summary.dailyEstimatedExpense)}
        </span>
      </p>
    </article>

    <article className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex min-h-6 items-center">
        <h2 className="text-xs font-medium text-gray-600">Tabungan saat ini</h2>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-[#0B3B24]">
        {formatRupiah(summary.currentSavings)}
      </p>
      <p className="mt-2 text-xs text-gray-500">
        Anda masih harus menabung{' '}
        {formatRupiah(summary.savingsTargetRemaining)} lagi untuk mendapatkan
        semua wishlist anda
      </p>
    </article>
  </section>
)

export default SummaryCards
