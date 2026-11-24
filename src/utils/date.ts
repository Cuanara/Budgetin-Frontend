const formatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

// '2026-11-12' -> '12 Nov 2026'
export const formatShortDate = (iso: string) => formatter.format(new Date(iso))

export const addDaysToDate = (iso: string, days: number) => {
  const date = new Date(iso)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString()
}