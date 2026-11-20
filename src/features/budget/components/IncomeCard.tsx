import Button from '../../../components/ui/Button'
import { formatRupiah } from '../../../utils/format'

interface Props {
  income: number
  onAddCategory: () => void
}

const IncomeCard = ({ income, onAddCategory }: Props) => (
  <section className="rounded-3xl bg-white p-6 shadow-sm">
    <div className="flex flex-wrap items-end gap-3">
      <div className="w-full max-w-xs space-y-1.5">
        <p className="text-xs font-medium text-gray-700">
          Pemasukan utama bulan ini
        </p>
        <div className="flex h-12 cursor-default select-none items-center rounded-xl border border-line bg-white px-4 text-sm font-medium text-[#0F1F17]">
          {formatRupiah(income)}
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        fullWidth={false}
        onClick={onAddCategory}
      >
        + Tambah kategori
      </Button>
    </div>
  </section>
)

export default IncomeCard