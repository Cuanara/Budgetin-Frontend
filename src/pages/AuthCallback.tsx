import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // TODO: proses hasil login dari URL (token/code) di sini
    navigate('/', { replace: true })
  }, [navigate])

  return <p>Memproses login...</p>
}

export default AuthCallback
