import type { GoogleIdentity } from '../types/google'

const GOOGLE_SCRIPT_SRC = 'https://accounts.google.com/gsi/client'

const getGoogle = () => (window as unknown as { google?: GoogleIdentity }).google

let loading: Promise<GoogleIdentity> | null = null

export function loadGoogleIdentity(): Promise<GoogleIdentity> {
  const ready = getGoogle()
  if (ready?.accounts?.id) return Promise.resolve(ready)

  loading ??= new Promise<GoogleIdentity>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = GOOGLE_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => {
      const google = getGoogle()
      if (google?.accounts?.id) resolve(google)
      else reject(new Error('Google Identity tidak tersedia'))
    }
    script.onerror = () => {
      loading = null
      script.remove()
      reject(new Error('Gagal memuat Google Identity'))
    }
    document.head.appendChild(script)
  })

  return loading
}
