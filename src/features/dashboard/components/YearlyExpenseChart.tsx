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
    <section className="flex h-full flex-col justify-between rounded-3xl bg-white p-4 shadow-sm sm:p-6">
      <div>
        {/* Header Kartu: Label & Persentase di atas, Kalender di bawahnya sebelah kanan */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xs font-medium text-gray-600 pt-1.5">
            Pengeluaran Tahunan
          </h2>

          <div className="flex flex-col items-end gap-2">
            {/* Badge Persentase sejajar dengan tulisan Pengeluaran Tahunan */}
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
              {budgetPercent}% dari budget tahunan
            </span>

            {/* Tombol Kalender / Pilih Tahun di bawah persentase */}
            <label className="relative inline-flex items-center">
              <span className="sr-only">Pilih tahun</span>
              <select
                value={report.year}
                onChange={(e) => {
                  setSelectedYear(Number(e.target.value))
                  setActiveMonth(null)
                }}
                className="h-8 appearance-none rounded-full bg-emerald-50/80 pl-8 pr-8 text-xs font-semibold text-emerald-800 outline-none transition hover:bg-emerald-100 focus:ring-2 focus:ring-emerald-500"
              >
                {reports.map((r) => (
                  <option key={r.year} value={r.year}>
                    {r.year}
                  </option>
                ))}
              </select>
              <CalendarDays
                className="pointer-events-none absolute left-3 size-3.5 text-emerald-700"
                aria-hidden="true"
              />
              <ChevronDown
                className="pointer-events-none absolute right-2.5 size-3.5 text-emerald-700"
                aria-hidden="true"
              />
            </label>
          </div>
        </div>

        {/* Total Pengeluaran */}
        <p className="mt-2 text-2xl font-semibold tracking-tight text-[#0B3B24] sm:text-3xl">
          {formatRupiah(total)}
        </p>

        {/* Rincian Bulan Aktif khusus tampilan Mobile */}
        {highlighted && (
          <div className="mt-5 rounded-2xl bg-gray-50/70 p-3.5 md:hidden">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-[#0F1F17]">
                {MONTH_LONG[highlighted.month - 1]} {report.year}
              </span>
              <span className="font-semibold text-emerald-600">
                {formatRupiah(highlighted.amount)}
              </span>
            </div>

            {highlighted.categories.length === 0 ? (
              <p className="mt-2 text-[11px] text-gray-500">
                Belum ada pengeluaran.
              </p>
            ) : (
              <>
                <div className="mt-2 flex h-1.5 gap-0.5 overflow-hidden rounded-full">
                  {highlighted.categories.map((c, i) => (
                    <span
                      key={c.category}
                      className={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                      style={{ flex: `${c.amount} 1 0%` }}
                    />
                  ))}
                </div>
                <ul className="mt-2.5 space-y-1.5">
                  {highlighted.categories.map((c, i) => (
                    <li
                      key={c.category}
                      className="flex items-center justify-between gap-2 text-xs"
                    >
                      <span className="flex items-center gap-2 text-gray-600">
                        <span
                          className={clsx(
                            'size-2 rounded-full',
                            SEGMENT_COLORS[i % SEGMENT_COLORS.length],
                          )}
                          aria-hidden="true"
                        />
                        {c.category}
                      </span>
                      <span className="font-semibold text-[#0F1F17]">
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

      {/* Area Grafik */}
      <div className="mt-6 sm:mt-8">
        <div className="relative h-44 pl-8 sm:h-52 sm:pl-10">
          {Y_TICKS.map((tick) => (
            <div
              key={tick}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 flex translate-y-1/2 items-center gap-1.5 sm:gap-2"
              style={{ bottom: `${tick}%` }}
            >
              <span className="w-6 text-right text-[10px] text-gray-400 sm:w-8">
                {tick}%
              </span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>
          ))}

          <div
            role="group"
            aria-label="Pengeluaran per bulan"
            className="relative flex h-full items-end gap-1 sm:gap-3"
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
                onClick={() =>
                  setActiveMonth((prev) => (prev === m.month ? null : m.month))
                }
                className="flex h-full flex-1 items-end justify-center outline-none"
              >
                <span
                  style={{ height: `${barPercent(m.amount)}%` }}
                  className={clsx(
                    'w-full max-w-9 rounded-t-md transition-colors sm:rounded-t-lg',
                    highlighted?.month === m.month
                      ? 'bg-emerald-500'
                      : 'bg-emerald-100 hover:bg-emerald-200',
                  )}
                />
              </button>
            ))}

            {/* Tooltip Melayang (Hanya untuk Tablet/Desktop) */}
            {shown && (
              <div
                role="tooltip"
                className="pointer-events-none absolute z-10 hidden w-56 rounded-2xl bg-white p-3 shadow-lg ring-1 ring-black/5 md:block"
                style={{
                  left: `${clamp(((shown.month - 0.5) / 12) * 100, 15, 85)}%`,
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

        {/* Label Bulan */}
        <div className="mt-2 flex gap-1 pl-8 sm:gap-3 sm:pl-10">
          {MONTH_SHORT.map((label, i) => (
            <span
              key={label}
              className={clsx(
                'flex-1 text-center text-[9px] sm:text-[10px]',
                highlighted?.month === i + 1
                  ? 'font-semibold text-[#0F1F17]'
                  : 'text-gray-400',
              )}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default YearlyExpenseChart