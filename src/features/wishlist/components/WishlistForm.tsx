import { ChevronDown, CircleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  CATEGORY_OPTIONS,
  DEFAULT_DELAY_DAYS,
  DELAY_OPTIONS,
  MIN_DELAY_DAYS,
} from '../../../constants/wishlist'
import type {
  WishlistCategory,
  WishlistFormValues,
} from '../../../types/wishlist'

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (values: WishlistFormValues) => void
}

const inputClass =
  'w-full rounded-xl border border-transparent bg-[#F3F8F4] px-4 py-3 text-sm outline-none transition focus:border-emerald-500'

const labelClass = 'mb-1.5 block text-[11px] text-gray-600'

const chipClass = (active: boolean) =>
  `cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
    active
      ? 'border-[#0B3B24] bg-[#0B3B24] text-white'
      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
  }`

const formatDigits = (digits: string) =>
  digits ? new Intl.NumberFormat('id-ID').format(Number(digits)) : ''

const Required = () => <span className="text-red-500">*</span>

const WishlistForm = ({ open, onClose, onSubmit }: Props) => {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [priceDigits, setPriceDigits] = useState('')
  const [category, setCategory] = useState<WishlistCategory>('Barang')
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [delayDays, setDelayDays] = useState<number>(DEFAULT_DELAY_DAYS)
  const [isCustom, setIsCustom] = useState(false)
  const [customDays, setCustomDays] = useState(String(MIN_DELAY_DAYS))

  // tutup dengan tombol Esc
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  const price = Number(priceDigits)
  const effectiveDays = isCustom ? Number(customDays) : delayDays
  const daysTooShort = isCustom && effectiveDays < MIN_DELAY_DAYS
  const canSubmit =
    name.trim() !== '' && price > 0 && effectiveDays >= MIN_DELAY_DAYS

  const reset = () => {
    setName('')
    setLink('')
    setPriceDigits('')
    setCategory('Barang')
    setCategoryOpen(false)
    setDelayDays(DEFAULT_DELAY_DAYS)
    setIsCustom(false)
    setCustomDays(String(MIN_DELAY_DAYS))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit({
      name: name.trim(),
      link: link.trim(),
      price,
      category,
      delayDays: effectiveDays,
    })
    reset()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="wishlist-form-title"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92dvh] w-full max-w-sm overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
      >
        <h2 id="wishlist-form-title" className="mb-4 text-base font-medium">
          Tambah wishlist
        </h2>

        <label className={labelClass} htmlFor="wl-name">
          Nama Wishlist <Required />
        </label>
        <input
          id="wl-name"
          className={`${inputClass} mb-3`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Sepatu lari"
        />

        <label className={labelClass} htmlFor="wl-link">
          Link pembelian ( Opsional )
        </label>
        <input
          id="wl-link"
          className={`${inputClass} mb-3`}
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="tokopedia.com/..."
        />

        <label className={labelClass} htmlFor="wl-price">
          Target Budget <Required />
        </label>
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-[#F3F8F4] px-4 py-3 focus-within:ring-1 focus-within:ring-emerald-500">
          <span className="text-xs text-gray-600">Rp.</span>
          <input
            id="wl-price"
            inputMode="numeric"
            className="w-full bg-transparent text-sm font-semibold outline-none"
            value={formatDigits(priceDigits)}
            onChange={(e) =>
              setPriceDigits(e.target.value.replace(/\D/g, '').slice(0, 12))
            }
            placeholder="0"
          />
        </div>

        <p className={labelClass}>
          Kategori Wishlist <Required />
        </p>
        <button
          type="button"
          onClick={() => setCategoryOpen((v) => !v)}
          aria-expanded={categoryOpen}
          className="mb-1 flex w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-[#F3F8F4] px-4 py-3 text-sm"
        >
          {category}
          <ChevronDown
            size={16}
            className={`transition-transform ${categoryOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {categoryOpen && (
          <ul className="mb-1 rounded-xl border border-gray-200 bg-white p-1.5">
            {CATEGORY_OPTIONS.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => {
                    setCategory(option)
                    setCategoryOpen(false)
                  }}
                  className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-xs ${
                    option === category
                      ? 'bg-emerald-100 font-medium text-gray-900'
                      : 'text-gray-600 hover:bg-emerald-50'
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className={`${labelClass} mt-3`}>Masa tunda</p>
        <div className="flex flex-wrap items-center gap-2">
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

          {isCustom ? (
            <div className="inline-flex items-center gap-1 rounded-full bg-[#0B3B24] py-1.5 pl-4 pr-3 text-white">
              <input
                type="number"
                min={1}
                value={customDays}
                onChange={(e) => setCustomDays(e.target.value)}
                aria-label="Jumlah hari masa tunda"
                className="w-10 bg-transparent text-center text-xs font-medium outline-none"
              />
              <span className="text-xs font-medium">Hari</span>
            </div>
          ) : (
            <button
              type="button"
              className={chipClass(false)}
              onClick={() => setIsCustom(true)}
            >
              Lainnya
            </button>
          )}
        </div>

        {daysTooShort && (
          <p
            role="alert"
            className="mt-2 flex items-center gap-1.5 text-[11px] text-red-500"
          >
            <CircleAlert size={13} />
            Masa Tunda minimal {MIN_DELAY_DAYS} Hari!
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="mt-4 w-full cursor-pointer rounded-full bg-[#0B3B24] py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Simpan wishlist
        </button>
        <p className="mt-3 text-[11px] leading-relaxed text-gray-600">
          Wishlist disimpan dulu. Notifikasi baru muncul saat masa tunda berakhir.
        </p>
      </form>
    </div>
  )
}

export default WishlistForm