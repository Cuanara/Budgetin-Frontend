export const formatRupiah = (value: number) =>
  `Rp ${new Intl.NumberFormat('id-ID').format(value)}`

export const formatToday = () =>
  new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })