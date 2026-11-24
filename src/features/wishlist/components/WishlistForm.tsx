import { useState } from 'react'
import type { FormEvent } from 'react'
import type { WishlistFormValues } from '../../../types/wishlist'
import { DEFAULT_DELAY_DAYS, DELAY_OPTIONS } from '../../../constants/wishlist'

interface Props {
  onSubmit: (values: WishlistFormValues) => void
}

const chipClass = (active: boolean) =>
  `rounded-full border px-5 py-2.5 text-base ${
    active
      ? 'border-[#0B3B24] bg-[#0B3B24] text-white'
      : 'border-gray-200 bg-white text-gray-700'
  }`

const inputClass =
  'w-full rounded-2xl border border-gray-200 bg-[#F3F8F4] px-5 py-4 text-base outline-none focus:border-emerald-500'

const labelClass = 'mb-2 block text-sm text-gray-500'

const WishlistForm = ({ onSubmit }: Props) => {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [delayDays, setDelayDays] = useState<number>(DEFAULT_DELAY_DAYS)
  const [isCustom, setIsCustom] = useState(false)

  const canSubmit = name.trim() !== '' && delayDays > 0

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit({ name: name.trim(), link: link.trim(), delayDays })
    setName('')
    setLink('')
    setDelayDays(DEFAULT_DELAY_DAYS)
    setIsCustom(false)
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-7 text-2xl font-medium">Tambah wishlist</h2>

      <label className={labelClass}>Nama Barang</label>
      <input
        className={`${inputClass} mb-6`}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Contoh: Sepatu lari"
      />

      <label className={labelClass}>Link pembelian</label>
      <input
        className={`${inputClass} mb-6`}
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="tokopedia.com/..."
      />

      <p className={labelClass}>Masa tunda</p>
      <div className="mb-7 flex flex-wrap gap-3">
        {DELAY_OPTIONS.map((days) => (
          <button
            key={days}
            type="button"
            className={chipClass(!isCustom && delayDays === days)}
            onClick={() => {
              setIsCustom(false)
              setDelayDays(days)
            }}
          >
            {days} hari
          </button>
        ))}
        <button
          type="button"
          className={chipClass(isCustom)}
          onClick={() => setIsCustom(true)}
        >
          Lainnya
        </button>
      </div>

      {isCustom && (
        <input
          type="number"
          min={1}
          className={`${inputClass} mb-7`}
          placeholder="Jumlah hari"
          onChange={(e) => setDelayDays(Number(e.target.value))}
        />
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-full bg-[#0B3B24] py-4 text-base font-medium text-white disabled:opacity-50"
      >
        Simpan wishlist
      </button>
      <p className="mt-4 text-sm text-gray-500">
        Wishlist disimpan dulu. Notifikasi baru muncul saat masa tunda berakhir.
      </p>
    </form>
  )
}

export default WishlistForm