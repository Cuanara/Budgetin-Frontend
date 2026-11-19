import type { AuthResponse, LoginPayload, RegisterPayload } from '../types/auth'

export class EmailTakenError extends Error {}
export class OtpInvalidError extends Error {}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// MOCK: hanya satu akun yang valid. Hapus saat API asli terpasang.
const MOCK_EMAIL = 'nadia@email.com'
const MOCK_PASSWORD = 'password123'
const MOCK_OTP = '123456'

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  await sleep(800)

  const isValid = payload.email === MOCK_EMAIL && payload.password === MOCK_PASSWORD

  if (!isValid) {
    throw new Error('Email atau password salah')
  }

  return {
    token: 'dummy-token',
    user: { name: 'Nadia', email: payload.email },
  }
}

export async function register(payload: RegisterPayload): Promise<{ email: string }> {
  await sleep(800)

  if (payload.email === 'sudah@ada.com') {
    throw new EmailTakenError('Email ini sudah terdaftar.')
  }

  return { email: payload.email }
}

export function getGoogleAuthUrl(): string {
  return `${import.meta.env.VITE_API_URL}/auth/google`
}

// MOCK: nanti diganti GET /auth/me (cookie) atau baca token dari callback
export async function getSessionFromCallback(): Promise<AuthResponse> {
  await sleep(600)
  return {
    token: 'dummy-google-token',
    user: { name: 'Nadia Putri', email: 'nadia@email.com' },
  }
}

// MOCK: kode benar = 123456. Nanti ganti POST /auth/verify-otp
export async function verifyOtp(email: string, code: string): Promise<void> {
  await sleep(800)
  if (!email || code !== MOCK_OTP) {
    throw new OtpInvalidError('Kode salah. Coba lagi.')
  }
}

// MOCK: nanti ganti POST /auth/resend-otp
export async function resendOtp(email: string): Promise<void> {
  await sleep(600)
  if (!email) throw new Error('Email tidak ditemukan')
}