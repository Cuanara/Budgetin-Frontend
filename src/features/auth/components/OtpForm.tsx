import { Mail } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import { useOtpForm } from '../hooks/useOtpForm'
import OtpInput from './OtpInput'

export default function OtpForm() {
  const {
    email,
    digits,
    changeDigits,
    error,
    isComplete,
    isSubmitting,
    isResending,
    canResend,
    countdownLabel,
    submit,
    resend,
  } = useOtpForm()

  // Dibuka langsung tanpa lewat Register → tidak ada email
  if (!email) return <Navigate to="/register" replace />

  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
      <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-50 text-primary">
        <Mail className="size-6" />
      </div>

      <h2 className="mt-4 text-center text-2xl font-extrabold text-primary">Cek email kamu</h2>
      <p className="mt-2 text-center text-xs leading-relaxed text-muted">
        Kami kirim kode 6 digit ke <strong className="text-gray-900">{email}</strong>. Masukkan
        kodenya di bawah untuk lanjut.
      </p>

      <div className="mt-6">
        <OtpInput
          digits={digits}
          onChange={changeDigits}
          invalid={!!error}
          disabled={isSubmitting}
        />
        {error && <p className="mt-3 text-center text-xs text-danger">{error}</p>}
      </div>

      <div className="mt-6">
        <Button type="button" onClick={submit} disabled={!isComplete} loading={isSubmitting}>
          Verifikasi
        </Button>
      </div>

      <div className="mt-5 space-y-2 text-center text-xs text-muted">
        <p>
          Belum dapat kode?{' '}
          {canResend ? (
            <button
              type="button"
              onClick={resend}
              disabled={isResending}
              className="font-semibold text-primary hover:underline disabled:opacity-60"
            >
              Kirim ulang
            </button>
          ) : (
            <span className="font-medium text-gray-900">Kirim ulang dalam {countdownLabel}</span>
          )}
        </p>
        <Link to="/register" className="inline-block font-semibold text-primary hover:underline">
          Ganti email
        </Link>
      </div>

      <p className="mt-5 border-t border-line pt-4 text-center text-[11px] leading-relaxed text-muted">
        Kode berlaku 5 menit. Jangan bagikan kode ini siapa pun, termasuk ke tim Budgetin.
      </p>
    </div>
  )
}