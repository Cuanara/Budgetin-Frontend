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
  const { googleButtonRef, googleError, isGoogleLoading } = useGoogleAuth()

  return (
    <div>
      <h2 className="text-center text-2xl font-extrabold sm:text-3xl lg:text-left lg:text-4xl">Buat akun baru</h2>
      <p className="mt-2 text-center text-xs text-muted sm:text-sm lg:text-left">Gratis, dan cuma butuh semenit.</p>

      <div className="mt-6 space-y-5 sm:mt-8">
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
                  Syarat & Ketentuan
                </Link>
              </span>
            </label>
            {agreeError && <p className="mt-1.5 text-xs text-danger">{agreeError}</p>}
          </div>

          <Button type="submit" loading={isSubmitting} disabled={isGoogleLoading}>
            Buat akun
          </Button>
        </form>

        <Divider text="ATAU" />

        {googleError && <Alert message={googleError} />}

        {/* tombolmu hanya tampilan; yang diklik user adalah tombol resmi Google yang transparan di atasnya */}
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            loading={isGoogleLoading}
            disabled={isSubmitting}
            tabIndex={-1}
            aria-hidden="true"
          >
            {!isGoogleLoading && <GoogleIcon />}
            Daftar dengan Google
          </Button>

          <div
            className={
              'absolute inset-0 flex items-center justify-center overflow-hidden rounded-full opacity-[0.01] ' +
              (isGoogleLoading || isSubmitting ? 'pointer-events-none' : '')
            }
          >
            {/* tombol Google 40px dibesarkan ke 48px agar menutup seluruh tombol */}
            <div ref={googleButtonRef} style={{ transform: 'scaleY(1.2)' }} />
          </div>
        </div>
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