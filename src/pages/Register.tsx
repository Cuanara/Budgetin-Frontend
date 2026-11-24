import RegisterForm from '../features/auth/components/RegisterForm'
import AuthLayout from '../layouts/AuthLayout'

export default function Register() {
  return (
    <AuthLayout reverse>
      <RegisterForm />
    </AuthLayout>
  )
}