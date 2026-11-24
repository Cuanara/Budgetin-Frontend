import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Button from '../../../components/ui/Button'

const TERMS = [
  {
    title: '1. Penerimaan syarat',
    body: 'Dengan membuat akun, kamu menyetujui syarat penggunaan Budgetin yang berlaku.',
  },
  {
    title: '2. Akun dan keamanan',
    body: 'Kamu bertanggung jawab menjaga kerahasiaan email dan kata sandi akunmu.',
  },
  {
    title: '3. Data keuangan',
    body: 'Data budget, tabungan, dan transaksi hanya dipakai untuk menampilkan fitur di aplikasi.',
  },
  {
    title: '4. Penggunaan yang wajar',
    body: 'Budgetin tidak boleh dipakai untuk kegiatan yang melanggar hukum atau merugikan pengguna lain.',
  },
   {
    title: '5. Perubahan Syarat',
    body: 'Syarat dapat diperbarui. Kami akan memberi tahu kamu bila ada perubahan penting.',
  },
]

type Props = {
  open: boolean
  onClose: () => void
  onAccept: () => void
}

export default function TermsModal({ open, onClose, onAccept }: Props) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-title"
        className="flex max-h-[85vh] w-full max-w-[600px] flex-col rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2 id="terms-title" className="text-lg font-extrabold text-gray-900">
            Syarat dan Ketentuan
          </h2>
          <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-primary">
            Diperbarui 18 November 2026
          </span>
        </div>

        <div className="mt-4 flex-1 space-y-4 overflow-y-auto pr-1">
          {TERMS.map((item) => (
            <section key={item.title}>
              <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{item.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">   
          <Button type="button" variant="outline" onClick={onClose}>
            Tutup
          </Button>
          <Button type="button" onClick={onAccept}>
            Saya mengerti
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}