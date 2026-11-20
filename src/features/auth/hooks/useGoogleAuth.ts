import { getGoogleAuthUrl } from '../../../services/authService'

export function useGoogleAuth() {
  const startGoogleAuth = () => {
    window.location.assign(getGoogleAuthUrl())
  }

  return { startGoogleAuth }
}
