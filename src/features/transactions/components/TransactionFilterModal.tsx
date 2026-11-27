
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

const CATEGORIES = [
  'Makan',
  'Tempat Tinggal',
  'Transportasi',
  'Jajan',
  'Lainnya',
]

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
  <Modal
    open={open}
    onClose={onClose}
    labelledBy="filter-title"
    size="sm"
    contentClassName="max-h-[90dvh] overflow-y-auto p-5 sm:p-6"
  >
    <h2
      id="filter-title"
      className="mb-5 text-lg font-semibold text-[#173D2B]"
    >
      Filter
    </h2>

    {/* Date Filter */}
    {DATE_FIELDS.map(({ key, label }) => (
      <label
        key={key}
        className="mb-4 block text-xs font-medium text-gray-700"
      >
        {label}

        <input
          type="date"
          value={draft[key]}
          onChange={(e) =>
            onChange({ ...draft, [key]: e.target.value })
          }
          className="mt-2 w-full min-w-0 rounded-xl bg-[#F3F8F4] px-3 py-3 text-sm outline-none focus:ring-1 focus:ring-[#0B3B24] sm:px-4"
        />
      </label>
    ))}

    {/* Category Filter */}
    <p className="mb-3 text-xs font-medium text-gray-700">
      Kategori
    </p>

    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((category) => {
        const active = draft.category === category

        return (
          <button
            key={category}
            type="button"
            aria-pressed={active}
            onClick={() =>
              onChange({
                ...draft,
                category: active ? '' : category,
              })
            }
            className={`cursor-pointer rounded-full px-3 py-2 text-xs transition sm:px-4 ${
              active
                ? 'bg-[#0B3B24] text-white'
                : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-[#F3F8F4]'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>

    {/* Error */}
    {error && (
      <p role="alert" className="mt-3 text-xs text-red-600">
        {error}
      </p>
    )}

    {/* Action Buttons */}
    <div className="mt-6 grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onReset}
        className="cursor-pointer rounded-full border border-[#D7E8DD] bg-white py-3 text-sm font-medium text-[#173D2B] transition hover:bg-[#F3F8F4]"
      >
        Reset
      </button>

      <button
        type="button"
        onClick={onApply}
        className="cursor-pointer rounded-full bg-[#0B3B24] py-3 text-sm font-medium text-white transition hover:bg-[#185C3B]"
      >
        Terapkan
      </button>
    </div>
  </Modal>
)

export default TransactionFilterModal
