import { MAX_CATEGORY_NAME_LENGTH } from '../../../constants/budget'
import type {
  AddCategoryFormErrors,
  AddCategoryFormValues,
  BudgetCategory,
} from '../../../types/budget'

export const validateAddCategory = (
  values: AddCategoryFormValues,
  categories: BudgetCategory[],
): AddCategoryFormErrors => {
  const errors: AddCategoryFormErrors = {}

  const name = values.name.trim()
  if (!name) {
    errors.name = 'Nama kategori wajib diisi.'
  } else if (name.length > MAX_CATEGORY_NAME_LENGTH) {
    errors.name = `Maksimal ${MAX_CATEGORY_NAME_LENGTH} karakter.`
  } else if (
    categories.some((c) => c.name.trim().toLowerCase() === name.toLowerCase())
  ) {
    errors.name = 'Nama kategori sudah dipakai.'
  }

  const percent = Number(values.percent)
  if (!values.percent) {
    errors.percent = 'Jatah budget wajib diisi.'
  } else if (!Number.isInteger(percent) || percent < 1 || percent > 100) {
    errors.percent = 'Isi angka 1 sampai 100.'
  }

  const donor = categories.find((c) => c.id === values.takeFromId)
  if (!values.takeFromId) {
    errors.takeFromId = 'Pilih kategori yang jatahnya dikurangi.'
  } else if (!donor) {
    errors.takeFromId = 'Kategori tidak ditemukan.'
  } else if (!errors.percent && donor.percent < percent) {
    errors.takeFromId = `Jatah ${donor.name} hanya ${donor.percent}%.`
  }

  return errors
}