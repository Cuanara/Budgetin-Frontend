import clsx from 'clsx'
import { CalendarDays, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type {
  MonthlyExpense,
  YearlyExpenseReport,
} from '../../../types/dashboard'
import { formatRupiah } from '../../../utils/format'

interface Props {
  reports: YearlyExpenseReport[]
}

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
]
const MONTH_LONG = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]
const Y_TICKS = [0, 20, 40, 60, 80, 100]
const SEGMENT_COLORS = ['bg-emerald-700', 'bg-emerald-500', 'bg-emerald-300']
const MIN_TOOLTIP_BOTTOM = 12

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const YearlyExpenseChart = ({ reports }: Props) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [activeMonth, setActiveMonth] = useState<number | null>(null)

  const currentYear = new Date().getFullYear()
  const report =
    reports.find((r) => r.year === (selectedYear ?? currentYear)) ?? reports[0]
  if (!report) return null

  const total = report.months.reduce((sum, m) => sum + m.amount, 0)
  const budgetPercent =
    report.budgetLimit > 0 ? Math.round((total / report.budgetLimit) * 100) : 0

  // 100% di sumbu Y = jatah rata-rata per bulan (budget tahunan / 12)
  const monthlySlice = report.budgetLimit / 12
  const barPercent = (amount: number) =>
    monthlySlice > 0 ? clamp((amount / monthlySlice) * 100, 0, 100) : 0

  const peak = report.months.reduce<MonthlyExpense | null>(
    (best, m) => (m.amount > (best?.amount ?? 0) ? m : best),
    null,
  )
  const shown = report.months.find((m) => m.month === activeMonth) ?? null
  const highlighted = shown ?? peak

  return (
    <section className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xs font-medium text-gray-600">
          Pengeluaran Tahunan
        </h2>

        <div className="flex items-center gap-2">
          <label className="relative inline-flex items-center">
            <CalendarDays
              className="pointer-events-none absolute left-3 size-3.5 text-gray-500"
              aria-hidden="true"
            />
            <select
              value={report.year}
              onChange={(e) => {
                setSelectedYear(Number(e.target.value))
                setActiveMonth(null)
              }}
              aria-label="Pilih tahun"
              className="h-8 appearance-none rounded-full border border-line bg-white pl-8 pr-8 text-xs font-medium text-[#0F1F17] outline-none focus:border-primary"
            >
              {reports.map((r) => (
                <option key={r.year} value={r.year}>
                  {r.year}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-2.5 size-3.5 text-gray-500"
              aria-hidden="true"
            />
          </label>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
            {budgetPercent}% dari budget tahunan
          </span>
        </div>
      </div>

      <p className="mt-2 text-3xl font-semibold tracking-tight text-[#0B3B24]">
        {formatRupiah(total)}
      </p>

      {/* Area grafik */}
      <div className="relative mt-8 h-52 pl-10">
        {Y_TICKS.map((tick) => (
          <div
            key={tick}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 flex translate-y-1/2 items-center gap-2"
            style={{ bottom: `${tick}%` }}
          >
            <span className="w-8 text-[10px] text-gray-400">{tick}%</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>
        ))}

        <div
          role="group"
          aria-label="Pengeluaran per bulan"
          className="relative flex h-full items-end gap-1.5 sm:gap-3"
        >
          {report.months.map((m) => (
            <button
              key={m.month}
              type="button"
              aria-label={`${MONTH_LONG[m.month - 1]} ${report.year}: ${formatRupiah(m.amount)}`}
              onPointerEnter={() => setActiveMonth(m.month)}
              onPointerLeave={() => setActiveMonth(null)}
              onFocus={() => setActiveMonth(m.month)}
              onBlur={() => setActiveMonth(null)}
              onClick={() => setActiveMonth(m.month)}
              className="flex h-full flex-1 items-end justify-center outline-none"
            >
              <span
                style={{ height: `${barPercent(m.amount)}%` }}
                className={clsx(
                  'w-full max-w-9 rounded-t-lg transition-colors',
                  highlighted?.month === m.month ? 'bg-emerald-500' : 'bg-emerald-100',
                )}
              />
            </button>
          ))}

          {shown && (
            <div
              role="tooltip"
              className="pointer-events-none absolute z-10 w-56 rounded-2xl bg-white p-3 shadow-lg ring-1 ring-black/5"
              style={{
                left: `${clamp(((shown.month - 0.5) / 12) * 100, 18, 82)}%`,
                bottom: `calc(${Math.max(barPercent(shown.amount), MIN_TOOLTIP_BOTTOM)}% + 10px)`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="whitespace-nowrap font-semibold text-[#0F1F17]">
                  {MONTH_LONG[shown.month - 1]} {report.year}
                </span>
                <span className="whitespace-nowrap font-semibold text-emerald-600">
                  {formatRupiah(shown.amount)}
                </span>
              </div>

              {shown.categories.length === 0 ? (
                <p className="mt-2 text-[11px] text-gray-500">
                  Belum ada pengeluaran.
                </p>
              ) : (
                <>
                  <div className="mt-2 flex h-1.5 gap-0.5 overflow-hidden rounded-full">
                    {shown.categories.map((c, i) => (
                      <span
                        key={c.category}
                        className={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                        style={{ flex: `${c.amount} 1 0%` }}
                      />
                    ))}
                  </div>
                  <ul className="mt-2 space-y-1">
                    {shown.categories.map((c, i) => (
                      <li
                        key={c.category}
                        className="flex items-center justify-between gap-2 text-[11px]"
                      >
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <span
                            className={clsx(
                              'size-1.5 rounded-full',
                              SEGMENT_COLORS[i % SEGMENT_COLORS.length],
                            )}
                            aria-hidden="true"
                          />
                          {c.category}
                        </span>
                        <span className="font-medium text-[#0F1F17]">
                          {formatRupiah(c.amount)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Label bulan: gap harus sama dengan gap batang di atas */}
      <div className="mt-2 flex gap-1.5 pl-10 sm:gap-3">
        {MONTH_SHORT.map((label, i) => (
          <span
            key={label}
            className={clsx(
              'flex-1 text-center text-[10px]',
              highlighted?.month === i + 1
                ? 'font-semibold text-[#0F1F17]'
                : 'text-gray-400',
            )}
          >
            {label}
          </span>
        ))}
      </div>
    </section>
  )
}

export default YearlyExpenseChart
