
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

const DeleteCategoryModal = ({
  category,
  onConfirm,
  onClose,
}: Props) => {
  const titleId = useId()

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal
      open
      onClose={onClose}
      labelledBy={titleId}
      size="sm"
      contentClassName="max-w-[350px] px-5 py-4"
    >
      <div className="text-center">

        {/* Icon Hapus */}
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1CC]">
          <Trash2 className="size-6 text-[#E54830]" strokeWidth={2.2} />
        </div>

        {/* Judul */}
        <h2
          id={titleId}
          className="text-lg font-bold text-[#173D2B]"
        >
          Apakah anda yakin?
        </h2>

        {/* Deskripsi */}
        <p className="mx-auto mt-2 max-w-[270px] text-xs leading-relaxed text-[#68756D]">
          Kategori <span className="font-semibold text-[#26382D]">{category.name}</span> akan dihapus permanen dan tidak bisa dikembalikan.
        </p>

        {/* Tombol Aksi */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-10 border-[#D7E8DD] px-3 text-xs text-[#26382D]"
          >
            Batal
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={handleConfirm}
            className="h-10 bg-[#D92D20] px-3 text-xs hover:bg-[#B42318]"
          >
            Ya, hapus
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteCategoryModal
