import { Link } from 'react-router-dom'
import Alert from '../../../components/ui/Alert'
import Button from '../../../components/ui/Button'
import Checkbox from '../../../components/ui/Checkbox'
import Divider from '../../../components/ui/Divider'
import Input from '../../../components/ui/Input'
import { useGoogleAuth } from '../hooks/useGoogleAuth'
import { useLoginForm } from '../hooks/useLoginForm'
import GoogleIcon from './GoogleIcon'

export default function LoginForm() {
  const {
    register,
    submit,
    isSubmitting,
    serverError,
    hasServerError,
    emailError,
    passwordError,
  } = useLoginForm()
  const { googleButtonRef, googleError, isGoogleLoading } = useGoogleAuth()

  return (
    <div>
      <h2 className="text-center text-2xl font-extrabold sm:text-3xl lg:text-left lg:text-4xl">
        Masuk ke Budgetin
      </h2>
      <p className="mt-2 text-center text-xs text-muted sm:text-sm lg:text-left">
        Selamat datang lagi! Yuk cek dompetmu.
      </p>

      <div className="mt-6 space-y-5 sm:mt-8">
        <form onSubmit={submit} noValidate className="space-y-5">
          {serverError && <Alert message={serverError} />}

          <Input
            label="Email"
            type="email"
            placeholder="nama@email.com"
            autoComplete="email"
            error={emailError}
            invalid={hasServerError}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Masukkan password"
            autoComplete="current-password"
            error={passwordError}
            invalid={hasServerError}
            {...register('password')}
          />

          <div className="flex items-center justify-between">
            <Checkbox label="Tetap login" {...register('remember')} />
            <Link
              to="/lupa-password"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Lupa password?
            </Link>
          </div>

          <Button type="submit" loading={isSubmitting} disabled={isGoogleLoading}>
            Masuk
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
            Lanjut dengan Google
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
        Belum punya akun?{' '}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  )
}