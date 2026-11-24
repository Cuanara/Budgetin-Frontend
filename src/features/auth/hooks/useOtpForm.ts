import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCountdown } from '../../../hooks/useCountdown'
import { resendOtp, verifyOtp } from '../../../services/authService'

const OTP_LENGTH = 6
const RESEND_SECONDS = 59

export function useOtpForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email ?? ''

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
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
    if (!isComplete) return
    setError('')
    setIsSubmitting(true)
    try {
      await verifyOtp(email, code)
      navigate('/login', { replace: true })
    } catch {
      setError('Kode salah. Coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resend = async () => {
    setError('')
    setIsResending(true)
    try {
      await resendOtp(email)
      setDigits(Array(OTP_LENGTH).fill(''))
      countdown.restart()
    } catch {
      setError('Gagal mengirim ulang kode. Coba lagi.')
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