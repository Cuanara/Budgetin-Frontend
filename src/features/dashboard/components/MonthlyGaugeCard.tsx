import type { DashboardSummary } from '../../../types/dashboard'
import { formatRupiah } from '../../../utils/format'

interface Props {
  summary: DashboardSummary
}

const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const MonthlyGaugeCard = ({ summary }: Props) => {
  const percent = Math.round(
    Math.min(100, Math.max(0, summary.monthlyBudgetPercent)),
  )
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE

  return (
    <section className="flex flex-col items-center text-center">
      <h2 className="self-start text-xs font-medium text-gray-600">
        Presentase pengeluaran bulan ini
      </h2>

      <div className="relative mt-4 size-32">
        <svg
          viewBox="0 0 100 100"
          className="size-full -rotate-90"
          role="img"
          aria-label={`${percent}% budget bulan ini sudah terpakai`}
        >
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            strokeWidth="11"
            className="stroke-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="stroke-primary transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-[#0B3B24]">
          {percent}%
        </span>
      </div>

      <p className="mt-4 text-2xl font-semibold tracking-tight text-[#0B3B24]">
        {formatRupiah(summary.monthlyBudgetSpent)}
      </p>
      <p className="mt-0.5 text-xs text-gray-500">
        Terpakai dari {formatRupiah(summary.monthlyBudgetLimit)}
      </p>
    </section>
  )
}

export default MonthlyGaugeCard
