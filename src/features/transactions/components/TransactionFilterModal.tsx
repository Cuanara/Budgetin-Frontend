import Modal from '../../../components/ui/Modal'
import type { TransactionFilter } from '../schemas'

interface Props {
  open: boolean
  draft: TransactionFilter
  error: string
  onChange: (draft: TransactionFilter) => void
  onApply: () => void
  onReset: () => void
  onClose: () => void
}

const CATEGORIES = ['Makan', 'Tempat Tinggal', 'Transportasi', 'Jajan', 'Lainnya']
const DATE_FIELDS = [
  { key: 'from', label: 'Dari tanggal' },
  { key: 'to', label: 'Sampai tanggal' },
] as const

const TransactionFilterModal = ({
  open,
  draft,
  error,
  onChange,
  onApply,
  onReset,
  onClose,
}: Props) => (
  <Modal open={open} onClose={onClose} labelledBy="filter-title" size="sm">
    <h2 id="filter-title" className="mb-3 text-lg font-semibold">Filter</h2>

    {DATE_FIELDS.map(({ key, label }) => (
      <label key={key} className="mb-3 block text-xs text-gray-700">
        {label}
        <input
          type="date"
          value={draft[key]}
          onChange={(e) => onChange({ ...draft, [key]: e.target.value })}
          className="mt-1.5 w-full rounded-xl bg-[#F3F8F4] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#0B3B24]"
        />
      </label>
    ))}

    <p className="mb-2 text-xs text-gray-700">Kategori</p>
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((category) => {
        const active = draft.category === category
        return (
          <button
            key={category}
            type="button"
            aria-pressed={active}
            onClick={() => onChange({ ...draft, category: active ? '' : category })}
            className={`cursor-pointer rounded-full px-4 py-2 text-xs ring-1 ${
              active ? 'bg-black text-white ring-black' : 'bg-white ring-gray-200'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>

    {error && <p role="alert" className="mt-3 text-xs text-red-600">{error}</p>}

    <div className="mt-6 grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onReset}
        className="cursor-pointer rounded-full py-3 text-sm font-medium shadow-md ring-1 ring-gray-100"
      >
        Reset
      </button>
      <button
        type="button"
        onClick={onApply}
        className="cursor-pointer rounded-full bg-black py-3 text-sm font-medium text-white"
      >
        Terapkan
      </button>
    </div>
  </Modal>
)

export default TransactionFilterModal