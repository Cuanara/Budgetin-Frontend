import { API_PATHS, NO_REFRESH_PATHS } from '../constants/api'
import { useAuthStore } from '../stores/authStore'
import type { ApiResponse, FieldErrors, TokenData } from '../types/api'

const BASE_URL = import.meta.env.VITE_API_URL as string

export class ApiError extends Error {
  status: number
  fieldErrors?: FieldErrors

  constructor(status: number, message: string, fieldErrors?: FieldErrors) {
    super(message)
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

let refreshing: Promise<string | null> | null = null

async function refreshToken(): Promise<string | null> {
  const { token, setToken, clearSession } = useAuthStore.getState()
  if (!token) return null

  try {
    const res = await fetch(`${BASE_URL}${API_PATHS.refresh}`, {
      method: 'POST',
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error('refresh gagal')

    const body = (await res.json()) as ApiResponse<TokenData>
    setToken(body.data.access_token)
    return body.data.access_token
  } catch {
    clearSession()
    return null
  }
}

function send(path: string, init: RequestInit, token: string | null) {
  return fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  })
}

export async function apiClient<T>(path: string, init: RequestInit = {}): Promise<ApiResponse<T>> {
  let res = await send(path, init, useAuthStore.getState().token)

  // token kedaluwarsa: refresh sekali (dipakai bersama), lalu ulangi request
  if (res.status === 401 && !NO_REFRESH_PATHS.includes(path) && useAuthStore.getState().token) {
    refreshing ??= refreshToken().finally(() => {
      refreshing = null
    })
    const newToken = await refreshing
    if (newToken) res = await send(path, init, newToken)
  }

  const body = await res.json().catch(() => null)

  if (!res.ok) {
    throw new ApiError(res.status, body?.message ?? 'Terjadi kesalahan', body?.errors)
  }

  return body as ApiResponse<T>
}