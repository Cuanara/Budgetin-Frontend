import { useAuthCallback } from '../features/auth/hooks/useAuthCallback'

const AuthCallback = () => {
  useAuthCallback()

  return <p>Memproses login...</p>
}

export default AuthCallback