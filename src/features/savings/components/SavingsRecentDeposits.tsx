import { ArrowDownLeft, Plus } from 'lucide-react'
import type { SavingsDeposit } from '../../../types/savings'
import { formatRupiah } from '../../../utils/format'

interface Props {
  deposits: SavingsDeposit[]
}

const SavingsRecentDeposits = ({ deposits }: Props) => (
  <section className="flex flex-col rounded-3xl bg-white p-6 shadow-sm">
    <div className="flex items-baseline justify-between">
      <h2 className="text-lg font-medium text-gray-900">Setoran terakhir</h2>
      <button type="button" className="text-xs font-medium text-[#0B3B24] hover:underline">
        Lihat semua
      </button>
    </div>

    {deposits.length === 0 ? (
      <p className="py-8 text-center text-sm text-gray-500">Belum ada setoran.</p>
    ) : (
      <ul className="mt-4 space-y-4">
        {deposits.map((deposit) => (
          <li key={deposit.id} className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-[#0B3B24]">
              <ArrowDownLeft size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {deposit.goalName}
              </p>
              <p className="text-xs text-gray-500">
                {deposit.date} · {deposit.method}
              </p>
            </div>
            <span className="shrink-0 text-sm font-medium text-emerald-700">
              +{formatRupiah(deposit.amount)}
            </span>
          </li>
        ))}
      </ul>
    )}

    <button
      type="button"
      // TODO: buka modal/halaman Target baru
      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0F1F17] py-3.5 text-sm font-medium text-white hover:bg-black"
    >
      <Plus size={16} />
      Target baru
    </button>
  </section>
)

export default SavingsRecentDeposits
