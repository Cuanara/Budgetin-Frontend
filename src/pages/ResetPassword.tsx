import ResetPasswordForm from '../features/auth/components/ResetPasswordForm'
import AuthLayout from '../layouts/AuthLayout'

export default function ResetPassword() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  )
}