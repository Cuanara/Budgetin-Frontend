const TOKEN_KEY = 'token'
const EXPIRES_KEY = 'token_expires_at'
const SESSION_DAYS = 30

export function saveToken(token: string) {
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(EXPIRES_KEY, String(expiresAt))
}

export function getToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY)
  const expiresAt = Number(localStorage.getItem(EXPIRES_KEY))

  if (!token || !expiresAt || Date.now() > expiresAt) {
    clearToken()
    return null
  }
  return token
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(EXPIRES_KEY)
}