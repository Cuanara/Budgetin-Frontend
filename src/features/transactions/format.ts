const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}

// '2026-11-12' -> '12 Nov 2026'
export const formatTxDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', DATE_OPTIONS)

export const formatRecordedAt = (iso: string) => {
  const d = new Date(iso)
  const time = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  return `${d.toLocaleDateString('id-ID', DATE_OPTIONS)}, ${time}`
}