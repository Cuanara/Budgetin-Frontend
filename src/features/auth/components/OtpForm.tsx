import { MailCheck } from 'lucide-react'
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
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col sm:flex-none sm:rounded-3xl sm:bg-white sm:p-8 sm:shadow-xl">
      <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-50 text-primary">
        <MailCheck className="size-6" />
      </div>

      <h2 className="mt-4 text-center text-2xl font-extrabold text-primary">Cek email kamu</h2>
      <p className="mt-2 text-center text-xs leading-relaxed text-muted">
        Kami udah kirim kode 6 digit ke{' '}
        <strong className="text-gray-900">{email}</strong>. Masukin di bawah buat lanjut.
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

      <div className="mt-5 text-center text-xs text-muted">
        <p>
          Belum dapet kode?{' '}
          {canResend ? (
            <span className="font-medium text-gray-900">Kirim ulang sekarang</span>
          ) : (
            <>
              Kirim ulang dalam{' '}
              <span className="font-bold text-gray-900">{countdownLabel}</span>
            </>
          )}
        </p>
        <button
          type="button"
          onClick={resend}
          disabled={!canResend || isResending}
          className="mt-3 text-xs font-semibold text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50 disabled:no-underline"
        >
          Kirim ulang
        </button>
      </div>

      <div className="mt-8 border-t border-line pt-4 text-center text-[11px] leading-relaxed text-muted max-sm:mt-auto">
        <p>Periksa folder Spam atau Promosi kalau belum masuk.</p>
        <Link to="/register" className="mt-3 inline-block text-xs font-semibold text-primary hover:underline">
          Ganti email
        </Link>
      </div>
    </div>
  )
}
