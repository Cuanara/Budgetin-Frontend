import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../services/authService'
import { useAuthStore } from '../../../stores/authStore'
import {
  clearRememberedEmail,
  getRememberedEmail,
  saveRememberedEmail,
} from '../../../utils/rememberedEmail'
import { saveToken } from '../../../utils/tokenStorage'
import { loginSchema, type LoginFormValues } from '../schemas'

export function useLoginForm() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [rememberedEmail] = useState(getRememberedEmail)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: rememberedEmail,
      password: '',
      remember: !!rememberedEmail,
    },
  })

  const submit = handleSubmit(async (values) => {
    setServerError('')
    try {
      const res = await login({ email: values.email, password: values.password })
      saveToken(res.token)
      useAuthStore.getState().setSession(res.token, res.user)

      if (values.remember) saveRememberedEmail(values.email)
      else clearRememberedEmail()

      navigate('/', { replace: true })
    } catch {
      setServerError('Email atau password salah. Coba lagi')
    }
  })

  return {
    register,
    submit,
    isSubmitting,
    serverError,
    hasServerError: !!serverError,
    emailError: errors.email?.message,
    passwordError: errors.password?.message,
  }
}