import { X } from 'lucide-react'
import Modal from '../../../components/ui/Modal'
import { useAddTargetForm } from '../hooks/useAddTargetForm'

interface Props {
  open: boolean
  onClose: () => void
}

const fieldClass =
  'w-full rounded-xl bg-[#F3F8F4] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#0B3B24]'

const AddTargetModal = ({ open, onClose }: Props) => {
  const form = useAddTargetForm(onClose)

  return (
    <Modal open={open} onClose={form.close} labelledBy="add-target-title" size="sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 id="add-target-title" className="text-lg font-semibold">Tambah Target</h2>
        <button
          type="button"
          aria-label="Tutup"
          onClick={form.close}
          className="grid size-9 cursor-pointer place-items-center rounded-full bg-[#F3F8F4]"
        >
          <X size={16} />
        </button>
      </div>

      <form onSubmit={form.submit}>
        <label htmlFor="target-name" className="mb-1.5 block text-xs text-gray-600">
          Nama Target
        </label>
        <input
          id="target-name"
          autoFocus
          value={form.name}
          onChange={(e) => form.setName(e.target.value)}
          placeholder="Dufan"
          className={`${fieldClass} mb-4`}
        />

        <label htmlFor="target-amount" className="mb-1.5 block text-xs text-gray-600">
          Target (Opsional)
        </label>
        <input
          id="target-amount"
          inputMode="numeric"
          value={form.targetText}
          onChange={(e) => form.setTarget(e.target.value)}
          placeholder="5.000.000"
          className={fieldClass}
        />

        {form.error && <p role="alert" className="mt-2 text-xs text-red-600">{form.error}</p>}

        <div className="mt-6 grid grid-cols-[1fr_1.6fr] gap-3">
          <button
            type="button"
            onClick={form.close}
            className="cursor-pointer rounded-xl border border-gray-200 py-3 text-sm font-medium"
          >
            Batal
          </button>
          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-[#0B3B24] py-3 text-sm font-medium text-white"
          >
            Setor sekarang
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddTargetModal