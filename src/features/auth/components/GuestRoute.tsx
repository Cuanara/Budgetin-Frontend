import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../../stores/authStore'

export default function GuestRoute() {
  const token = useAuthStore((s) => s.token)
  return token ? <Navigate to="/" replace /> : <Outlet />
}