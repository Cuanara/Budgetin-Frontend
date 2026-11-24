import { API_PATHS } from '../constants/api'
import type { ApiUser, TokenData } from '../types/api'
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '../types/auth'
import { ApiError, apiClient } from './apiClient'

export class OtpInvalidError extends Error {}
export class EmailNotVerifiedError extends Error {}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const MOCK_OTP = '123456'

const toUser = (u: ApiUser): User => ({ name: u.name, email: u.email })

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  try {
    const { data } = await apiClient<TokenData>(API_PATHS.login, {
      method: 'POST',
      body: JSON.stringify({ email: payload.email, password: payload.password }),
    })

    // login hanya mengembalikan token, jadi data user diambil dari /me
    const me = await apiClient<ApiUser>(API_PATHS.me, {
      headers: { Authorization: `Bearer ${data.access_token}` },
    })

    return { token: data.access_token, user: toUser(me.data) }
  } catch (e) {
    if (e instanceof ApiError && e.status === 403) throw new EmailNotVerifiedError(e.message)
    throw e
  }
}

export async function register(payload: RegisterPayload): Promise<{ email: string }> {
  await apiClient<ApiUser>(API_PATHS.register, {
    method: 'POST',
    // form belum punya konfirmasi password, sedangkan BE mewajibkannya
    body: JSON.stringify({ ...payload, password_confirmation: payload.password }),
  })
  return { email: payload.email }
}

export async function getMe(): Promise<User> {
  const { data } = await apiClient<ApiUser>(API_PATHS.me)
  return toUser(data)
}

export async function logout(): Promise<void> {
  await apiClient<null>(API_PATHS.logout, { method: 'POST' })
}

// ---- MOCK di bawah ini tetap, belum ada endpoint BE-nya ----

export function getGoogleAuthUrl(): string {
  return `${import.meta.env.VITE_API_URL}/auth/google`
}

export async function getSessionFromCallback(): Promise<AuthResponse> {
  await sleep(600)
  return {
    token: 'dummy-google-token',
    user: { name: 'Nadia Putri', email: 'nadia@email.com' },
  }
}

// MOCK: kode benar = 123456. Nanti ganti ke endpoint OTP dari BE
export async function verifyOtp(email: string, code: string): Promise<void> {
  await sleep(800)
  if (!email || code !== MOCK_OTP) {
    throw new OtpInvalidError('Kode salah. Coba lagi.')
  }
}

// MOCK: nanti ganti ke endpoint resend OTP dari BE
export async function resendOtp(email: string): Promise<void> {
  await sleep(600)
  if (!email) throw new Error('Email tidak ditemukan')
}