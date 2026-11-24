import { Link } from 'react-router-dom'
import Alert from '../../../components/ui/Alert'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { useForgotPasswordForm } from '../hooks/useForgotPasswordForm'
import CheckEmailNotice from './CheckEmailNotice'

export default function ForgotPasswordForm() {
  const {
    register,
    submit,
    isSubmitting,
    serverError,
    emailError,
    sentTo,
    isResending,
    canResend,
    countdownLabel,
    resend,
  } = useForgotPasswordForm()

  if (sentTo) {
    return (
      <CheckEmailNotice
        email={sentTo}
        canResend={canResend}
        countdownLabel={countdownLabel}
        isResending={isResending}
        serverError={serverError}
        onResend={resend}
      />
    )
  }

  return (
    <div>
      <h2 className="text-center text-2xl font-extrabold sm:text-3xl lg:text-left lg:text-4xl">Lupa password?</h2>
      <p className="mt-2 text-center text-xs text-muted sm:text-sm lg:text-left">
        Masukkan emailmu, nanti kami kirim tautan untuk reset password.
      </p>

      <form onSubmit={submit} noValidate className="mt-6 space-y-5 sm:mt-8">
        {serverError && <Alert message={serverError} />}

        <Input
          label="Email"
          type="email"
          placeholder="nama@email.com"
          autoComplete="email"
          error={emailError}
          {...register('email')}
        />

        <Button type="submit" loading={isSubmitting}>
          Kirim tautan reset
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Ingat password?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  )
}