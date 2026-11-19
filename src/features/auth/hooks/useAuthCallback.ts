import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // TODO: proses hasil login dari URL (token/code) di sini
    navigate('/', { replace: true })
  }, [navigate])
}