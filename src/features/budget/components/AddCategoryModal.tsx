import clsx from 'clsx'
import { X } from 'lucide-react'
import { useId } from 'react'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import Modal from '../../../components/ui/Modal'
import {
  MAX_CATEGORY_NAME_LENGTH,
  QUICK_PERCENTS,
} from '../../../constants/budget'
import type { AddCategoryInput, BudgetCategory } from '../../../types/budget'
import { formatRupiah } from '../../../utils/format'
import { useAddCategoryForm } from '../hooks/useAddCategoryForm'
import TakeFromSelect from './TakeFromSelect'

interface Props {
  categories: BudgetCategory[]
  income: number
  onSubmit: (input: AddCategoryInput) => boolean
  onClose: () => void
}

const AddCategoryModal = ({ categories, income, onSubmit, onClose }: Props) => {
  const titleId = useId()
  const percentId = useId()
  const takeFromId = useId()

  const form = useAddCategoryForm({ categories, income, onSubmit, onClose })
  const { values, errors, options, percentValue, preview } = form

  return (
    <Modal open onClose={onClose} labelledBy={titleId} size="md">
      <form onSubmit={form.handleSubmit} noValidate>
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 id={titleId} className="text-xl font-semibold text-[#0F1F17]">
              Tambah kategori
            </h2>
            <p className="text-xs text-gray-500">
              Atur jatah budget untuk kategori baru.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <X className="size-4" />
          </button>
        </div>

        <Input
          label="Nama kategori"
          value={values.name}
          maxLength={MAX_CATEGORY_NAME_LENGTH}
          onChange={(e) => form.setName(e.target.value)}
          placeholder="Contoh: Hiburan"
          error={errors.name}
          autoFocus
        />

        <label
          htmlFor={percentId}
          className="mt-4 block text-xs font-medium text-gray-700"
        >
          Jatah budget bulan ini
        </label>
        <p className="mb-1.5 text-xs text-gray-500">
          Berapa persen pemasukanmu yang boleh dipakai untuk kategori ini?
        </p>
        <div className="flex items-center gap-3">
          <div className="relative w-28 shrink-0">
            <Input
              id={percentId}
              inputMode="numeric"
              autoComplete="off"
              value={values.percent}
              onChange={(e) => form.setPercent(e.target.value)}
              invalid={Boolean(errors.percent)}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              %
            </span>
          </div>
          <p className="text-xs text-gray-500">
            ≈{' '}
            <span className="font-medium text-[#0F1F17]">
              {formatRupiah(preview.amount)}
            </span>{' '}
            dari pemasukan {formatRupiah(income)}
          </p>
        </div>
        {errors.percent && (
          <p className="mt-1.5 text-xs text-danger">{errors.percent}</p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500">Pilihan cepat</span>
          {QUICK_PERCENTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => form.setPercent(String(p))}
              aria-pressed={percentValue === p}
              className={clsx(
                'rounded-full border px-3.5 py-1 text-xs font-medium transition',
                percentValue === p
                  ? 'border-primary bg-primary text-white'
                  : 'border-line text-gray-700 hover:bg-gray-50',
              )}
            >
              {p}%
            </button>
          ))}
        </div>

        <label
          htmlFor={takeFromId}
          className="mt-4 block text-xs font-medium text-gray-700"
        >
          Ambil jatahnya dari kategori
        </label>
        <p className="mb-1.5 text-xs text-gray-500">
          Total jatah semua kategori harus 100%, jadi kategori yang kamu pilih
          akan dikurangi.
        </p>
        <TakeFromSelect
          id={takeFromId}
          options={options}
          value={values.takeFromId}
          percent={percentValue}
          hasError={Boolean(errors.takeFromId)}
          onChange={form.setTakeFromId}
        />
        {errors.takeFromId && (
          <p className="mt-1.5 text-xs text-danger">{errors.takeFromId}</p>
        )}

                {preview.canPreview && preview.donor && (
          <div className="mt-4 rounded-xl border border-emerald-100 bg-surface p-4 text-[13px]">
            <p className="mb-3 text-sm text-gray-700">Setelah disimpan</p>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">{preview.donor.name}</span>
                <span className="text-right text-gray-500">
                  <span className="font-semibold text-[#0F1F17]">
                    {preview.donor.currentPercent}% → {preview.donor.nextPercent}%
                  </span>
                  {' · '}
                  {formatRupiah(preview.donorAmountBefore)} →{' '}
                  {formatRupiah(preview.donor.remainingAmount)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-gray-500">
                  {values.name.trim() || 'Kategori baru'}
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-medium text-white">
                    Baru
                  </span>
                </span>
                <span className="text-right text-gray-500">
                  <span className="font-semibold text-[#0F1F17]">
                    {percentValue}%
                  </span>
                  {' · '}
                  {formatRupiah(preview.amount)}
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-emerald-100 pt-3 text-gray-500">
              <span>Total jatah</span>
              <span className="font-semibold text-[#0F1F17]">
                {preview.total}%
              </span>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit">Simpan kategori</Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddCategoryModal