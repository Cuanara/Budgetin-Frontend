import { API_PATHS } from '../constants/api'
import type { ApiUser, TokenData } from '../types/api'
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '../types/auth'
import { getDeviceName } from '../utils/device'
import { ApiError, apiClient } from './apiClient'

export class OtpInvalidError extends Error {}
export class EmailNotVerifiedError extends Error {}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const MOCK_OTP = '123456'

const toUser = (u: ApiUser): User => ({ name: u.name, email: u.email })

async function fetchSession(accessToken: string): Promise<AuthResponse> {
  // login hanya mengembalikan token, jadi data user diambil dari /me
  const me = await apiClient<ApiUser>(API_PATHS.me, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return { token: accessToken, user: toUser(me.data) }
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  try {
    const { data } = await apiClient<TokenData>(API_PATHS.login, {
      method: 'POST',
      body: JSON.stringify({ email: payload.email, password: payload.password }),
    })
    return await fetchSession(data.access_token)
  } catch (e) {
    if (e instanceof ApiError && e.status === 403) throw new EmailNotVerifiedError(e.message)
    throw e
  }
}

export async function loginGoogle(credential: string): Promise<AuthResponse> {
  const { data } = await apiClient<TokenData>(API_PATHS.loginGoogle, {
    method: 'POST',
    body: JSON.stringify({ credential, device_name: getDeviceName() }),
  })
  return fetchSession(data.access_token)
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

// Path sementara. Samakan dengan route Laravel, atau pindahkan ke API_PATHS
// kalau kamu mau (aku belum lihat constants/api.ts).
export type ResetPasswordPayload = {
  email: string
  token: string
  password: string
  password_confirmation: string
}

// MOCK: nanti ganti ke endpoint forgot password dari BE
export async function forgotPassword(email: string): Promise<void> {
  await sleep(800)
  if (!email) throw new Error('Email tidak ditemukan')
}

// MOCK: nanti ganti ke endpoint reset password dari BE
export async function resetPassword(payload: ResetPasswordPayload): Promise<void> {
  await sleep(800)
  if (!payload.token || !payload.email) {
    throw new ApiError(422, 'Tautan tidak valid')
  }
}

// ---- MOCK di bawah ini tetap, belum ada endpoint BE-nya ----

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
