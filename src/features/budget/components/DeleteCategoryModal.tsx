import { Trash2 } from 'lucide-react'
import { useId } from 'react'
import Button from '../../../components/ui/Button'
import Modal from '../../../components/ui/Modal'
import type { BudgetCategory } from '../../../types/budget'

interface Props {
  category: BudgetCategory
  onConfirm: () => void
  onClose: () => void
}

const DeleteCategoryModal = ({ category, onConfirm, onClose }: Props) => {
  const titleId = useId()

  return (
    <Modal open onClose={onClose} labelledBy={titleId} size="sm">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-danger">
          <Trash2 className="size-6" />
        </div>
        <h2 id={titleId} className="text-xl font-semibold text-[#0F1F17]">
          Apakah anda yakin?
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Kategori {category.name} akan dihapus permanen dan tidak bisa
          dikembalikan.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            Ya, hapus
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteCategoryModal