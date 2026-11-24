import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ApiError } from '../../../services/apiClient'
import { register as registerUser } from '../../../services/authService'
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
      if (err instanceof ApiError && err.fieldErrors) {
        const f = err.fieldErrors
        if (f.name?.[0]) setError('name', { message: f.name[0] })
        if (f.email?.[0]) setError('email', { message: f.email[0] })
        if (f.password?.[0]) setError('password', { message: f.password[0] })
        setServerError('Ada yang belum sesuai. Periksa lagi ya.')
        return
      }
      setServerError(
        err instanceof ApiError ? err.message : 'Tidak bisa terhubung ke server. Coba lagi',
      )
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
