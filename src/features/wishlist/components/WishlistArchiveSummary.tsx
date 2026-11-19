import { formatRupiah } from '../../../utils/format'

interface Props {
  total: number
  count: number
}

const WishlistArchiveSummary = ({ total, count }: Props) => (
  <section className="flex flex-col gap-4 rounded-3xl bg-emerald-100/70 px-8 py-6 md:flex-row md:items-center md:justify-between">
    <div>
      <p className="text-sm text-[#0F1F17]">Uang yang berhasil kamu tahan</p>
      <p className="mt-1 text-4xl font-semibold text-[#0F1F17]">
        {formatRupiah(total)}
      </p>
    </div>
    <p className="max-w-sm text-sm text-gray-700">
      Dari {count} barang yang akhirnya tidak jadi dibeli. Belanja impulsif
      berhasil ditahan.
    </p>
  </section>
)

export default WishlistArchiveSummary