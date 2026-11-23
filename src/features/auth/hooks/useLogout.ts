import { useNavigate } from 'react-router-dom'
import { logout } from '../../../services/authService'
import { useAuthStore } from '../../../stores/authStore'

export function useLogout() {
  const navigate = useNavigate()
  const clearSession = useAuthStore((s) => s.clearSession)

  return async () => {
    try {
      await logout()
    } catch {
      // token mungkin sudah kedaluwarsa; user tetap harus keluar
    } finally {
      clearSession()
      navigate('/login', { replace: true })
    }
  }
}
