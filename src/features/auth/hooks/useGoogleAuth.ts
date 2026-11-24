import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiError } from '../../../services/apiClient'
import { loginGoogle } from '../../../services/authService'
import { useAuthStore } from '../../../stores/authStore'
import { loadGoogleIdentity } from '../../../utils/googleIdentity'
import { saveToken } from '../../../utils/tokenStorage'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined

// initialize() hanya boleh sekali; callback-nya diarahkan ke handler halaman yang aktif
let initialized = false
let onCredential: ((credential: string) => void) | null = null

export function useGoogleAuth() {
  const navigate = useNavigate()
  const [googleError, setGoogleError] = useState('')
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isGoogleReady, setIsGoogleReady] = useState(false)
  // elemen tempat tombol resmi Google dirender (dipasang di LoginForm)
  const googleButtonRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!CLIENT_ID) {
      console.error('[google] VITE_GOOGLE_CLIENT_ID kosong. Isi di .env lalu restart dev server')
      return
    }
    const container = googleButtonRef.current
    if (!container) return

    let cancelled = false

    const handler = async (credential: string) => {
      if (cancelled) return
      setGoogleError('')
      setIsGoogleLoading(true)
      try {
        const res = await loginGoogle(credential)
        saveToken(res.token)
        useAuthStore.getState().setSession(res.token, res.user)
        navigate('/dashboard', { replace: true })
      } catch (err) {
        console.error('[login-google]', err)
        if (!cancelled) {
          setGoogleError(
            err instanceof ApiError ? err.message : 'Tidak bisa terhubung ke server. Coba lagi',
          )
        }
      } finally {
        if (!cancelled) setIsGoogleLoading(false)
      }
    }
    onCredential = handler

    loadGoogleIdentity()
      .then((google) => {
        if (cancelled) return
        if (!initialized) {
          google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: (response) => onCredential?.(response.credential),
          })
          initialized = true
        }
        // lebar tombol Google maksimal 400px
        const width = Math.min(400, Math.round(container.parentElement?.offsetWidth ?? 320))
        container.innerHTML = ''
        google.accounts.id.renderButton(container, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          shape: 'pill',
          text: 'continue_with',
          locale: 'id',
          width,
        })
        setIsGoogleReady(true)
      })
      .catch((err) => {
        console.error('[google-identity]', err)
        if (!cancelled) setGoogleError('Tidak bisa memuat Google. Coba lagi')
      })

    return () => {
      cancelled = true
      if (onCredential === handler) onCredential = null
      container.innerHTML = ''
    }
  }, [navigate])

  const configError = CLIENT_ID ? '' : 'Login Google belum dikonfigurasi'

  return {
    googleButtonRef,
    googleError: googleError || configError,
    isGoogleLoading,
    isGoogleReady,
  }
}