import { Link } from 'react-router-dom'
import Alert from '../../../components/ui/Alert'
import Button from '../../../components/ui/Button'
import Checkbox from '../../../components/ui/Checkbox'
import Divider from '../../../components/ui/Divider'
import Input from '../../../components/ui/Input'
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

  return (
    <div>
      <h2 className="text-2xl font-extrabold">Masuk ke Budgetin</h2>
      <p className="mt-1 text-xs text-muted">Selamat datang lagi! Yuk cek dompetmu.</p>

      <div className="mt-6 space-y-4">
        <Button type="button" variant="outline">
          <GoogleIcon />
          Lanjut dengan Google
        </Button>

        <Divider text="atau pakai email" />

        <form onSubmit={submit} noValidate className="space-y-4">
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

          <Button type="submit" loading={isSubmitting}>
            Masuk
          </Button>
        </form>

        <p className="text-center text-xs text-muted">
          Belum punya akun?{' '}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  )
}