import { formatRupiah } from '../../../utils/format'

interface Props {
  total: number
  monthlyGain: number
  walletBalance: number
  reachedCount: number
  goalCount: number
  reachedPercent: number
}

const RADIUS = 26
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const SavingsSummary = ({
  total,
  monthlyGain,
  walletBalance,
  reachedCount,
  goalCount,
  reachedPercent,
}: Props) => {
  const offset = CIRCUMFERENCE * (1 - reachedPercent / 100)

  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_1.1fr_0.9fr]">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-xs text-gray-500">Total tabungan</p>
        <p className="mt-3 text-4xl font-medium text-gray-900">
          {formatRupiah(total)}
        </p>
        <p className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-medium text-emerald-800">
            +{formatRupiah(monthlyGain)}
          </span>
          bulan ini
        </p>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-xs text-gray-500">Saldo dompet</p>
        <p className="mt-3 text-4xl font-medium text-gray-900">
          {formatRupiah(walletBalance)}
        </p>
        <p className="mt-3 text-xs text-gray-500">Tersedia untuk setoran</p>
      </section>

      <section className="flex items-center gap-5 rounded-3xl bg-white p-6 shadow-sm">
        <span className="relative block size-16 shrink-0">
          <svg viewBox="0 0 60 60" className="-rotate-90">
            <circle
              cx="30"
              cy="30"
              r={RADIUS}
              fill="none"
              strokeWidth="6"
              className="stroke-emerald-100"
            />
            <circle
              cx="30"
              cy="30"
              r={RADIUS}
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className="stroke-emerald-500"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
            {reachedPercent}%
          </span>
        </span>
        <div>
          <p className="text-xs text-gray-500">Target tercapai</p>
          <p className="mt-1 text-xl font-medium text-gray-900">
            {reachedCount} dari {goalCount}
          </p>
        </div>
      </section>
    </div>
  )
}

export default SavingsSummary
