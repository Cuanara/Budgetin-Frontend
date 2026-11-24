import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCountdown } from '../../../hooks/useCountdown'
import { ApiError } from '../../../services/apiClient'
import { forgotPassword } from '../../../services/authService'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../schemas'

const RESEND_SECONDS = 45

export function useForgotPasswordForm() {
  const [sentTo, setSentTo] = useState('')
  const [serverError, setServerError] = useState('')
  const [isResending, setIsResending] = useState(false)
  const countdown = useCountdown(RESEND_SECONDS)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const toMessage = (err: unknown) =>
    err instanceof ApiError
      ? err.message
      : 'Tidak bisa terhubung ke server. Coba lagi'

  const submit = handleSubmit(async (values) => {
    setServerError('')
    try {
      await forgotPassword(values.email)
      setSentTo(values.email)
      countdown.restart()
    } catch (err) {
      setServerError(toMessage(err))
    }
  })

  const resend = async () => {
    if (!sentTo || countdown.remaining > 0) return
    setServerError('')
    setIsResending(true)
    try {
      await forgotPassword(sentTo)
      countdown.restart()
    } catch (err) {
      setServerError(toMessage(err))
    } finally {
      setIsResending(false)
    }
  }

  return {
    register,
    submit,
    isSubmitting,
    serverError,
    emailError: errors.email?.message,
    sentTo,
    isResending,
    canResend: countdown.remaining <= 0,
    countdownLabel: countdown.label,
    resend,
  }
}