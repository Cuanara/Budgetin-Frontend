import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { ApiError } from '../../../services/apiClient'
import { resetPassword } from '../../../services/authService'
import { resetPasswordSchema, type ResetPasswordFormValues } from '../schemas'

export function useResetPasswordForm() {
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const email = params.get('email') ?? ''

  const [serverError, setServerError] = useState('')
  const [isDone, setIsDone] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const submit = handleSubmit(async (values) => {
    setServerError('')
    try {
      await resetPassword({
        email,
        token,
        password: values.password,
        password_confirmation: values.confirmPassword,
      })
      setIsDone(true)
    } catch (err) {
      if (err instanceof ApiError && (err.status === 422 || err.status === 400)) {
        setServerError('Tautan sudah kedaluwarsa atau tidak valid. Minta tautan baru ya.')
      } else if (err instanceof ApiError) {
        setServerError(err.message)
      } else {
        setServerError('Tidak bisa terhubung ke server. Coba lagi')
      }
    }
  })

  return {
    register,
    submit,
    isSubmitting,
    serverError,
    isDone,
    hasValidLink: !!token && !!email,
    passwordError: errors.password?.message,
    confirmPasswordError: errors.confirmPassword?.message,
  }
}