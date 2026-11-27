// Gaya dasar kolom form. Warna border dan latar dipilih lewat fieldTone().
export const FIELD_BASE =
  'w-full rounded-xl border px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20'

export const fieldTone = (hasError: boolean) =>
  hasError ? 'border-danger bg-red-50' : 'border-line bg-gray-50'
