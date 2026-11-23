export interface ApiResponse<T> {
  status: 'success' | 'error'
  message: string
  data: T
}

export type FieldErrors = Record<string, string[]>

export interface TokenData {
  access_token: string
  token_type: 'bearer'
  expires_in: number
}

export interface ApiUser {
  id: string
  name: string
  email: string
  email_verified_at: string | null
}