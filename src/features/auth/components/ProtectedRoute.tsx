import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getMe } from '../../../services/authService'
import { useAuthStore } from '../../../stores/authStore'

export default function ProtectedRoute() {
  const token = useAuthStore((s) => s.token)
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const clearSession = useAuthStore((s) => s.clearSession)

  // setelah refresh halaman, token ada di localStorage tapi user kosong: ambil dari /me
  useEffect(() => {
    if (!token || user) return
    let cancelled = false

    getMe()
      .then((me) => {
        if (!cancelled) setUser(me)
      })
      .catch(() => {
        if (!cancelled) clearSession()
      })

    return () => {
      cancelled = true
    }
  }, [token, user, setUser, clearSession])

  if (!token) return <Navigate to="/login" replace />
  if (!user) return <div className="p-8 text-center text-sm">Memuat...</div>

  return <Outlet />
}
