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
  const { startGoogleAuth } = useGoogleAuth()

  return (
    <div>
      <h2 className="text-4xl font-extrabold">Masuk ke Budgetin</h2>
      <p className="mt-2 text-sm text-muted">Selamat datang lagi! Yuk cek dompetmu.</p>

      <form onSubmit={submit} noValidate className="mt-8 space-y-5">
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

        <Divider text="ATAU" />

        <Button type="button" variant="outline" onClick={startGoogleAuth}>
          <GoogleIcon />
          Lanjut dengan Google
        </Button>

        <Button type="submit" loading={isSubmitting}>
          Masuk
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Belum punya akun?{' '}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  )
}
