import { Link } from 'react-router-dom'
import Alert from '../../../components/ui/Alert'
import Button from '../../../components/ui/Button'
import Divider from '../../../components/ui/Divider'
import Input from '../../../components/ui/Input'
import { useGoogleAuth } from '../hooks/useGoogleAuth'
import { useRegisterForm } from '../hooks/useRegisterForm'
import GoogleIcon from './GoogleIcon'

export default function RegisterForm() {
  const {
    register,
    submit,
    isSubmitting,
    serverError,
    nameError,
    emailError,
    passwordError,
    agreeError,
  } = useRegisterForm()
  const { startGoogleAuth } = useGoogleAuth()

  return (
    <div>
      <h2 className="text-4xl font-extrabold">Buat akun baru</h2>
      <p className="mt-2 text-sm text-muted">Gratis, dan cuma butuh semenit.</p>

      <div className="mt-8 space-y-5">
        <form onSubmit={submit} noValidate className="space-y-5">
          {serverError && <Alert message={serverError} />}

          <Input
            label="Nama"
            placeholder="Nama kamu"
            autoComplete="name"
            error={nameError}
            {...register('name')}
          />

          <Input
            label="Email"
            type="email"
            placeholder="nama@email.com"
            autoComplete="email"
            error={emailError}
            {...register('email')}
          />

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Buat password"
              autoComplete="new-password"
              error={passwordError}
              {...register('password')}
            />
            {!passwordError && (
              <p className="mt-1.5 text-xs text-muted">Minimal 8 karakter.</p>
            )}
          </div>

          <div>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="size-4 cursor-pointer rounded accent-primary"
                {...register('agree')}
              />
              <span>
                Aku setuju dengan{' '}
                <Link
                  to="/syarat-ketentuan"
                  className="font-semibold text-primary hover:underline"
                >
                  Syarat dan Ketentuan
                </Link>
              </span>
            </label>
            {agreeError && <p className="mt-1.5 text-xs text-danger">{agreeError}</p>}
          </div>

          <Button type="submit" loading={isSubmitting}>
            Buat akun
          </Button>
        </form>

        <Divider text="ATAU" />

        <Button type="button" variant="outline" onClick={startGoogleAuth}>
          <GoogleIcon />
          Daftar dengan Google
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        Sudah punya akun?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  )
}
