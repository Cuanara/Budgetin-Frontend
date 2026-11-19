import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { EmailTakenError, register as registerUser } from '../../../services/authService'
import { registerSchema, type RegisterFormValues } from '../schemas'

export function useRegisterForm() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', agree: false },
  })

  const submit = handleSubmit(async (values) => {
    setServerError('')
    try {
      const res = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      })
      navigate('/verifikasi-otp', { state: { email: res.email } })
    } catch (err) {
      if (err instanceof EmailTakenError) {
        setError('email', { message: err.message })
      }
      setServerError('Registrasi belum berhasil. Cek lagi datamu.')
    }
  })

  return {
    register,
    submit,
    isSubmitting,
    serverError,
    nameError: errors.name?.message,
    emailError: errors.email?.message,
    passwordError: errors.password?.message,
    agreeError: errors.agree?.message,
  }
}