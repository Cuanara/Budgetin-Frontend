import { Check } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import Alert from '../../../components/ui/Alert'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { useResetPasswordForm } from '../hooks/useResetPasswordForm'

export default function ResetPasswordForm() {
  const navigate = useNavigate()
  const {
    register,
    submit,
    isSubmitting,
    serverError,
    isDone,
    hasValidLink,
    passwordError,
    confirmPasswordError,
  } = useResetPasswordForm()

    // Dibuka tanpa token/email dari tautan email
    if (!hasValidLink && !isDone) return <Navigate to="/forgot-password" replace />

  if (isDone) {
    return (
      <div className="mx-auto w-full max-w-sm text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary text-white">
          <Check className="size-6" />
        </div>
        <h2 className="mt-4 text-2xl font-extrabold">Password diperbarui</h2>
        <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
          Password barumu sudah aktif. Silakan masuk dengan password baru.
        </p>
        <div className="mt-6">
          <Button type="button" onClick={() => navigate('/login', { replace: true })}>
            Masuk
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-center text-2xl font-extrabold sm:text-3xl lg:text-left lg:text-4xl">Buat password baru</h2>
      <p className="mt-2 text-center text-xs text-muted sm:text-sm lg:text-left">
        Minimal 8 karakter dengan kombinasi huruf dan angka.
      </p>

      <form onSubmit={submit} noValidate className="mt-6 space-y-5 sm:mt-8">
        {serverError && <Alert message={serverError} />}

        <Input
          label="Password baru"
          type="password"
          placeholder="Masukkan password baru"
          autoComplete="new-password"
          error={passwordError}
          {...register('password')}
        />

        <Input
          label="Ulangi password"
          type="password"
          placeholder="Ketik ulang password"
          autoComplete="new-password"
          error={confirmPasswordError}
          {...register('confirmPassword')}
        />

        <Button type="submit" loading={isSubmitting}>
          Simpan password
        </Button>
      </form>
    </div>
  )
}