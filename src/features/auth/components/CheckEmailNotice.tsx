import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import Alert from '../../../components/ui/Alert'
import Button from '../../../components/ui/Button'

type Props = {
  email: string
  canResend: boolean
  countdownLabel: string
  isResending: boolean
  serverError: string
  onResend: () => void
}

export default function CheckEmailNotice({
  email,
  canResend,
  countdownLabel,
  isResending,
  serverError,
  onResend,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-sm text-center">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100 text-primary">
        <Mail className="size-6" />
      </div>

      <h2 className="mt-4 text-2xl font-extrabold">Cek email kamu</h2>
      <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
        Jika email terdaftar, tautan reset sudah kami kirim ke{' '}
        <strong className="text-gray-900">{email}</strong>. Berlaku 30 menit.
      </p>

      <div className="mt-6 space-y-4">
        {serverError && <Alert message={serverError} />}

        <Button
          type="button"
          variant="outline"
          onClick={onResend}
          disabled={!canResend}
          loading={isResending}
        >
          {canResend ? 'Kirim ulang' : `Kirim ulang (${countdownLabel})`}
        </Button>

        <Link to="/login" className="inline-block text-sm font-semibold text-primary hover:underline">
          Kembali ke login
        </Link>
      </div>
    </div>
  )
}