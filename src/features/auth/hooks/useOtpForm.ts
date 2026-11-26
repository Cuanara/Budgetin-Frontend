import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCountdown } from '../../../hooks/useCountdown'
import { ApiError } from '../../../services/apiClient'
import { resendOtp, verifyOtp } from '../../../services/authService'

const OTP_LENGTH = 6
const RESEND_SECONDS = 60 // samakan dengan jeda minimal 60 detik di backend
const NETWORK_ERROR = 'Tidak bisa terhubung ke server. Coba lagi'

const emptyDigits = () => Array<string>(OTP_LENGTH).fill('')

export function useOtpForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email ?? ''

  const [digits, setDigits] = useState<string[]>(emptyDigits)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const countdown = useCountdown(RESEND_SECONDS)

  const code = digits.join('')
  const isComplete = code.length === OTP_LENGTH

  const changeDigits = (next: string[]) => {
    setError('')
    setDigits(next)
  }

  const submit = async () => {
    if (!isComplete || isSubmitting) return
    setError('')
    setIsSubmitting(true)
    try {
      await verifyOtp(email, code)
      navigate('/login', { replace: true })
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
        // 429: percobaan habis, user harus minta kode baru
        if (err.status === 429) setDigits(emptyDigits())
      } else {
        setError(NETWORK_ERROR)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const resend = async () => {
    setError('')
    setIsResending(true)
    try {
      await resendOtp(email)
      setDigits(emptyDigits())
      countdown.restart()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : NETWORK_ERROR)
    } finally {
      setIsResending(false)
    }
  }

  return {
    email,
    digits,
    changeDigits,
    error,
    isComplete,
    isSubmitting,
    isResending,
    canResend: countdown.remaining <= 0,
    countdownLabel: countdown.label,
    submit,
    resend,
  }
}